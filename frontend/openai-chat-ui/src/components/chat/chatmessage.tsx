import { Message } from "../../types/types";
import { Avatar, Typography, theme, message as antdMessage } from "antd";
import { CopyOutlined, RobotOutlined, UserOutlined } from "@ant-design/icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";

import { CopyToClipboard } from "react-copy-to-clipboard";

const { Text } = Typography;

import "./chat.css";

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const {
    token: { colorPrimaryBg, colorTextBase, colorBgContainer },
  } = theme.useToken();
  const [messageApi, contextHolder] = antdMessage.useMessage();
  const { content, role } = message;
  if (message.role === "system") return;

  const style = {
    backgroundColor: role === "assistant" ? colorPrimaryBg : colorBgContainer,
    color: role === "assistant" ? colorBgContainer : colorTextBase,
  };

  return (
    <div className={`chat-message ${role}`} style={style}>
      {contextHolder}
      <Avatar size={40}>
        {role === "assistant" ? <RobotOutlined /> : <UserOutlined />}
      </Avatar>
      <div className="content">
        {content.split("```").map((chunk, index) => {
          if (index % 2 === 0) {
            return (
              <Text key={index} className="message-text">
                {chunk}
              </Text>
            );
          } else {
            return (
              <div key={index}>
                <CopyToClipboard
                  text={chunk}
                  onCopy={() => messageApi.info("Copied to clipboard.")}
                >
                  <CopyOutlined className="copy-code-btn" />
                </CopyToClipboard>
                <SyntaxHighlighter language="javascript" style={okaidia}>
                  {chunk}
                </SyntaxHighlighter>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default ChatMessage;
