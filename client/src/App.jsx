import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/DashboardLayout";
import { Dashboard } from "./components/pages/Dashboard";
import { Events } from "./components/pages/Events";
import { Notices } from "./components/pages/Notices";
import { Notes } from "./components/pages/Notes";
import { Paper } from "./components/pages/Paper";
import { Schedule } from "./components/pages/Schedule";
import "./app.css";
import Login from "./components/pages/Login";
import Register from "./components/pages/SignUp";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="events" element={<Events />} />
          <Route path="notices" element={<Notices />} />
          <Route path="notes" element={<Notes />} />
          <Route path="papers" element={<Paper />} />
          <Route path="schedule" element={<Schedule />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
