import { useForm } from "react-hook-form";
import * as yup from "yup"; // Import all (*) from yup
import { yupResolver } from "@hookform/resolvers/yup";

export const Form = () => {
  const schema = yup.object().shape({
    fullName: yup.string().required("Full name is required"),
    email: yup.string().email().required("Input must have an email format"),
    age: yup
      .number()
      .positive()
      .integer()
      .min(18)
      .required("You should be over 18"),
    password: yup
      .string()
      .min(6)
      .max(20)
      .required("Password must be between 6 and 20 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords do not match")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="text" placeholder="Full name" {...register("fullName")} />
      <small>{errors.fullName?.message}</small>
      <input type="text" placeholder="E-mail" {...register("email")} />
      <small>{errors.email?.message}</small>
      <input type="number" placeholder="Age" {...register("age")} />
      <small>{errors.age?.message}</small>
      <input type="password" placeholder="Password" {...register("password")} />
      <small>{errors.password?.message}</small>
      <input
        type="password"
        placeholder="Confirm password"
        {...register("confirmPassword")}
      />
      <small>{errors.confirmPassword?.message}</small>
      <input type="submit" />
    </form>
  );
};
