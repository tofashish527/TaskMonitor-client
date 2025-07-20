import { Link } from "react-router";
import logo from "../assets/img/logo.png";

const Logo = () => {
    return (
        <Link to="/">
            <div className="flex items-center gap-2">
                <img
                    src={logo}
                    alt="TaskMonitor_Logo"
                    className="h-16 w-auto max-w-[200px] object-contain"
                />
                <p className="text-4xl font-bold text-white">Task Monitor</p>
            </div>
        </Link>
    );
};

export default Logo;
