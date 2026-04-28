import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Eye, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

import { useProjectTasks, useCreateTask, useDeleteTask, } from "../Hooks/UseProject";

function Task() {
    const navigate = useNavigate();
    const { projectId } = useParams();

    const { tasks, isLoading, isError, error } = useProjectTasks(projectId);
    const createTask = useCreateTask();
    const deleteTask = useDeleteTask();

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState("");
    console.log(tasks);


    const addTask = (e) => {
        e.preventDefault();

        if (title && desc && date) {
            createTask.mutate({
                projectId,
                task: {
                    id: uuidv4(),
                    projectId: 1,
                    title: title,
                    description: desc,
                    duedate: date,
                    status: "todo",
                },
            });

            setTitle("");
            setDesc("");
            setDate("");
        } else {
            alert("Enter complete details");
        }
    };
    const handleDelete = (taskId) => {
        deleteTask.mutate({
            projectId,
            taskId,
        });
    };

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error.message}</p>;

    return (
        <div className="w-full p-4 md:p-6">
            <h2 className="text-2xl font-semibold mb-6">Project Tasks</h2>
            <form
                onSubmit={addTask}
                className="flex flex-col sm:flex-row gap-3 mb-6"
            >
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task name"
                    className="border rounded-lg px-1 h-12 w-full"
                />

                <input
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    placeholder="Task description"
                    className="border rounded-lg px-1 h-12 w-full"
                />

                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="border rounded-lg px-1 h-12 w-full"
                />

                <button className="bg-blue-500 text-white px-5 h-12 rounded-lg">
                    Add Task
                </button>
            </form>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tasks?.map((t) => (
                    <div
                        key={t.id}
                        className="bg-white shadow-md rounded-2xl p-4 border flex justify-between"
                    >
                        <div>
                            <p className="font-semibold text-lg">{t.title}</p>
                            <p className="text-sm text-gray-500">
                                {t.description}
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Eye
                                className="cursor-pointer text-gray-600 hover:text-blue-500"
                                onClick={() =>
                                    navigate(`/projects/${projectId}/details/${t.id}`)
                                }
                            />

                            <Trash2
                                className="cursor-pointer text-red-500"
                                onClick={() => handleDelete(t.id)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Task;