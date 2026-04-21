import { Sidebar } from 'lucide-react'
import React from 'react'


function Dashboard() {
    // const { projects, tasks } = useAppProvider();

    // const totalTasks = tasks.length;
    // const completed = tasks.filter(t => t.completed).length;

    return (
        <>
            <div>
                <h2 className="text-xl font-bold mb-4">Dashboard</h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 ">
                    <div className="bg-white p-2 rounded border">
                        <p>Total Tasks</p>
                        <h3 className="text-xl">totaltask</h3>
                    </div>

                    <div className="bg-white p-4 rounded border">
                        <p>Completed</p>
                        <h3 className="text-xl">Completed</h3>
                    </div>

                    <div className="bg-white p-4 rounded border">
                        <p>Projects</p>
                        <h3 className="text-xl">projects</h3>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Dashboard
