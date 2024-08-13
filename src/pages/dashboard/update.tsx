import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Wrapper from "../../components/wrapper";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { User } from "../../constant/data";
import toast from "react-hot-toast";

const createSchema = z.object({
  name: z.string().min(5, {
    message: "Nama minimal 5 huruf!",
  }),
  company: z.string().min(5, {
    message: "Perusahan minimal 5 huruf!",
  }),
  role: z.string().min(1, {
    message: "Posisi Tidak boleh kosong!",
  }),
});

const Update = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(createSchema),
    defaultValues: {
      name: "",
      company: "",
      role: "",
    },
  });

  const { id } = useParams();

  const navigate = useNavigate();

  const [users, setUsers] = useState<User[] | null>(null);
  const [, setSelectedUser] = useState<User | null>(null);

  const update = ({ name, company, role }: z.infer<typeof createSchema>) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const userData = localStorage.getItem("userData");
        if (userData) {
          const newUser = {
            id: parseInt(id!),
            name,
            company,
            role,
          };

          const formattedUserData = JSON.parse(userData);
          const updatedUserData = formattedUserData.map((user: User) =>
            user.id === newUser.id ? newUser : user
          );

          localStorage.setItem("userData", JSON.stringify(updatedUserData));

          resolve(true);

          setTimeout(() => {
            navigate("/");
          }, 2500);
        }

        reject(true);
      }, 2000);
    });
  };

  const handleUpdateSubmit = (values: z.infer<typeof createSchema>) => {
    console.log(values);
    const checkData = update(values);
    toast.promise(checkData, {
      loading: "loading...",
      success: "Pengguna telah diganti!",
      error: "Gagal mengganti pengguna!",
    });
  };

  useEffect(() => {
    const getUsername = localStorage.getItem("username");
    const getUserData = localStorage.getItem("userData");

    if (getUserData && id) {
      const userData = JSON.parse(getUserData);
      setUsers(userData);
      const findUser = userData.find((user: User) => user.id === parseInt(id));
      if (findUser) {
        setSelectedUser(findUser);
        reset({
          name: findUser.name,
          company: findUser.company,
          role: findUser.role,
        });
      }
    }

    if (!getUsername) {
      navigate("/login");
    }
  }, [id, reset, navigate]);
  return (
    <main className="h-[100vh] dark:bg-gray-950 dark:text-white">
      <Navbar />
      <Wrapper>
        <form onSubmit={handleSubmit(handleUpdateSubmit)}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Nama
            </label>
            <input
              type="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="agus supriyadi"
              required
              {...register("name")}
            />
            {errors.name?.message && (
              <p className="text-xs text-red-500 mt-2">
                {errors.name?.message}
              </p>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="company"
              className="block mb-2 text-xs font-medium text-gray-900"
            >
              Perusahaan
            </label>
            <input
              type="company"
              id="company"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Aksamedia"
              required
              {...register("company")}
            />
            {errors.company?.message && (
              <p className="text-xs text-red-500 mt-2">
                {errors.company?.message}
              </p>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="role"
              className="block mb-2 text-xs font-medium text-gray-900"
            >
              Posisi
            </label>
            <select
              id="role"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              {...register("role")}
            >
              <option value="">Pilih Posisi</option>
              {users &&
                users.map((user) => (
                  <option key={user.id} value={user.role}>
                    {user.role}
                  </option>
                ))}
            </select>
            {errors.role?.message && (
              <p className="text-xs text-red-500 mt-2">
                {errors.role?.message}
              </p>
            )}
          </div>
          <div className="mb-5 text-right">
            <button
              type="submit"
              disabled={isSubmitting}
              className="border border-blue-500 rounded-lg px-4 py-2 hover:bg-blue-50"
            >
              {isSubmitting ? "loading..." : "Submit"}
            </button>
          </div>
        </form>
      </Wrapper>
    </main>
  );
};

export default Update;
