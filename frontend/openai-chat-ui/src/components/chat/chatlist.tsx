import { Message } from "../../types/types";
import ChatMessage from "./chatmessage";

type ChatListProps = {
  messages: Message[];
};

const ChatList: React.FC<ChatListProps> = ({ messages }) => {
  return (
    <div className="chat-list">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </div>
  );
};

export default ChatList;
