import { useProjects, useDeleteProject } from "../Hooks/UseProject";
import { useNavigate } from "react-router";
import { Trash2 } from "lucide-react";
import ProjectModel from "@/components/ProjectModel";

function Projects() {
    const { projects, isLoading, isError, error } = useProjects();
    const navigate = useNavigate();
    const deleteProject = useDeleteProject()




    if (isLoading) return <p className="p-4">Loading...</p>;
    if (isError) return <p className="p-4">Error: {error.message}</p>;

    return (
        <div className="w-full p-4 md:p-6 bg-gray-50 min-h-screen">
            <header className="flex justify-between">
                <h2 className="text-2xl font-semibold mb-6">Projects</h2>

                <ProjectModel />
            </header>

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