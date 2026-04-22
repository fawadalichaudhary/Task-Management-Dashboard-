/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useAppProvider } from '../component/context';
import TaskCard from '../component/TaskCard';
import { useDrop } from "react-dnd";

function Dashboard() {

    const { tasks } = useAppProvider();
    const [taskData, setTaskData] = useState(tasks);
    const Completed = taskData.filter((t) => t.status === "done");
    const inProgress = taskData.filter((t) => t.status === "progress");
    const Todo = taskData.filter((t) => t.status === "todo");


    const [{ isTodoOver }, todoDrop] = useDrop(() => ({
        accept: "task",
        drop: (item) => {
            setTaskData((prev) =>
                prev.map((t) => t.id === item.id ? { ...t, status: "todo" } : t)
            )

        },

        collect: (monitor) => ({
            isTodoOver: !!monitor.isOver()
        })

    }));
    const [{ isProgressOver }, progressDrop] = useDrop(() => ({

        accept: "task",

        drop: (item) => {

            setTaskData((prev) =>
                prev.map((t) =>
                    t.id === item.id
                        ? { ...t, status: "progress" }
                        : t
                )
            )

        },

        collect: (monitor) => ({
            isProgressOver: !!monitor.isOver()
        })

    }));
    const [{ isDoneOver }, doneDrop] = useDrop(() => ({

        accept: "task",

        drop: (item) => {

            setTaskData((prev) =>
                prev.map((t) =>
                    t.id === item.id
                        ? { ...t, status: "done" }
                        : t
                )
            )

        },

        collect: (monitor) => ({
            isDoneOver: !!monitor.isOver()
        })

    }));
    const totaltask = taskData.length;

    return (
        <div className="p-4 md:p-6 w-full bg-gray-50 min-h-screen">
            <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                Dashboard
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8">

                <div className="bg-white shadow-sm rounded-2xl p-5 border">
                    <p className="text-gray-400 text-sm">
                        Total Tasks
                    </p>

                    <h3 className="text-3xl font-bold mt-2">
                        {totaltask}
                    </h3>
                </div>

                <div className="bg-white shadow-sm rounded-2xl p-5 border">
                    <p className="text-gray-400 text-sm">
                        Completed
                    </p>

                    <h3 className="text-3xl font-bold mt-2">
                        {Completed.length}
                    </h3>
                </div>

                <div className="bg-white shadow-sm rounded-2xl p-5 border">
                    <p className="text-gray-400 text-sm">
                        In Progress
                    </p>

                    <h3 className="text-3xl font-bold mt-2">
                        {inProgress.length}
                    </h3>
                </div>

                <div className="bg-white shadow-sm rounded-2xl p-5 border">
                    <p className="text-gray-400 text-sm">
                        TODO
                    </p>

                    <h3 className="text-3xl font-bold mt-2">
                        {Todo.length}
                    </h3>
                </div>

            </div>

            <h2 className="text-2xl font-bold mb-6">
                Kanban Board
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <section ref={todoDrop} className="bg-gray-100 rounded-2xl p-4">

                    <h3 className="font-bold text-blue-600 mb-4">
                        TODO
                    </h3>

                    {Todo.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            setTaskData={setTaskData}
                        />
                    ))}

                </section>

                <section ref={progressDrop} className="bg-gray-100 rounded-2xl p-4">

                    <h3 className="font-bold text-yellow-500 mb-4">
                        PROGRESS
                    </h3>

                    {inProgress.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            setTaskData={setTaskData}
                        />
                    ))}

                </section>


                <section ref={doneDrop} className="bg-gray-100 rounded-2xl p-4">

                    <h3 className="font-bold text-green-600 mb-4">
                        DONE
                    </h3>

                    {Completed.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            setTaskData={setTaskData}
                        />
                    ))}

                </section>

            </div>
        </div>
    );
}

export default Dashboard;