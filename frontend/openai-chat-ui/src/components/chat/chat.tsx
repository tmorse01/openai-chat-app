import { useEffect, useState } from "react";
import ChatBox from "./chatbox";
import { Message } from "../../types/types";
import ChatList from "./chatlist";
import "./chat.css";
import SystemRole from "./systemrole";
import { systemRoles } from "./systemrole";
import { Layout } from "antd";
import QuickPrompts from "./quickprompts";
import { fetchEventSource } from "@microsoft/fetch-event-source";
import exampleMessages from "../../examples/examplemessage.json";
const { Content, Footer } = Layout;

const defaultSystemRole = {
  role: "system",
  content: systemRoles[0].content,
} as Message;

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([defaultSystemRole]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message: Message) => {
    const updatedMessages = [...messages, message];
    console.log("exampleMessages: ", exampleMessages);
    const body = JSON.stringify({ messages: exampleMessages });
    console.log("body: ", body);
    setIsLoading(true);
    await fetchEventSource(`http://localhost:8000/stream_chat_completion`, {
      method: "POST",
      headers: { Accept: "text/event-stream" },
      body: body,
      onopen(response) {
        console.log("response", response);
        if (response.ok && response.status === 200) {
          console.log("Connection made ", response);
        } else if (
          response.status >= 400 &&
          response.status < 500 &&
          response.status !== 429
        ) {
          console.log("Client-side error ", response);
        }
      },
      onmessage(event) {
        console.log(event.data);
        // setData((data) => [...data, parsedData]); // Important to set the data this way, otherwise old data may be overwritten if the stream is too fast
      },
      onclose() {
        console.log("Connection closed by the server");
        setIsLoading(false);
      },
      onerror(err) {
        console.log("There was an error from server", err);
        setIsLoading(false);
      },
    });
  };

  // const sendMessage = (message: Message) => {
  //   // TODO figure out streaming response
  //   const updatedMessages = [...messages, message];
  //   setIsLoading(true);
  //   return fetch("http://localhost:8000/generate-text", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ messages: updatedMessages }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       // update messages with new response from server
  //       const assistantMessage = data.choices[0].message;
  //       setMessages((prevState) => [...prevState, assistantMessage]);
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error generating text:", error);
  //     });
  // };
  // console.log({ messages });
  return (
    <Layout className="chat">
      <SystemRole setMessages={setMessages} />
      <Content>
        <ChatList messages={messages} isLoading={isLoading} />
      </Content>
      <Footer>
        {messages.length === 1 && (
          <QuickPrompts
            messages={messages}
            setMessages={setMessages}
            sendMessage={sendMessage}
          />
        )}
        <ChatBox
          isLoading={isLoading}
          setMessages={setMessages}
          sendMessage={sendMessage}
        />
      </Footer>
    </Layout>
  );
};

export default Chat;
