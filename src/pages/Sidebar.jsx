import { Settings, WifiCog } from "lucide-react";
import { Link } from "react-router";
import Dashboard from "./Dashboard";


function Sidebar() {
    return (
        <nav className="w-50 bg-blue-600 text-white fixed p-5 min-h-screen h-full flex flex-col justify-between shadow-lg">
            <div>
                <h1 className="text-xl font-bold mb-8">Task App</h1>
                <div className="flex flex-col gap-3 text-sm">
                    <Link to="/dashboard" className="hover:bg-white/20 px-3 py-2 rounded-lg transition">   Dashboard
                    </Link>

                    <Link to="/task" className="hover:bg-white/20 px-3 py-2 rounded-lg transition"> Projects
                    </Link>
                </div>
            </div>

            <div className="flex gap-3">
                <Settings className="cursor-pointer hover:scale-110 transition" />
                <WifiCog className="cursor-pointer hover:scale-110 transition" />
            </div>
        </nav>
    );
}

export default Sidebar;