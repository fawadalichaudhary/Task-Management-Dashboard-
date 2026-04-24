import { Route, Router, Routes } from "react-router"
import Dashboard from "./pages/Dashboard"
import Sidebar from "./component/Sidebar"
import Task from "./pages/Task"
import TaskDetails from "./pages/TaskDetails"

function App() {

  return (
    <>
      <div className="flex gap-2">
        <Sidebar />
        <div className="ml-50 w-full">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="task" element={<Task />} />
            <Route path="task/details/:id" element={<TaskDetails />} />
            <Route path="dashboard/details/:id" element={<TaskDetails />} />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
