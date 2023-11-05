import "./App.css";
import { App as AntdApp, Layout, theme, ConfigProvider } from "antd";
import Chat from "./components/chat/chat";

import ChatHistory from "./components/chathistory/chathistory";

const { Content, Footer } = Layout;
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
          <Layout>
            <Content>
              <Chat />
            </Content>
            <Footer style={{ textAlign: "center" }}>Open AI Chat Bot</Footer>
          </Layout>
        </Layout>
      </ConfigProvider>
    </AntdApp>
  );
}

export default App;
