/* eslint-disable no-unused-vars */
import React from "react";
import { useAppProvider } from "../context/context";
import Dashboardcard from "../component/Dashboardcard";
import { useDrop } from "react-dnd";

function Dashboard() {
    const { tasks, updateTaskStatus } = useAppProvider();

    const todo = tasks.filter((t) => t.status === "todo");
    const inProgress = tasks.filter((t) => t.status === "progress");
    const completed = tasks.filter((t) => t.status === "done");
    const totalTasks = tasks.length;

    const [{ isTodoOver }, todoDrop] = useDrop(() => ({
        accept: "task",
        drop: (item) => updateTaskStatus(item.id, "todo"),
        collect: (monitor) => ({
            isTodoOver: !!monitor.isOver(),
        }),
    }));

    const [{ isProgressOver }, progressDrop] = useDrop(() => ({
        accept: "task",
        drop: (item) => updateTaskStatus(item.id, "progress"),
        collect: (monitor) => ({
            isProgressOver: !!monitor.isOver(),
        }),
    }));

    const [{ isDoneOver }, doneDrop] = useDrop(() => ({
        accept: "task",
        drop: (item) => updateTaskStatus(item.id, "done"),
        collect: (monitor) => ({
            isDoneOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div className="p-4 md:p-6 w-full bg-gray-50 min-h-screen">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">Dashboard</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                <div className="bg-white shadow-sm rounded-2xl p-5 border">
                    <p className="text-gray-400 text-sm">Total Tasks</p>
                    <h3 className="text-3xl font-bold mt-2">{totalTasks}</h3>
                </div>

                <div className="bg-white shadow-sm rounded-2xl p-5 border">
                    <p className="text-gray-400 text-sm">Completed</p>
                    <h3 className="text-3xl font-bold mt-2 text-green-500">{completed.length}</h3>
                </div>

                <div className="bg-white shadow-sm rounded-2xl p-5 border">
                    <p className="text-gray-400 text-sm">In Progress</p>
                    <h3 className="text-3xl font-bold mt-2 text-yellow-500">{inProgress.length}</h3>
                </div>

                <div className="bg-white shadow-sm rounded-2xl p-5 border">
                    <p className="text-gray-400 text-sm">TODO</p>
                    <h3 className="text-3xl font-bold mt-2 text-blue-500">{todo.length}</h3>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-6">Kanban Board</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                <section
                    ref={todoDrop}
                    className="rounded-2xl p-4 transition-colors duration-200 border-2"
                >
                    <h3 className="font-bold text-blue-600 mb-4">TODO</h3>
                    {todo.length === 0 && (
                        <p className="text-sm text-gray-400 text-center py-4">No tasks</p>
                    )}
                    {todo.map((task) => (
                        <Dashboardcard key={task.id} task={task} />
                    ))}
                </section>

                <section
                    ref={progressDrop}
                    className="rounded-2xl p-4 transition-colors duration-200 border-2"
                >
                    <h3 className="font-bold text-yellow-500 mb-4">IN PROGRESS</h3>
                    {inProgress.length === 0 && (
                        <p className="text-sm text-gray-400 text-center py-4">No tasks</p>
                    )}
                    {inProgress.map((task) => (
                        <Dashboardcard key={task.id} task={task} />
                    ))}
                </section>
                <section
                    ref={doneDrop}
                    className="rounded-2xl p-4 transition-colors duration-200 border-2" >
                    <h3 className="font-bold text-green-600 mb-4">DONE</h3>
                    {completed.length === 0 && (
                        <p className="text-sm text-gray-400 text-center py-4">No tasks</p>
                    )}
                    {completed.map((task) => (
                        <Dashboardcard key={task.id} task={task} />
                    ))}
                </section>

            </div>
        </div>
    );
}

export default Dashboard;