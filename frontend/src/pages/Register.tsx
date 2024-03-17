import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate, Link } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation({
    mutationFn: apiClient.register,
    onSuccess: async () => {
      // console.log("registration successful");
      showToast({ message: "registration successful", type: "SUCCESS" });
      await queryClient.invalidateQueries({ queryKey: ["validateToken"] });
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({ message: error.message, type: "ERROR" });
    },
  });

  const onSubmit = handleSubmit((data) => {
    // console.log("form data is: ", data);
    mutation.mutate(data);
  });

  return (
    <form
      action="#"
      className="mt-8 grid grid-cols-6 gap-6"
      onSubmit={onSubmit}
    >
      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="FirstName"
          className="block text-sm font-medium text-gray-700"
        >
          First Name
        </label>

        <input
          type="text"
          id="FirstName"
          //   name="first_name"
          className="mt-1 w-full rounded-md border-2 border-gray-200 bg-white text-sm text-gray-700 px-1 shadow-sm py-3"
          {...register("firstName", {
            required: "This field is required",
          })}
        />
        {errors.firstName && (
          <span className="text-red-600 px-1">{errors.firstName.message}</span>
        )}
      </div>

      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="LastName"
          className="block text-sm font-medium text-gray-700"
        >
          Last Name
        </label>

        <input
          type="text"
          id="LastName"
          //   name="last_name"
          className="mt-1 w-full rounded-md border-2 border-gray-200 bg-white text-sm text-gray-700 px-1 shadow-sm py-3"
          {...register("lastName", {
            required: "This field is required",
          })}
        />
        {errors.lastName && (
          <span className="text-red-600 px-1">{errors.lastName.message}</span>
        )}
      </div>

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

      <div className="col-span-6 sm:col-span-3">
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

      <div className="col-span-6 sm:col-span-3">
        <label
          htmlFor="PasswordConfirmation"
          className="block text-sm font-medium text-gray-700"
        >
          Confirm Password
        </label>

        <input
          type="password"
          id="PasswordConfirmation"
          //   name="password_confirmation"
          className="mt-1 w-full rounded-md border-2 border-gray-200 bg-white  text-sm text-gray-700 py-3 px-1 shadow-sm"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") !== val) {
                return "Your passwords do not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-600 px-1">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
        <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
          Create an account
        </button>

        <p className="mt-4 text-sm text-gray-500 sm:mt-0">
          Already have an account?
          <Link to="/sign-in" className="text-gray-700 underline">
            Log in
          </Link>
          .
        </p>
      </div>
    </form>
  );
};

export default Register;
