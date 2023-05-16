import { MailOutlined } from "@ant-design/icons";
import {
  Col,
  Layout,
  Menu,
  MenuProps,
  MenuTheme,
  Row,
  Spin,
  Switch,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useMatch } from "react-router-dom";
import "./App.css";

import { observer } from "mobx-react-lite";
import storeProvider from "./mst/store/StorePProvider";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Routes", "sub1", <MailOutlined />, [
    getItem(<Link to="/">Home page</Link>, "home"),
    getItem(<Link to="/login">Login Form</Link>, "login"),
    getItem(<Link to="/content">Content page</Link>, "content"),
    getItem(
      <Link to="/local-storage">Local storage page</Link>,
      "local storage"
    ),
  ]),
];

const App = observer(() => {
  const homePage = useMatch("/");
  const { loadDataFromLocalStorage, setInitialStorageContents } = storeProvider;
  const [theme, setTheme] = useState<MenuTheme>("dark");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setInitialStorageContents();
    setLoading(true);
    setTimeout(() => {
      loadDataFromLocalStorage("content_notes");
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <Layout
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin size="large" />;
      </Layout>
    );
  }

  const changeTheme = (value: boolean) => {
    setTheme(value ? "dark" : "light");
  };

  const onClick: MenuProps["onClick"] = (e) => {};

  return (
    <div className="App">
      <Row style={{ marginTop: 40 }}>
        <Col span={2}>
          <Switch
            checked={theme === "dark"}
            onChange={changeTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
        </Col>

        <Col span={6}>
          <Menu
            items={items}
            theme={theme}
            onClick={onClick}
            style={{ width: 256 }}
            defaultOpenKeys={["sub1"]}
            mode="inline"
          />
        </Col>
      </Row>

      {homePage && (
        <Row justify="center">
          <img src="https://i.pinimg.com/736x/a5/49/d5/a549d5a6e4c3f04d6346a6fab7fef112--malva-travel-inspiration.jpg" />
        </Row>
      )}

      <div>
        <Outlet />
      </div>
    </div>
  );
});

export default App;
