# React Tutor Chat Bot

## Overview

The React Tutor Chat Bot is a helpful tool designed to assist users in learning React, a popular JavaScript library for building user interfaces. This chat bot leverages OpenAI's technology to provide interactive and informative guidance on React concepts, best practices, and coding exercises.

## Features

### 1. Real-time Guidance

The chat bot offers real-time guidance and assistance as you learn React. Whether you're a beginner or looking to improve your React skills, the bot provides instant answers to your questions and helps you understand key concepts.

### 2. Concept Explanation

Struggling to grasp a particular React concept? The chat bot can explain complex ideas in a simple and understandable manner. It breaks down React concepts, such as components, props, state, and lifecycle methods, making it easier for you to understand.

### 3. Code Samples

The chat bot provides code samples and examples that demonstrate how to implement various React features and patterns. These samples can serve as templates for your own projects or help you understand how to solve specific problems.

### 4. Best Practices

To write clean and maintainable React code, the chat bot offers best practices and coding guidelines. It helps you follow industry standards and avoid common pitfalls.

## Getting Started

To start using the React Tutor Chat Bot, follow these steps:

1. **Clone the Repository**: Clone the React Tutor Chat Bot repository to your local machine.

   ```shell
   git clone https://github.com/tmorse01/openai-chat-app
   ```

2. **Install Dependencies**: Navigate to the project directory and install the necessary dependencies.

   ```shell
   cd frontend/openai-chat-ui
   npm install
   ```

3. **Setup your OpenAI API key inside of your environment variables**

   ```shell
   setx OPENAI_API_KEY "your-api-key-here"
   ```

4. **Run the Bot**: Start the chat bot server.

   ```shell
   npm start
   ```

5. **Start up the fastapi Python server**

   ```shell
   uvicorn server.main:app --reload
   ```

6. **Access the Bot**: Open your web browser and visit `http://localhost:3000` to access the chat bot interface.

## Usage

Once you've accessed the chat bot, you can interact with it by typing your questions, requesting explanations, or working on coding exercises. The bot will respond in real-time, providing the guidance and assistance you need to learn React effectively.

## Feedback and Contributions

We welcome feedback and contributions from the community to improve the React Tutor Chat Bot. If you encounter any issues, have suggestions for new features, or want to contribute to the project, please create a GitHub issue or submit a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE.md).

Happy learning, and enjoy using the React Tutor Chat Bot to enhance your React development skills!
