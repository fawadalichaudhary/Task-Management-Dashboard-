import { Sidebar } from 'lucide-react'
import React from 'react'


function Dashboard() {
    return (
        <div className="p-4 md:p-6 w-full">
            <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="bg-white shadow-md rounded-2xl p-5 border hover:shadow-lg transition">
                    <p className="text-gray-500">Total Tasks</p>
                    <h3 className="text-2xl font-bold mt-2">totaltask</h3>
                </div>

                <div className="shadow-md rounded-2xl p-5 border hover:shadow-lg transition">
                    <p className="text-gray-500">Completed</p>
                    <h3 className="text-2xl font-bold mt-2">Completed</h3>
                </div>

                <div className="shadow-md rounded-2xl p-5 border hover:shadow-lg transition">
                    <p className="text-gray-500">Projects</p>
                    <h3 className="text-2xl font-bold mt-2">projects</h3>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;