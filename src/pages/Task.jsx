import { useState } from "react";
import { useAppProvider } from "../component/context";
import { Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

function Task() {
    const navigate = useNavigate();
    const { tasks, setTasks } = useAppProvider();
    const [title, setTitle] = useState("");
    const [Desc, setDesc] = useState("");
    const [Date1, setDate1] = useState("")

    const addTask = (e) => {
        e.preventDefault();
        const newTask = {
            id: Date.now(),
            title: title,
            description: Desc,
            duedate: Date1,
            status: "todo"
        };

        tasks.push(newTask)
        console.log(tasks);
        setTitle("");
        setDesc("");
    };

    const deleteTask = (id) => {
        const updated = tasks.filter((p) => p.id !== id);
        setTasks(updated);
    };

    return (
        <div className="w-full p-4 md:p-6">
            <h2 className="text-2xl font-semibold mb-6">Project Tasks</h2>

            <form className="flex flex-col sm:flex-row gap-3 mb-6">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task name"
                    className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <input
                    value={Desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Task description"
                    className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="number"
                    value={Date}
                    onChange={(e) => setDate1(e.target.value)}
                    placeholder="Task name"
                    className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                <button
                    onClick={addTask}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg transition"
                >
                    Add Task
                </button>
            </form>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tasks?.map((t) => (
                    <div
                        key={t.id}
                        className="bg-white shadow-md rounded-2xl p-4 border flex justify-between items-start hover:shadow-lg transition"
                    >
                        <div>
                            <p className="font-semibold text-lg">{t.title}</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <button>
                                <Eye
                                    className="cursor-pointer text-gray-600 hover:text-blue-500"
                                    onClick={() => navigate(`details/${t.id}`)}
                                />
                            </button>

                            <button
                                onClick={() => deleteTask(t.id)}
                                className="text-red-500 hover:text-red-600"
                            >
                                <Trash2 className="cursor-pointer" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Task;
