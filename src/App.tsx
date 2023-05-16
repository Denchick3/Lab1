import React, { useState, useEffect } from "react";
import mockUsers from "./mock-data";

interface User {
  username: string;
  password: string;
}

const App = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(mockUsers));

    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      setUsers(mockUsers);
    }
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const getUserFromLocalStorage = (username: string, password: string): User | null => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      const users = JSON.parse(storedUsers);
      const user = users.find((user: User) => user.username === username && user.password === password);
      return user;
    }
    return null;
  }

  const handleLogin = () => {
    const user = getUserFromLocalStorage(username, password);
    if (user) {
      alert("Login successful");
    } else {
      alert("Login failed");
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
      </div>
      <button type="submit">Log in</button>
    </form>
  );
};

export default App;