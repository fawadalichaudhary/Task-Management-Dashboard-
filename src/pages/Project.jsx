import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import { useAppProvider } from '../component/context';
import { Trash2 } from 'lucide-react';

function Project() {
    const { projects, setProjects } = useAppProvider()
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const addProject = (e) => {
        e.preventDefault()
        const newProject = {
            id: Date.now(),
            name: name,
        };

        setProjects([...projects, newProject]);
        setName("");
    };

    const deleteProject = (id) => {
        const updated = projects.filter(p => p.id !== id);
        setProjects(updated);
    };
    return (

        <div>
            <h2 className="text-xl font-bold mb-4">Projects</h2>
            <form action="">
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Project name"
                    className="border p-2 mr-2 rounded-md"
                />

                <button className="bg-black text-white px-3 py-2 rounded-md" onClick={addProject}>
                    Add
                </button>
            </form>
            <div className="mt-4">
                {projects.map((p) => (
                    <div key={p.id} className="bg-white p-3 mb-2 border rounded-sm flex justify-between">
                        <span onClick={() => navigate("Details")}>
                            {p.name}
                        </span>

                        <button
                            onClick={() => deleteProject(p.id)}
                            className="ml-4 text-red-500"
                        >
                            <Trash2 />
                        </button>
                    </div>
                ))}
            </div>
        </div>

    )
}

export default Project
