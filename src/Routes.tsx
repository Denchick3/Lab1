import { Routes, Route } from "react-router-dom";
import App from "./App";
import { Login } from "./Login";
import { Content } from "./Content";
import { LocalStorageData } from "./LocalStorageData";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/login" element={<Login />} />
        <Route path="/content" element={<Content />} />
        <Route path="/local-storage" element={<LocalStorageData />} />
      </Route>
    </Routes>
  );
};
