import { useEffect } from "react";
import Navbar from "../../components/navbar";
import Wrapper from "../../components/wrapper";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";

const createSchema = z.object({
  name: z.string().min(5, {
    message: "Nama minimal 5 huruf!",
  }),
});

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(createSchema),
    defaultValues: {
      name: "",
    },
  });

  const navigate = useNavigate();

  const update = ({ name }: z.infer<typeof createSchema>) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem("username");
        localStorage.setItem("username", name);

        resolve(true);

        setTimeout(() => {
          navigate("/");
        }, 2500);
      }, 2000);
    });
  };

  const handleUpdateSubmit = (values: z.infer<typeof createSchema>) => {
    console.log(values);
    const checkData = update(values);
    toast.promise(checkData, {
      loading: "loading...",
      success: "Nama telah diganti!",
      error: "Gagal mengganti nama!",
    });
  };

  useEffect(() => {
    const getUsername = localStorage.getItem("username");

    if (getUsername) {
      reset({
        name: getUsername,
      });
    }

    if (!getUsername) {
      navigate("/login");
    }
  }, [reset, navigate]);
  return (
    <main className="h-[100vh] dark:bg-gray-950 dark:text-white">
      <Navbar />
      <Wrapper>
        <form onSubmit={handleSubmit(handleUpdateSubmit)}>
          <div className="mb-5">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Nama
            </label>
            <input
              type="name"
              id="name"
              className="bg-gray-50 border border-gray-300 text-gray-900 dark:text-white bg-transparent text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
          <div className="mb-5 text-right">
            <button
              type="submit"
              disabled={isSubmitting}
              className="border border-blue-500 rounded-lg px-4 py-2 hover:bg-blue-900/10"
            >
              {isSubmitting ? "loading..." : "Submit"}
            </button>
          </div>
        </form>
      </Wrapper>
    </main>
  );
};

export default Profile;
