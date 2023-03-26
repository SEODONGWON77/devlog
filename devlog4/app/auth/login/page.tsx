"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
// import { Url } from "url";

interface IForm {
  password: string;
  email: string;
}

const Login = () => {
  const {
    register,
    control,
    handleSubmit: onSubmit,
    watch,
    formState: { errors },
  } = useForm<IForm>({
    mode: "onSubmit",
    defaultValues: {
      password: "",
      email: "",
    },
  });
  const router = useRouter();

  const submitHandler = async (data: IForm) => {

    const {password, email} = data;
    
    const response = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/main",
    });
    if (response?.error) {
      console.log("error", response?.error);
    } else {
      router.push(response?.url as string);
    }
  };

  return (
    <div className="container container-fluid">
      <div className="row mt-5 d-flex justify-content-center">
        <div className="col-10 col-lg-5 ">
          <form
            className="border border-secondary rounded p-4"
            onSubmit={onSubmit(submitHandler)}
          >
            <h1 className="mb-4">Login</h1>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="email_field">
                Email address
              </label>
              <input
                type="text"
                id="email_field"
                className="form-control"  
                {...register("email", {
                  required: "이메일은 필수 입력입니다.",
                  pattern: {
                    value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                    message: "이메일 형식에 맞지 않습니다.",
                  },
                })}
              />
              <p>{errors.email && errors.email.message}</p>
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="password_field">
                Password
              </label>
              <input
                type="password"
                id="password_field"
                className="form-control"
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 2,
                    message: "2자리 이상 비밀번호를 사용하세요."
                  }
                })}
              />
              {errors.password && <p>2자리 이상 비밀번호를 사용하세요.</p>}
            </div>
            <button
              type="submit"
              className="btn btn-block w-100 btn-primary btn-block mb-4"
            >
              Sign in
            </button>

            <div className="text-center">
              <p>
                Not a member? <Link href="auth/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
