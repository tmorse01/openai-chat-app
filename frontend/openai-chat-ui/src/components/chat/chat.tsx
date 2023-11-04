import { useState } from "react";
import ChatBox from "./chatbox";
import { Message } from "../../types/types";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content:
        "You are a react development tutor, skilled in explaining complex framework concepts as well as other web development knowledge in simple terms that anyone with programming knowledge can understand.",
    },
  ]);
  console.log({ messages });
  return (
    <div>
      <ChatBox messages={messages} setMessages={setMessages} />
    </div>
  );
};

export default Chat;
