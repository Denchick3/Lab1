import { Col, Form, Input, Checkbox, Button, Row, Card } from "antd";
import { useState } from "react";

export const Login = () => {
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cards, setCards] = useState<
    {
      nickname: string;
      username: string;
      password: string;
    }[]
  >([]);

  const onFinish = (values: any) => {
    console.log("Success:", nickname, username, password);
    setCards([...cards, { nickname, username, password }]);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Row justify="center">
        {" "}
        <Col span={6}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Nickname"
              rules={[
                { required: true, message: "Please input your nickname!" },
              ]}
            >
              <Input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>

            <Form.Item
              name="remember"
              valuePropName="checked"
              wrapperCol={{ offset: 8, span: 16 }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <Row justify="center" style={{ marginTop: 30 }}>
        {cards.map((card, index) => (
          <Col key={index} span={6}>
            <Card
              title="Titlu temporar"
              style={{ width: 300, marginTop: "1px" }}
            >
              <p>Nickname: {card.nickname}</p>
              <p>Username: {card.username}</p>
              <p>Password: {card.password}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};
