import { useState } from "react";
import "./App.css";
import { App as AntdApp, Layout, Typography, theme } from "antd";
import SiderMenu from "./components/sidermenu";
import Chat from "./components/chat/chat";

const { Title } = Typography;
const { Sider, Header, Content, Footer } = Layout;
function App() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <AntdApp>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider width={256} style={{ background: colorBgContainer }}>
          <Title level={4}>Chat history</Title>
          <SiderMenu />
        </Sider>
        <Layout>
          <Header style={{ background: colorBgContainer }}>
            <Title level={3}>Open AI Chat Bot</Title>
          </Header>
          <Content>
            <Chat />
          </Content>
          <Footer style={{ textAlign: "center" }}>Open AI Chat Bot</Footer>
        </Layout>
      </Layout>
    </AntdApp>
  );
}

export default App;
