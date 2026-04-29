import { Route, Router, Routes } from "react-router"
import Dashboard from "./pages/Dashboard"
import Sidebar from "./components/Sidebar"
import Task from "./pages/Task"
import Projects from "./pages/Project"
import KanbanBoard from "./pages/KanbanBoard"

function App() {

  return (
    <>
      <div className="flex gap-2">
        <Sidebar />
        <div className="ml-50 w-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="kanbanBoard" element={<KanbanBoard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="projects/:projectId/tasks" element={<Task />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
