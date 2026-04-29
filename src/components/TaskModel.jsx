/* eslint-disable react-hooks/set-state-in-effect */
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { v4 as uuidv4 } from "uuid";
import { useCreateTask, useUpdateTask, } from "@/Hooks/UseProject";

function TaskModel({ selectedTask, onClose }) {
    const { projectId } = useParams();

    const createTask = useCreateTask();
    const updateTask = useUpdateTask();

    const isEdit = !!selectedTask;

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("todo");
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (selectedTask) {
            setTitle(selectedTask.title);
            setDesc(selectedTask.description);
            setDate(selectedTask.duedate);
            setStatus(selectedTask.status);
            setOpen(true);
        }
    }, [selectedTask]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !desc || !date) {
            alert("Enter complete details");
            return;
        }

        if (isEdit) {
            updateTask.mutate(
                {
                    projectId,
                    taskId: selectedTask.id,
                    updatedTask: {
                        ...selectedTask,
                        title,
                        description: desc,
                        duedate: date,
                        status,
                    },
                },
                {
                    onSuccess: () => {
                        setOpen(false);
                        onClose?.();
                    },
                }
            );
        } else {
            createTask.mutate(
                {
                    projectId,
                    task: {
                        id: uuidv4(),
                        projectId,
                        title,
                        description: desc,
                        duedate: date,
                        status,
                    },
                },
                {
                    onSuccess: () => {
                        setTitle("");
                        setDesc("");
                        setDate("");
                        setStatus("todo");
                        setOpen(false);
                    },
                }
            );
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            {!isEdit && (
                <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                        + Add Task
                    </Button>
                </DialogTrigger>
            )}

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {isEdit ? "Edit Task" : "Create Task"}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Task name"
                    />

                    <Input
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        placeholder="Task description"
                    />

                    <Input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />

                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="w-full border rounded px-2 py-1"
                    >
                        <option value="todo">Todo</option>
                        <option value="in_progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>

                    <Button type="submit" className="w-full">
                        {isEdit ? "Update Task" : "Create Task"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default TaskModel;