import { Layout, Typography } from "antd";
import { HistoryOutlined } from "@ant-design/icons";
import SiderMenu from "../sidermenu";
import "./chathistory.css";
import { useState } from "react";

const { Title } = Typography;
const { Sider } = Layout;
const ChatHistory = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider width={256} collapsible onCollapse={(value) => setCollapsed(value)}>
      <div className="chat-history-title">
        <Title style={{ textAlign: "center" }} level={4}>
          {!collapsed && "Chat history"}
          <HistoryOutlined style={{ margin: "8px" }} />
        </Title>
      </div>
      <SiderMenu />
    </Sider>
  );
};

export default ChatHistory;
