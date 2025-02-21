import { Route, Routes, } from "react-router-dom";
import Tasks from "./pages/Tasks";
import { TaskProvider } from "./providers/TaskProvider";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <TaskProvider>
            <Tasks />
          </TaskProvider>
        }
      />
    </Routes>
  )
}

export default AppRoutes;
