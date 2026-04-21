import { useParams } from "react-router";
import { useAppProvider } from "../component/context";

function ProjectDetails() {
    const { id } = useParams();
    const { tasks } = useAppProvider()
    const task = tasks.find(t => t.id == id);

    return (
        <div className=" p-4 border rounded flex flex-col items-center justify-center w-screen">
            <h2 className="text-xl font-bold">{task.title}</h2>
            <p>{task.description}</p>
            <p>{task.duedate}</p>
            <p>{task.completed ? "Completed" : "Pending"}</p>
        </div>
    );
}

export default ProjectDetails;