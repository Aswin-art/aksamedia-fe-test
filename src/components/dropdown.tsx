import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Dropdown = () => {
  const [isOpen, setIsopen] = useState(false);
  const [username, setUsername] = useState<string | null>("");
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsopen(!isOpen);
  };

  const logout = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.clear();
        resolve(true);
      }, 1000);
    });
  };

  const handleLogout = () => {
    const logoutFnc = logout();
    toast.promise(logoutFnc, {
      loading: "loading...",
      success: "Berhasil logout!",
      error: "Gagal logout!",
    });

    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  useEffect(() => {
    const getUsername = localStorage.getItem("username");
    setUsername(getUsername);
  }, []);
  return (
    <div className="relative">
      <p
        className="underline cursor-pointer dark:text-white"
        onClick={toggleDropdown}
      >
        {username}
      </p>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-transparent rounded-lg border border-blue-500 z-20">
          <ul className="rounded-lg">
            <li
              onClick={handleLogout}
              className="cursor-pointer px-4 py-2 text-gray-800 hover:bg-blue-900/10 dark:text-white rounded-lg"
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
