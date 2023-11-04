import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import { SendOutlined } from "@ant-design/icons";
import { Message } from "../../types/types";
import { useState } from "react";
const { Search } = Input;

type ChatBoxProps = {
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
};

const ChatBox: React.FC<ChatBoxProps> = ({ messages, setMessages }) => {
  const [isLoading, setIsLoading] = useState(false);

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
    // update messages with new input from user
    const updatedMessages = [...messages, { role: "user", content: value }];
    setMessages((prevState) => [
      ...prevState,
      { role: "user", content: value },
    ]);
    // Block sending a request, until the previous returns
    setIsLoading(true);
    fetch("http://localhost:8000/generate-text", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: updatedMessages }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // update messages with new response from server
        const assistantMessage = data.choices[0].message;
        setMessages((prevState) => [...prevState, assistantMessage]);
        // unblock sending a request
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Search
      placeholder="Send a message"
      allowClear
      enterButton={<SendOutlined />}
      size="large"
      loading={isLoading}
      onSearch={onSearch}
    />
  );
};

export default ChatBox;
