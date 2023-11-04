import "./App.css";
import {
  App as AntdApp,
  Layout,
  Typography,
  theme,
  ConfigProvider,
} from "antd";
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
      <ConfigProvider
        theme={{
          algorithm: theme.darkAlgorithm,
        }}
      >
        <Layout style={{ minHeight: "100vh" }}>
          <Sider width={256}>
            <Title style={{ textAlign: "center" }} level={4}>
              Chat history
            </Title>
            <SiderMenu />
          </Sider>
          <Layout>
            <Header>
              <Title style={{ textAlign: "center" }} level={3}>
                React Tutor
              </Title>
            </Header>
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
