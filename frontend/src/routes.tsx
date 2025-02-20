import { Route, Routes,  } from "react-router-dom";
import Tasks from "./pages/Tasks";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Tasks />} />
    </Routes>
  )
}

export default AppRoutes;