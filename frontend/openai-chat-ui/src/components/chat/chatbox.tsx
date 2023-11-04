import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import { SendOutlined } from "@ant-design/icons";
import { Message } from "../../types/types";
const { Search } = Input;

type ChatBoxProps = {
  messages: [Message];
  setMessages: React.Dispatch<React.SetStateAction<[Message]>>;
};

const ChatBox: React.FC<ChatBoxProps> = ({ messages, setMessages }) => {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) => {
    console.log(info?.source, value);
    // update messages with new input from user
    const updatedMessages = [...messages, { role: "user", content: value }];
    setMessages(updatedMessages);
    // Block sending a request, until the previous returns
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
      onSearch={onSearch}
    />
  );
};

export default ChatBox;
