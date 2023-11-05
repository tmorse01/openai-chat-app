import "./App.css";
import { App as AntdApp, Layout, theme, ConfigProvider } from "antd";
import Chat from "./components/chat/chat";

import ChatHistory from "./components/chathistory/chathistory";

function App() {
  return (
    <AntdApp>
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <Layout style={{ minHeight: "100vh" }}>
          <ChatHistory />
          <Chat />
        </Layout>
      </ConfigProvider>
    </AntdApp>
  );
}

export default App;
