import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const loginSchema = z.object({
  username: z.string().min(5, {
    message: "Username minimal 5 huruf!",
  }),
  password: z.string().min(1, {
    message: "Password tidak boleh kosong!",
  }),
});

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "Admin",
      password: "admin",
    },
  });

  const navigate = useNavigate();

  const login = ({ username, password }: z.infer<typeof loginSchema>) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === "Admin" && password === "admin") {
          resolve(true);
          setTimeout(() => {
            localStorage.setItem("username", username);
            navigate("/");
          }, 2500);
        } else reject(false);
      }, 2000);
    });
  };

  const handleLoginSubmit = (values: z.infer<typeof loginSchema>) => {
    const checkData = login(values);
    toast.promise(checkData, {
      loading: "loading...",
      success: "Berhasil login!",
      error: "Username / Password tidak benar!",
    });
  };

  useEffect(() => {
    const getUsername = localStorage.getItem("username");

    if (getUsername) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <main className="h-[100vh] w-[100vw] flex items-center justify-center">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl md:text-3xl font-bold text-center">
          Dashboard - <span className="text-blue-500">Login</span>
        </h2>
        <div className="border border-blue-500 rounded-lg p-4 min-w-[500px]">
          <form onSubmit={handleSubmit(handleLoginSubmit)}>
            <div className="mb-5">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Username
              </label>
              <input
                type="username"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="agus supriyadi"
                required
                {...register("username")}
              />
              {errors.username?.message && (
                <p className="text-xs text-red-500 mt-2">
                  {errors.username?.message}
                </p>
              )}
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-xs font-medium text-gray-900"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="*****"
                required
                {...register("password")}
              />
              {errors.password?.message && (
                <p className="text-xs text-red-500 mt-2">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <div className="mb-5 text-right">
              <button
                type="submit"
                disabled={isSubmitting}
                className="border border-blue-500 rounded-lg px-4 py-2 hover:bg-blue-50"
              >
                {isSubmitting ? "loading..." : "Login"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
