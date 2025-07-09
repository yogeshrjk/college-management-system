import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/DashboardLayout";
import { Dashboard } from "./components/pages/Dashboard";
import { Events } from "./components/pages/Events";
import { Notices } from "./components/pages/Notices";
import { Notes } from "./components/pages/Notes";
import { Paper } from "./components/pages/Paper";
// import { Schedule } from "./components/pages/Schedule";
import "./app.css";
import { Analytics } from "@vercel/analytics/react";
import Login from "./components/pages/Login";
import Register from "./components/pages/SignUp";
import AskAI from "./components/pages/AskAI";
import AuthGuard from "./components/AuthGuard";

function App() {
  return (
    <>
      <Analytics />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route
            element={
              <AuthGuard>
                <DashboardLayout />
              </AuthGuard>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="events" element={<Events />} />
            <Route path="notices" element={<Notices />} />
            <Route path="notes" element={<Notes />} />
            <Route path="papers" element={<Paper />} />
            <Route path="askai" element={<AskAI />} />
            {/* <Route path="schedule" element={<Schedule />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
