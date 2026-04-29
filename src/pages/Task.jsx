import { useParams } from "react-router";
import { SquarePen, Trash2 } from "lucide-react";
import { useProjectTasks, useDeleteTask } from "../Hooks/UseProject";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TaskModel from "@/components/TaskModel";
import { useState } from "react";

function Task() {
    const { projectId } = useParams();

    const { tasks, isLoading, isError, error } = useProjectTasks(projectId);
    const deleteTask = useDeleteTask();

    const [selectedTask, setSelectedTask] = useState(null);

    const handleDelete = (taskId) => {
        deleteTask.mutate({
            projectId,
            taskId,
        });
    };

    if (isLoading) return <p className="text-center py-10 text-gray-500">Loading...</p>;
    if (isError) return <p className="text-center py-10 text-red-500">Error: {error.message}</p>;

    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-8">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                    Project Tasks
                </h2>
                <TaskModel />
            </div>
            {selectedTask && (
                <TaskModel
                    selectedTask={selectedTask}
                    onClose={() => setSelectedTask(null)}
                />
            )}

            <div className="rounded-xl border shadow-sm overflow-hidden bg-white">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-gray-50">
                            <TableHead>Title</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {tasks?.map((t) => (
                            <TableRow key={t.id} className="hover:bg-gray-50">
                                <TableCell>{t.title}</TableCell>
                                <TableCell className="truncate max-w-xs">
                                    {t.description}
                                </TableCell>
                                <TableCell>{t.duedate}</TableCell>
                                <TableCell>{t.status}</TableCell>

                                <TableCell className="flex justify-end gap-4">
                                    <SquarePen
                                        className="w-5 h-5 cursor-pointer text-gray-500 hover:text-blue-600"
                                        onClick={() => setSelectedTask(t)}
                                    />

                                    <Trash2
                                        className="w-5 h-5 cursor-pointer text-red-500 hover:text-red-600"
                                        onClick={() => handleDelete(t.id)}
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default Task;