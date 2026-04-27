import React, { useState } from "react";
import { useParams } from "react-router";
import Dashboardcard from "../component/Dashboardcard";
import { useDrop } from "react-dnd";

import {
    useProjects,
    useProjectTasks,
    useUpdateTask,
} from "../Hooks/UseProject";

function Dashboard() {
    const { projectId: routeProjectId } = useParams();

    const { projects = [] } = useProjects();

    const [selectedProject, setSelectedProject] = useState(routeProjectId || "");

    const {
        tasks = [],
        isLoading,
        isError,
        error,
    } = useProjectTasks(selectedProject);

    const updateTask = useUpdateTask();

    const handleStatusChange = (taskId, status) => {
        const task = tasks.find((t) => t.id === taskId);
        if (!task) return;

        updateTask.mutate({
            projectId: selectedProject,
            taskId,
            updatedTask: { ...task, status },
        });
    };

    const [, todoDrop] = useDrop(() => ({
        accept: "task",
        drop: (item) => handleStatusChange(item.id, "todo"),
    }));

    const [, progressDrop] = useDrop(() => ({
        accept: "task",
        drop: (item) => handleStatusChange(item.id, "progress"),
    }));

    const [, doneDrop] = useDrop(() => ({
        accept: "task",
        drop: (item) => handleStatusChange(item.id, "done"),
    }));

    const todo = tasks.filter((t) => t.status === "todo");
    const inProgress = tasks.filter((t) => t.status === "progress");
    const completed = tasks.filter((t) => t.status === "done");

    const totalTasks = tasks.length;

    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div className="p-4 md:p-6 w-full bg-gray-50 min-h-screen">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Dashboard</h2>

            <div className="mb-6">
                <label className="block text-gray-600 font-medium mb-2">
                    Select Project
                </label>

                <select
                    className="border p-3 rounded-lg bg-white shadow-sm w-full md:w-80"
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                >
                    <option value="">Select Project</option>
                    {projects.map((p) => (
                        <option key={p.id} value={p.id}>
                            {p.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                <div className="bg-white shadow-sm rounded-2xl p-5 border">
                    <p className="text-gray-400 text-sm">Total Tasks</p>
                    <h3 className="text-3xl font-bold mt-2">{totalTasks}</h3>
                </div>

                <div className="bg-white shadow-sm rounded-2xl p-5 border">
                    <p className="text-gray-400 text-sm">Completed</p>
                    <h3 className="text-3xl font-bold mt-2 text-green-500">
                        {completed.length}
                    </h3>
                </div>

                <div className="bg-white shadow-sm rounded-2xl p-5 border">
                    <p className="text-gray-400 text-sm">In Progress</p>
                    <h3 className="text-3xl font-bold mt-2 text-yellow-500">
                        {inProgress.length}
                    </h3>
                </div>

                <div className="bg-white shadow-sm rounded-2xl p-5 border">
                    <p className="text-gray-400 text-sm">TODO</p>
                    <h3 className="text-3xl font-bold mt-2 text-blue-500">
                        {todo.length}
                    </h3>
                </div>
            </div>
            {isLoading && <p className="text-gray-500 mb-4">Loading tasks...</p>}

            <h2 className="text-2xl font-bold mb-6">Kanban Board</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <section ref={todoDrop} className="rounded-2xl p-4 border-2">
                    <h3 className="font-bold text-blue-600 mb-4">TODO</h3>

                    {todo.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center py-4">No tasks</p>
                    ) : (
                        todo.map((task) => <Dashboardcard key={task.id} task={task} />)
                    )}
                </section>

                <section ref={progressDrop} className="rounded-2xl p-4 border-2">
                    <h3 className="font-bold text-yellow-500 mb-4">IN PROGRESS</h3>

                    {inProgress.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center py-4">No tasks</p>
                    ) : (
                        inProgress.map((task) => (
                            <Dashboardcard key={task.id} task={task} />
                        ))
                    )}
                </section>

                <section ref={doneDrop} className="rounded-2xl p-4 border-2">
                    <h3 className="font-bold text-green-600 mb-4">DONE</h3>

                    {completed.length === 0 ? (
                        <p className="text-sm text-gray-400 text-center py-4">No tasks</p>
                    ) : (
                        completed.map((task) => <Dashboardcard key={task.id} task={task} />)
                    )}
                </section>
            </div>
        </div>
    );
}

export default Dashboard;
