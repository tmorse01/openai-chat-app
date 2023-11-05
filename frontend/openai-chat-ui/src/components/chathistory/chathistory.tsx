import { Layout, Button, Typography } from "antd";
import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import SiderMenu from "../sidermenu";
import "./chathistory.css";

const { Title } = Typography;
const { Sider } = Layout;
const ChatHistory = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider width={256} collapsed={collapsed}>
      <div className="chat-history-title">
        {!collapsed && (
          <Title style={{ textAlign: "center" }} level={4}>
            Chat history
          </Title>
        )}
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
      </div>
      <SiderMenu />
    </Sider>
  );
};

export default ChatHistory;
