import { useDrop } from "react-dnd";
import { useProjects, useUpdateTask } from "../Hooks/UseProject";
import KanbanBoardCard from "../components/KanbanBoardCard";
import { useQueryClient } from "@tanstack/react-query";

function KanbanBoard() {
    const { projects = [] } = useProjects();
    const queryClient = useQueryClient()

    const updateTask = useUpdateTask();

    const allTasks = projects.flatMap(p => p.tasks || []);

    const handleStatusChange = (taskId, status) => {
        const task = allTasks?.find((t) => t.id === taskId);
        if (!task) return;

        updateTask.mutate(
            {
                projectId: task.projectId,
                taskId,
                updatedTask: { ...task, status },
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries(["projectTasks"]);
                },
            }
        );

    };

    const CreateDrop = (status) =>
        useDrop(() => ({
            accept: "task",
            drop: (item) => handleStatusChange(item.id, status),
            collect: (monitor) => ({
                isOver: monitor.isOver(),
            }),
        }), [handleStatusChange]);

    const [{ isOver: isTodoOver }, todoDrop] = CreateDrop("todo"); ``
    const [{ isOver: isProgressOver }, progressDrop] = CreateDrop("in_progress");
    const [{ isOver: isDoneOver }, doneDrop] = CreateDrop("done");

    const todo = allTasks.filter((t) => t.status === "todo");
    const inProgress = allTasks.filter((t) => t.status === "in_progress");
    const completed = allTasks.filter((t) => t.status === "done");

    const columnStyle = (isOver) =>
        `rounded-2xl p-4 border transition-all duration-200 
        ${isOver ? "bg-blue-50 border-blue-400 scale-[1.02]" : "bg-white border-gray-200"}`;

    return (
        <div className="p-4 sm:p-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                    Kanban Board
                </h2>


            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <section ref={todoDrop} className={columnStyle(isTodoOver)}>
                    <h3 className="font-semibold text-blue-600 mb-4 tracking-wide">
                        TODO ({todo.length})
                    </h3>

                    <div className="space-y-3 min-h-96 ">
                        {todo.length === 0 ? (
                            <p className="text-sm text-gray-400 text-center py-6">
                                No tasks
                            </p>
                        ) : (
                            todo.map((task) => (
                                <KanbanBoardCard key={task.id} task={task} />
                            ))
                        )}
                    </div>
                </section>

                <section ref={progressDrop} className={columnStyle(isProgressOver)}>
                    <h3 className="font-semibold text-yellow-500 mb-4 tracking-wide">
                        IN PROGRESS ({inProgress.length})
                    </h3>

                    <div className="space-y-3 min-h-96">
                        {inProgress.length === 0 ? (
                            <p className="text-sm text-gray-400 text-center py-6">
                                No tasks
                            </p>
                        ) : (
                            inProgress.map((task) => (
                                <KanbanBoardCard key={task.id} task={task} />
                            ))
                        )}
                    </div>
                </section>

                <section ref={doneDrop} className={columnStyle(isDoneOver)}>
                    <h3 className="font-semibold text-green-600 mb-4 tracking-wide">
                        DONE ({completed.length})
                    </h3>

                    <div className="space-y-3 min-h-96">
                        {completed.length === 0 ? (
                            <p className="text-sm text-gray-400 text-center py-6">
                                No tasks
                            </p>
                        ) : (
                            completed.map((task) => (
                                <KanbanBoardCard key={task.id} task={task} />
                            ))
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
}

export default KanbanBoard;