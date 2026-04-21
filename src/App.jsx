import { Route, Router, Routes } from "react-router"
import Dashboard from "./pages/Dashboard"
import Sidebar from "./pages/Sidebar"
import Project from "./pages/Project"
import ProjectDetails from "./pages/ProjectDetails"

function App() {

  return (
    <>
      <div className="flex gap-2">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="projects" element={<Project />} />
          <Route path="projects/details/:id" element={<ProjectDetails />} />
        </Routes>
      </div>
    </>
  )
}

export default App
