import React, { useState } from "react";
import { Button, Space, message } from "antd";
import { Message } from "../../types/types";

type QuickPromptsProps = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  sendMessage: (messages: Message) => Promise<void>;
};

const QuickPrompts = ({ sendMessage, setMessages }: QuickPromptsProps) => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleMessageClick = (value: string) => {
    // Simulate sending a message
    const newMessage = { role: "user", content: value } as Message;
    setMessages((prevState) => [...prevState, newMessage]);
    sendMessage(newMessage);

    // Optionally display a success message using antd's message component
    messageApi.success("Prompt Submitted: " + value);
  };

  const promptButtons = [
    "Can you explain the virtual DOM in React?",
    "How do I manage state in a React application?",
    "What are the differences between props and state?",
    "What is the purpose of the `useEffect` hook?",
  ];

  return (
    <Space size={"middle"} wrap style={{ marginBottom: "16px" }}>
      {contextHolder}
      {promptButtons.map((prompt) => (
        <Button
          key={prompt}
          type="default"
          onClick={() => handleMessageClick(prompt)}
          style={{ margin: "0 8px 8px 0" }}
        >
          {prompt}
        </Button>
      ))}
    </Space>
  );
};

export default QuickPrompts;
