import { useState } from "react";
import data from "./Data.json";

export function useAppProvider() {
    const [projects, setProjects] = useState(data.projects);
    const [tasks, setTasks] = useState(data.tasks);

    return { projects, setProjects, tasks, setTasks }



}
