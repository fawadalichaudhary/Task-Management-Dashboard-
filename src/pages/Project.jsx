import { useState } from "react";
import { useAppProvider } from "../component/context";
import { Eye, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";

function Project() {
    const navigate = useNavigate();
    const { tasks, setTasks } = useAppProvider();
    const [title, setTitle] = useState("");
    const [Desc, setDesc] = useState("");

    const addTask = (e) => {
        e.preventDefault();
        const newTask = {
            id: Date.now(),
            title: title,
            description: Desc,
            completed: false,
        };

        setTasks([...tasks, newTask]);
        setTitle("");
        setDesc("");
    };
    const deleteProject = (id) => {
        const updated = tasks.filter((p) => p.id !== id);
        setTasks(updated);
    };

    return (
        <div className="w-full">
            <h2 className="text-xl font-bold mb-4">Project Tasks</h2>
            <form action="" className="flex flex-wrap gap-2">
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task name"
                    className="border p-2 mr-2"
                />

                <input
                    value={Desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Task description"
                    className="border p-2 mr-2"
                />

                <button onClick={addTask} className="bg-black text-white px-3 py-2">
                    Add Task
                </button>
            </form>
            <div className="mt-4 flex gap-1.5 flex-wrap">
                {tasks?.map((t) => (
                    <div
                        key={t.id}
                        className="p-3 mb-2 border rounded-lg max-w-80 w-full flex justify-between cursor-pointer"
                    >
                        <div>
                            <p> {t.title} </p>
                            <p className="text-taupe-500"> {t.description} </p>
                        </div>
                        <div className="flex flex-col">
                            <button>
                                <Eye onClick={() => navigate(`details/${t.id}`)} />
                            </button>
                            <button
                                onClick={() => deleteProject(t.id)}
                                className="text-red-500"
                            >
                                <Trash2 />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Project;
