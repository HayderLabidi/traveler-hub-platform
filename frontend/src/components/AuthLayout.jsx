import { Link } from "react-router-dom";
import { useDarkMode } from "@/providers/DarkModeProvider";
import { Moon, Sun } from "lucide-react";

const AuthLayout = ({ children, title, subtitle, userType }) => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const getUserTypeColor = () => {
    switch (userType) {
      case "passenger":
        return "text-blue-600 dark:text-blue-400";
      case "driver":
        return "text-green-600 dark:text-green-400";
      case "admin":
        return "text-purple-600 dark:text-purple-400";
      default:
        return "text-brand-500";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center justify-between p-4">
        <Link to="/" className="flex items-center">
          <span className="text-xl font-bold text-brand-500">RideShare</span>
        </Link>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            {userType && (
              <span className={`inline-block mb-2 font-medium ${getUserTypeColor()}`}>
                {userType.charAt(0).toUpperCase() + userType.slice(1)} Portal
              </span>
            )}
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            {subtitle && (
              <p className="mt-2 text-gray-600 dark:text-gray-400">{subtitle}</p>
            )}
          </div>
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout; 