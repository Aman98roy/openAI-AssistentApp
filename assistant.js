require("dotenv").config();
const OpenAI = require("openai");

let assistantId;
let pollingInterval;

const { OPENAI_API_KEY } = process.env;
// Set up OpenAI Client
const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

function setPollingInterval(interval) {
  pollingInterval = interval;
  console.log("pollingInterval" + pollingInterval);
}
async function createAssistant(requestBody) {
  const { instructions, name, tools, model } = requestBody;

  const myAssistant = await openai.beta.assistants.create({
    instructions,
    name,
    tools,
    model,
  });
  assistantId = myAssistant.id;
  console.log(assistantId);
  return myAssistant;
}

async function getAssistant() {
  const myAssistants = await openai.beta.assistants.list({
    order: "desc",
    limit: "20",
  });

  return myAssistants.data;
}

// Set up a Thread
async function createThread() {
  console.log("Creating a new thread...");
  const thread = await openai.beta.threads.create();
  return thread;
}

async function addMessage(threadId, message) {
  console.log("Adding a new message to thread: " + threadId);
  const response = await openai.beta.threads.messages.create(threadId, {
    role: "user",
    content: message,
  });
  return response;
}

async function runAssistant(threadId) {
  console.log("Running assistant for thread: " + threadId);
  console.log("================================" + assistantId)
  const response = await openai.beta.threads.runs.create(threadId, {
    assistant_id: assistantId,
  });

  return response;
}

async function checkingStatus(res, threadId, runId) {
  const runObject = await openai.beta.threads.runs.retrieve(threadId, runId);

  const status = runObject.status;
  console.log("Current status: " + status);

  if (status == "completed") {

    const messagesList = await openai.beta.threads.messages.list(threadId);
    let messages = [];

    messagesList.body.data.forEach((message) => {
      messages.push(message.content);
    });
    console.log("messages" + messages);
    if (res.headersSent) {
      console.log("Response already sent. Skipping further execution.");
      return; // Exit the function to prevent further execution
    }
    res.json({ messages });
  }
}

// Delete Assistant
async function deleteAssistant(assistantId) {
  const response = await openai.beta.assistants.del(assistantId);

  return response;
}

// Exporting multiple functions
module.exports = {
  createAssistant: createAssistant,
  getAssistant: getAssistant,
  createThread: createThread,
  addMessage: addMessage,
  runAssistant: runAssistant,
  checkingStatus: checkingStatus,
  deleteAssistant: deleteAssistant,
  
};
