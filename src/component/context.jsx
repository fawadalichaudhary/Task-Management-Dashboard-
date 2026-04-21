import { useState } from "react";
import data from "./Data.json";

export function useAppProvider() {

    const [tasks, setTasks] = useState(data.tasks);

    return { tasks, setTasks }



}
