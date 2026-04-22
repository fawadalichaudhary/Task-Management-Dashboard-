import React from "react";
import { useDrag } from "react-dnd";

function TaskCard({ task }) {
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
            className={`bg-white shadow-md rounded-2xl p-4 border 
            hover:shadow-lg transition mb-3 cursor-grab
            ${isDragging ? "opacity-50" : "opacity-100"}
            `}
        >
            <p className="font-semibold text-lg">
                {task.title}
            </p>
        </div>
    );
}

export default TaskCard;