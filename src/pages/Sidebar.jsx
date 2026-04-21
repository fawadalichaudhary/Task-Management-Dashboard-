import { Settings, WifiCog } from "lucide-react";
import { Link } from "react-router";
import Dashboard from "./Dashboard";


function Sidebar() {
    return (
        <nav className="max-w-40 w-full bg-blue-400 p-5 h-screen rounded-r-lg flex justify-between flex-col">
            <div >
                <h1 className="text-lg font-bold mb-5">Task App</h1>
                <div className="flex flex-col gap-2 text-white">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/Projects">Projects</Link>

                </div>
            </div>
            <div className="flex gap-2 ">
                <Settings className="text-white h-6 w-6 cursor-pointer" />
                <WifiCog className="text-white h-6 w-6 cursor-pointer" />
            </div>
        </nav>
    );
}

export default Sidebar;