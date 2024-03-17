import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate, Link } from "react-router-dom";
import * as apiClient from "../api-client";

export type SignInFormData = {
  email: string;
  password: string;
};

const SignIn = () => {
  const { showToast } = useAppContext();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const mutation = useMutation({
    mutationFn: apiClient.signIn,
    onSuccess: async () => {
      // console.log("registration successful");
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      showToast({
        message: "user has been signedIn successfully",
        type: "SUCCESS",
      });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log("form data is: ", data);
    mutation.mutate(data);
  });

  return (
    <form
      action="#"
      className="mt-8 grid grid-cols-6 gap-6"
      onSubmit={onSubmit}
    >
      <h2 className="text-3xl font-bold">Sign In</h2>
      <div className="col-span-6">
        <label
          htmlFor="Email"
          className="block text-sm font-medium text-gray-700"
        >
          Email
        </label>

        <input
          type="email"
          id="Email"
          //   name="email"
          className="mt-1 w-full rounded-md border-2 border-gray-200 bg-white px-1 py-3 text-sm text-gray-700 shadow-sm"
          {...register("email", {
            required: "This field is required",
          })}
        />
        {errors.email && (
          <span className="text-red-600 px-1">{errors.email.message}</span>
        )}
      </div>

      <div className="col-span-6 ">
        <label
          htmlFor="Password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>

        <input
          type="password"
          id="Password"
          //   name="password"
          className="mt-1 w-full rounded-md border-2 border-gray-200 bg-white text-sm px-1 py-3 text-gray-700 shadow-sm"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 6,
              message: "Password must be atleast 6 characters",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-600 px-1">{errors.password.message}</span>
        )}
      </div>

      <div className="col-span-6 justify-between sm:flex sm:items-center sm:gap-4">
        <span className="text-sm">
          Not Registered?{" "}
          <Link className="underline" to="/register">
            Create an account here
          </Link>
        </span>
        <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
          Log In
        </button>
      </div>
    </form>
  );
};

export default SignIn;
