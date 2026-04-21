import { useParams } from "react-router";
import { useState } from "react";
import { useAppProvider } from "../component/context";

function ProjectDetail() {
    const { id } = useParams();
    const { tasks, setTasks } = useAppProvider()
    const [title, setTitle] = useState("");

    const projectTasks = tasks.filter(t => t.projectId == id);

    const addTask = () => {
        const newTask = {
            id: Date.now(),
            title: title,
            description: "New Task",
            completed: false
        };

        setTasks([...tasks, newTask]);
        setTitle("");
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Project Tasks</h2>

            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task name"
                className="border p-2 mr-2"
            />

            <button onClick={addTask} className="bg-black text-white px-3 py-2">
                Add Task
            </button>

            <div className="mt-4">
                {projectTasks?.map((t) => (
                    <div key={t.id} className="bg-white p-3 mb-2 border">
                        <p> {t.title} </p>
                        <p className="text-taupe-500"> {t.description} </p>
                        <p className="text-red-600"> {t.completed} </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProjectDetail;