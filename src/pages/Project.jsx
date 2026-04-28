import { useState } from "react";
import { useProjects, useCreateProject, useDeleteProject } from "../Hooks/UseProject";
import { useNavigate } from "react-router";
import { Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

function Projects() {
    const { projects, isLoading, isError, error } = useProjects();
    const createProject = useCreateProject();
    const navigate = useNavigate();
    const deleteProject = useDeleteProject()

    const [name, setName] = useState("");

    const addProject = (e) => {
        e.preventDefault();

        if (!name) {
            alert("Enter complete details");
            return;
        }

        createProject.mutate({
            id: uuidv4(),
            name,
        });

        setName("");
    };

    if (isLoading) return <p className="p-4">Loading...</p>;
    if (isError) return <p className="p-4">Error: {error.message}</p>;

    return (
        <div className="w-full p-4 md:p-6 bg-gray-50 min-h-screen">
            <h2 className="text-2xl font-semibold mb-6">Projects</h2>

            <form
                onSubmit={addProject}
                className="flex flex-col sm:flex-row gap-3 mb-6"
            >
                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Project name"
                    className="border rounded-lg px-2 h-12 w-full"
                />

                <button className="bg-blue-500 text-white px-5 h-12 rounded-lg">
                    Add Project
                </button>
            </form>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {projects?.map((project) => (
                    <div
                        key={project.id}
                        onClick={() =>
                            navigate(`/projects/${project.id}/tasks`)
                        }
                        className="bg-white shadow-md rounded-2xl p-4 border cursor-pointer hover:shadow-lg transition flex justify-between"
                    >
                        <p className="font-semibold text-lg">
                            {project.name}
                        </p>
                        <button > <Trash2 onClick={(e) => {
                            e.stopPropagation();
                            deleteProject.mutate(project.id)
                        }} /> </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Projects;