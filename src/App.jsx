import { Route, Router, Routes } from "react-router"
import Dashboard from "./pages/Dashboard"
import Sidebar from "./pages/Sidebar"
import Project from "./pages/Project"
import ProjectDetail from "./pages/ProjectDetail"

function App() {

  return (
    <>
      <div className="flex gap-2">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="Projects" element={<Project />} />
          <Route path="Projects/Details" element={<ProjectDetail />} />
        </Routes>
      </div>
    </>
  )
}

export default App
