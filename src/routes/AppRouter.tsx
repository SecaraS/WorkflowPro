import { Routes, Route } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { Dashboard } from "../pages/Dashboard";
import { Login } from "../pages/Login";
import { ProtectedRoute } from "./ProtectedRoute";
import { TaskBoard } from "../pages/TaskBoard";
import { Team } from "../pages/Team";
import { Reports } from "../pages/Reports";

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<TaskBoard />} />
        <Route path="/team" element={<Team />} />
        <Route path="/reports" element={<Reports />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
