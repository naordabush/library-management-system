import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Table from "./components/Table";
import NoPage from "./components/NoPage";
import MemberTable from "./components/MemberTable";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/table" element={<Table />} />
        <Route path="/members" element={<MemberTable />} />
        <Route path="/*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
