import React, { useEffect, useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Layout, MenuProps, MenuTheme, Spin } from 'antd';
import { Menu, Switch } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import './App.css';
import { Card, Col, Row } from 'antd';
import Computer from "./computer"
import Laptop from "./laptop"

import RootStore from './mst/store/RootStore';
import { observer } from 'mobx-react-lite';
import storeProvider from './mst/store/StorePProvider';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key ,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
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
  getItem('Log in', 'sub1', <MailOutlined />, [
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
    getItem('Option 3', '3'),
    getItem('Option 4', '4'),
  ]),

  getItem('About', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),

  getItem('Settings', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),
];

const ComputerCards=[
  {
    Name: "Lenovo",
    Proccesor: "Intel",
    Display: 16,
    RAM: 8,
    PSU: 2,
    Storage: 256,
    Src:"/lenovo.png"
  },
  {
    Name: "ASUS",
    Proccesor: "Intel",
    Display: 18,
    RAM: 16,
    PSU: 4,
    Storage: 526,
    Src:"/asus.png"
  },
  {
    Name: "LG",
    Proccesor: "Intel",
    Display: 21,
    RAM: 32,
    PSU: 2,
    Storage: 128,
    Src:"/lg.png"
  }
]

const App = observer(() => {
  const {contents, contents_notes, addNote, removeNote, loadDataFromLocalStorage, setInitialStorageContents} = storeProvider
  const [theme, setTheme] = useState<MenuTheme>('dark');
  const [current, setCurrent] = useState('1');
  const [nickname, setNickname] = useState('') 
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [cards, setCards] = useState<{ 
    nickname: string 
    username: string 
    password: string 
  }[]>([])
  const [loading, setLoading] = useState(false)

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
 
  const onFinish = (values: any) => { 
    console.log("Success:", nickname, username, password); 
    setCards([...cards, { nickname, username, password }]) 
  };
 

  const changeTheme = (value: boolean) => {
    setTheme(value ? 'dark' : 'light');
  };

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <div className="App">

    <Row style={{marginTop: 40}}>
      <Col span={2}>
        <Switch
            checked={theme === 'dark'}
            onChange={changeTheme}
            checkedChildren="Dark"
            unCheckedChildren="Light"
          />
      </Col>


          <Col span={6}>
        <Menu
            theme={theme}
            onClick={onClick}
            style={{ width: 256 }}
            defaultOpenKeys={['sub1']}
            selectedKeys={[current]}
            mode="inline"
            items={items}
          />    
          </Col>

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
      
      rules={[{ required: true, message: 'Please input your nickname!' }]}
    >
      <Input value={nickname}  
      onChange={ (e) => setNickname(e.target.value) } />
    </Form.Item>

    <Form.Item
      label="Username"
      
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input value={username}  
      onChange={ (e) => setUsername(e.target.value) } />
    </Form.Item>

    <Form.Item
      label="Password"
      
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
     <Input value={password}  
      onChange={ (e) => setPassword(e.target.value) } />
    </Form.Item>

    <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
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

      <Row justify="center" style={{marginTop: 30}}>
        {cards.map((card, index) => ( 
                <Col key={index} span={6}>
                  <Card title="Titlu temporar" style={{ width: 300, marginTop: "1px" }}> 
                  <p>Nickname: {card.nickname}</p> 
                  <p>Username: {card.username}</p> 
                  <p>Password: {card.password}</p> 
                  </Card>
                </Col>  
        ))}
      </Row>
    
    <Row justify="center" align="middle" gutter={16} >
      {ComputerCards.map((card, index) => ( 
                <Col key={index} span={6}>
                  <Card title={card.Name} style={{ width: 300, marginTop: "40px" }}> 
                    <img src={card.Src} alt="logo" style={{
                      width: 300,
                    }}/>
                    <p>Display: {card.Display}</p> 
                    <p>Proccesor: {card.Proccesor}</p> 
                    <p>RAM: {card.RAM}</p> 
                  </Card>
                </Col>  
        ))}
    </Row>
    
    {contents.map((noteCategory) => (
  <Row
    key={noteCategory?.id}
    justify="center"
    gutter={[16, 16]}
    style={{ margin: "20px", width: "100%" }}
  >
    <Col span={16}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <label>
          {noteCategory.title}:
          <input
            type="text"
            value={noteCategory.notes}
            style={{
              marginLeft: "10px",
            }}
            onChange={(e) =>
              noteCategory.changeNotes(e.target.value)
            }
          />
        </label>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "20px",
          }}
        >
          <Button
            style={{ marginRight: "10px" }}
            onClick={() => addNote(noteCategory)}
          >
            Add
          </Button>
          <Button onClick={() => removeNote(noteCategory.id)}>
            Remove
          </Button>
        </div>
      </div>
    </Col>
  </Row>
))}

<Row justify="center">
  {contents_notes.map((note) => (
    <Col key={note?.id} span={6}>
      <Card style={{ width: 300 }}>
        <p>{note?.notes}</p>
      </Card>
    </Col>
  ))}
</Row>


    
    </div>
  );
  
})

export default App;