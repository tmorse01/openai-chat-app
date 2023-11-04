import { Input } from "antd";
import { SearchProps } from "antd/es/input";
import { SendOutlined } from "@ant-design/icons";

const { Search } = Input;

const ChatBox: React.FC = () => {
  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);

  return (
    <Search
      placeholder="Send a message"
      allowClear
      enterButton={<SendOutlined />}
      size="large"
      onSearch={onSearch}
    />
  );
};

export default ChatBox;
