/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState } from "react";
import data from "./Data.json"

const AppContext = createContext(null);

export function AppProvider({ children }) {
    const [tasks, setTasks] = useState(data.tasks);
    const updateTaskStatus = (id, newStatus) => {
        setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
        );
    };

    return (
        <AppContext.Provider value={{ tasks, setTasks, updateTaskStatus }}>
            {children}
        </AppContext.Provider>
    );
}

export function useAppProvider() {
    const context = useContext(AppContext);
    return context;
}