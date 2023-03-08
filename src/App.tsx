
import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps, MenuTheme } from 'antd';
import { Menu, Switch } from 'antd';
import { Button, Checkbox, Form, Input } from 'antd';
import './App.css';
import { Card, Col, Row } from 'antd';

import { string } from 'mobx-state-tree/dist/internal';

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
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

function App() {
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
    <div className="form">

    <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
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
    </div>
    
    <div className="button">
    <Switch
        checked={theme === 'dark'}
        onChange={changeTheme}
        checkedChildren="Dark"
        unCheckedChildren="Light"
      />
      </div>

      <div className="menu">
    <Menu
        theme={theme}
        onClick={onClick}
        style={{ width: 256 }}
        defaultOpenKeys={['sub1']}
        selectedKeys={[current]}
        mode="inline"
        items={items}
      />    
</div>
      <br />
      <br />
      {cards.map(card => ( 
              <Card title="Titlu temporar" style={{ width: 300, marginTop: "1px", right: -1225 }}> 
                <p>Nickname: {card.nickname}</p> 
                <p>Username: {card.username}</p> 
                <p>Password: {card.password}</p> 
              </Card>  
      ))}
    

    
    </div>
  );
  
}


export default App;
