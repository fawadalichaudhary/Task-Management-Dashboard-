import { useProjects } from "@/Hooks/UseProject";
import { Eye } from "lucide-react";
import React from "react";
import { useDrag } from "react-dnd";

function KanbanBoardCard({ task }) {
    const { projects = [] } = useProjects()
    const project = projects.find(p => p.id === task.projectId);

    const [{ isDragging }, drag] = useDrag(() => ({

        type: "task",

        item: { id: task.id },

        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }));
    return (
        <div
            ref={drag}
            className={`bg-white shadow-md rounded-2xl p-4 border flex flex-col 
            hover:shadow-lg transition mb-3 cursor-grab
            ${isDragging ? "opacity-50" : "opacity-100"}
            `}
        >
            <p className="font-semibold text-lg hover:text-blue-500">
                {task.title}
            </p>
            <span className="text-xs text-gray-400">
                {project?.name}
            </span>
        </div>
    );
}

export default KanbanBoardCard;