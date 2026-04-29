import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCreateProject } from "@/Hooks/UseProject";
import { v4 as uuidv4 } from "uuid";

function ProjectModel() {
    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);

    const createProject = useCreateProject();

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
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-500 hover:bg-blue-600">
                    Add Project
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md rounded-xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        Create New Project
                    </DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={addProject}
                    className="flex flex-col gap-4 mt-4"
                >
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Project name"
                        className="border border-gray-200 rounded-lg px-3 h-11 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <Button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 h-11"
                    >
                        Add Project
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default ProjectModel;