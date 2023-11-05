import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import { SendOutlined } from "@ant-design/icons";
import { Message } from "../../types/types";
import { useState } from "react";

import "./chat.css";

const { Search } = Input;

type ChatBoxProps = {
  isLoading: boolean;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  sendMessage: (message: Message) => Promise<void>;
};

const ChatBox: React.FC<ChatBoxProps> = ({
  isLoading,
  setMessages,
  sendMessage,
}) => {
  const [value, setValue] = useState("");

  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
    // update messages with new input from user
    setMessages((prevState) => [
      ...prevState,
      { role: "user", content: value },
    ]);
    // Block sending a request, until the previous returns

    const newMessage = { role: "user", content: value } as Message;
    sendMessage(newMessage).then(() => {
      setValue("");
    });
  };

  return (
    <Search
      placeholder="Send a message"
      allowClear
      enterButton={<SendOutlined />}
      size="large"
      loading={isLoading}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onSearch={onSearch}
    />
  );
};

export default ChatBox;
