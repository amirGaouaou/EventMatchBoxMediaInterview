"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false); // [1
  const [errorMsg, setErrorMsg] = useState("");
  const { push } = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "http://localhost:3000/dashboard",
    });
    setLoading(false);
    if (result?.error) {
      setErrorMsg(
        "Wrong email or password. Please verify your credentials and try again."
      );
    } else {
      push("/dashboard");
    }
  }

  return (
    <div className="login-form flex flex-col m-12 mt-20">
      <h1 className="text-4xl font-bold my-10 text-center">
        Welcome to My Matchbox Tools!
      </h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="flex flex-col py-5">
          {errorMsg! && (
            <div className="alert alert-error mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{errorMsg}</span>
            </div>
          )}
          <label htmlFor="email mt-3">
            Email <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            className="input w-full max-w "
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col py-5">
          <label htmlFor="password">
            Password <span className="text-red-600">*</span>
          </label>
          <div className="join">
            <input
              className="input  w-full max-w join-item"
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="btn join-item p-2 text-white text-lg bg-gray-800"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
        </div>
        <div className="form-control w-fit">
          <label className="label cursor-pointer">
            <input
              type="checkbox"
              checked={keepLoggedIn}
              onChange={() => setKeepLoggedIn(!keepLoggedIn)}
              className="checkbox checkbox-primary mr-2"
            />
            <span className="label-text text-white text-base">
              Keep me logged in
            </span>
          </label>
        </div>
        <button
          className="btn btn-primary w-full mb-5"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <span className="loading loading-spinner loading-md"></span>
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>
        <a className="link link-primary">Forgot Password? </a>
      </form>
    </div>
  );
}
