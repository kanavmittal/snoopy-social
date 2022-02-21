import axios from "axios";
import Head from "next/head";
import Router from "next/router";
import { FormEvent, useState } from "react";
import TextInput from "../components/textInput";
export default function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [errors, setErrors] = useState<any>({});
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const res = await axios.post("/auth/login", {
        password,
        username,
      });
      Router.push("/");
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data);
    }
  };
  return (
    <div>
      <div className="h-screen w-screen flex flex-col justify-center items-center  ">
        <span className="text-5xl font-bold py-8">Login Now.</span>
        <form
          className="w-full sm:w-1/2 md:w-1/3 bg-white shadow-md rounded px-8 pt-6 pb-8 m-4"
          onSubmit={handleSubmit}
        >
          <TextInput
            width="w-full"
            type="text"
            value="Username"
            error={errors.username}
            placeholder="Kanav"
            setValue={setusername}
          ></TextInput>
          <TextInput
            width="w-full"
            type="password"
            value="Password"
            error={errors.password}
            placeholder="xxxxxxxxxxxxx"
            setValue={setpassword}
          ></TextInput>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
