# OpenAI Assistant App

Welcome to the OpenAI Assistant App! This application leverages OpenAI's capabilities to provide an interactive assistant via a RESTful API built with Node.js.

## Getting Started

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/) (v6.x or later)

### Installation

1. **Clone the repository:**

    ```bash
    git clone <repository-url>
    ```

2. **Navigate into the project directory:**

    ```bash
    cd openai-assistant-app
    ```

3. **Install the dependencies:**

    ```bash
    npm install
    ```

### Running the Application

To start the application, execute the following command in your terminal:

```bash
node server.js


The application will start on http://localhost:3000.

```

## API Documentation
The application uses Swagger for API documentation. Once the server is running, you can access the Swagger UI at:

http://localhost:3000/api-docs/

![image](https://github.com/Aman98roy/openAI-AssistentApp/assets/63066645/95e7bbf8-1510-429d-bd7e-2b87911ffefb)


This interface provides a detailed overview of all available endpoints and allows you to interact with the API directly from your browser.

## Configuration
Before running the application, ensure that you have set up the necessary environment variables. Create a .env file in the root directory and add the following configurations:

```bash
OPENAI_API_KEY=
ASSISTANT_ID=
Replace your_openai_api_key and assistant ID with your actual OpenAI API key and assistant ID, which you will create using the REST API (ASSISTANT_ID).
