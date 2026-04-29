import DashBoardGraph from "@/components/DashBoardGraph";
import { useProjects } from "../Hooks/UseProject";

function Dashboard() {
    const { projects = [] } = useProjects();

    const allTasks = projects.flatMap(p => p.tasks || []);
    console.log({ projects });

    const totalTasks = allTasks.length;
    const todo = allTasks.filter((t) => t.status === "todo");
    const inProgress = allTasks.filter((t) => t.status === "in_progress");
    const completed = allTasks.filter((t) => t.status === "done");

    console.log({ totalTasks });

    return (
        <div className="p-4 md:p-8 w-full bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
                    Dashboard
                </h2>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <p className="text-sm text-gray-400 uppercase">Total Tasks</p>
                        <h3 className="text-3xl font-bold mt-3">{totalTasks}</h3>
                    </div>


                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <p className="text-sm text-gray-400 uppercase">Todo</p>
                        <h3 className="text-3xl font-bold text-blue-500 mt-3">
                            {todo.length}
                        </h3>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <p className="text-sm text-gray-400 uppercase">In Progress</p>
                        <h3 className="text-3xl font-bold text-yellow-500 mt-3">
                            {inProgress.length}
                        </h3>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm border">
                        <p className="text-sm text-gray-400 uppercase">Completed</p>
                        <h3 className="text-3xl font-bold text-green-500 mt-3">
                            {completed.length}
                        </h3>
                    </div>
                    <DashBoardGraph
                        todo={todo.length}
                        inProgress={inProgress.length}
                        completed={completed.length}
                    />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;