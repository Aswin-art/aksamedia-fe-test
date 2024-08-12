import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Wrapper from "../../components/wrapper";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { User, users } from "../../constant/data";
import Modal from "../../components/modal";

const Index = () => {
  const [username, setUsername] = useState<string | null>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedRole, setSelectedRole] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<"update" | "delete" | null>(
    null
  );
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getUsername = localStorage.getItem("username");
    if (!getUsername) {
      navigate("/login");
    }
    setUsername(getUsername);

    const page = parseInt(searchParams.get("page") || "1", 10);
    setCurrentPage(page);
    setSearchTerm(searchParams.get("search") || "");
    setSelectedRole(searchParams.get("role") || "All");
  }, [navigate, searchParams]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const search = event.target.value;
    setSearchTerm(search);
    searchParams.set("search", search);
    searchParams.set("page", "1"); // Reset to page 1 on search
    setSearchParams(searchParams);
  };

  const handleFilterRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const role = event.target.value;
    setSelectedRole(role);
    searchParams.set("role", role);
    searchParams.set("page", "1"); // Reset to page 1 on filter change
    setSearchParams(searchParams);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "All" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / 5);
  const validPage = Math.max(1, Math.min(currentPage, totalPages));

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  const currentPageUsers = filteredUsers.slice(
    (validPage - 1) * 5,
    validPage * 5
  );

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    searchParams.set("page", page.toString());
    setSearchParams(searchParams);
  };

  const handleActionClick = (user: User, action: "update" | "delete") => {
    setSelectedUser(user);
    setModalAction(action);
    setModalOpen(true);
  };

  const handleModalConfirm = () => {
    if (modalAction === "delete") {
      console.log("Delete user:", selectedUser);
    } else if (modalAction === "update") {
      console.log("Update user:", selectedUser);
    }
    setModalOpen(false);
    setSelectedUser(null);
    setModalAction(null);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedUser(null);
    setModalAction(null);
  };

  return (
    <main className="h-[100vh] dark:bg-gray-950 dark:text-white">
      <Navbar />
      <Wrapper>
        <div className="pt-10">
          <h3 className="text-xl">
            Selamat Datang, <span className="text-blue-500">{username} 👋</span>
          </h3>

          <div className="mt-10">
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm"
                />

                <select
                  value={selectedRole}
                  onChange={handleFilterRole}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm"
                >
                  <option value="All">All Roles</option>
                  {[...new Set(users.map((user) => user.role))].map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              <Link to={"/create/user"}>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2">
                  Tambah Data
                </button>
              </Link>
            </div>

            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Username
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {currentPageUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-200">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {user.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {user.company}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      {user.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                      <button
                        onClick={() => handleActionClick(user, "update")}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2"
                      >
                        Update
                      </button>
                      <button
                        onClick={() => handleActionClick(user, "delete")}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage <= 1}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm"
              >
                Previous
              </button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg text-sm"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        <Modal
          isOpen={modalOpen}
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
          title={
            modalAction === "delete"
              ? "Delete Confirmation"
              : "Update Confirmation"
          }
          message={
            modalAction === "delete"
              ? `Are you sure you want to delete user ${selectedUser?.name}?`
              : `Are you sure you want to update user ${selectedUser?.name}?`
          }
        />
      </Wrapper>
    </main>
  );
};

export default Index;
