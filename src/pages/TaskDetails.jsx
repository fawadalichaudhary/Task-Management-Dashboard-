import { useParams } from "react-router";
import { useAppProvider } from "../context/context";

function TaskDetails() {
    const { id } = useParams();
    const { tasks } = useAppProvider()
    const task = tasks.find(t => t.id == id);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center border">
                <h2 className="text-2xl font-bold mb-3">{task.title}</h2>
                <p className="text-gray-600 mb-2">{task.description}</p>
                <p className="text-sm text-gray-500 mb-1">
                    Due: {task.duedate}
                </p>
                <p
                    className={`mt-3 font-semibold ${task.status === "done" ? "text-green-500" : "text-yellow-500"}`}>
                    {task.status === "done" ? "Completed" : "Pending"}
                </p>
            </div>
        </div>

    );
}

export default TaskDetails;