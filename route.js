const express = require('express');
const router = express.Router();
const functions = require('./assistant');

let  assistantId ;
let pollingInterval;


router.post('/create-assistant', async (req, res) => {
  try {
      const assistant = await functions.createAssistant(req.body);
      assistantId = assistant.id ;
      res.json({ assistant });
  } catch (error) {
    console.error(error);
      res.status(500).send('Failed to create assistant');
  }
});


router.get('/list-assistant', async (req, res) => {
    try {
    
      const assistant = await functions.getAssistant();
      res.json({ assistant });
    } catch (error) {
      res.status(500).send('Failed to list assistant');
    }
  });
  

router.post('/thread', (req, res) => {
  functions.createThread().then(thread => {
        res.json({ threadId: thread.id });
    });
})




router.post('/message', (req, res) => {
  const { message, threadId } = req.body;
  functions.addMessage(threadId, message).then(message => {
      // res.json({ messageId: message.id });

      // Run the assistant
      console.log("Run the assistant")
      functions.runAssistant(threadId).then(run => {
          const runId = run.id;           
          
          // Check the status
          console.log("Check the status")
          PollingInterval = setInterval(() => {
              functions.checkingStatus(res, threadId, runId);
          }, 5000);
          console.log("pollingInterval form route" + pollingInterval);
      });
  });
});


router.delete('/delete/assistants/:assistantId', async (req, res) => {
  const assistantId = req.params.assistantId;

  try {
    const response = await functions.deleteAssistant(assistantId);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete assistant' });
  }
});


module.exports = router;