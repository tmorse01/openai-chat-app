import { Skeleton } from "antd";
import { Message } from "../../types/types";
import ChatMessage from "./chatmessage";

type ChatListProps = {
  messages: Message[];
  isLoading: boolean;
};

const ChatList: React.FC<ChatListProps> = ({ messages, isLoading }) => {
  return (
    <div className="chat-list">
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
      {isLoading && <Skeleton avatar active paragraph={{ rows: 4 }} />}
    </div>
  );
};

export default ChatList;
