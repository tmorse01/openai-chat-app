import { Message } from "../../types/types";
import { Avatar, Typography, theme, message as antdMessage } from "antd";
import { CopyOutlined, RobotOutlined, UserOutlined } from "@ant-design/icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";
import Markdown from "react-markdown";

import { CopyToClipboard } from "react-copy-to-clipboard";

const { Text } = Typography;

import "./chat.css";

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const {
    token: { colorPrimaryBg, colorText, colorBgContainer },
  } = theme.useToken();
  const [messageApi, contextHolder] = antdMessage.useMessage();
  const { content, role } = message;
  if (message.role === "system") return;

  const style = {
    backgroundColor: role === "assistant" ? colorPrimaryBg : colorBgContainer,
    color: colorText,
  };

  return (
    <div className={`chat-message ${role}`} style={style}>
      {contextHolder}
      <Avatar size={40}>
        {role === "assistant" ? <RobotOutlined /> : <UserOutlined />}
      </Avatar>
      <div className="content">
        <Markdown
          children={content}
          components={{
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              if (match) {
                return (
                  <div>
                    <CopyToClipboard
                      text={String(children)}
                      onCopy={() => messageApi.info("Copied to clipboard.")}
                    >
                      <CopyOutlined className="copy-code-btn" />
                    </CopyToClipboard>
                    {/* @ts-ignore */}
                    <SyntaxHighlighter
                      {...rest}
                      children={String(children).replace(/\n$/, "")}
                      style={okaidia}
                      language={match[1]}
                      PreTag="div"
                    />
                  </div>
                );
              } else {
                return (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              }
            },
          }}
        />
        {/* {content.split("```").map((chunk, index) => {
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
        })} */}
      </div>
    </div>
  );
};

export default ChatMessage;
