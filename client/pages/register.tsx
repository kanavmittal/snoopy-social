import axios from "axios";
import Head from "next/head";
import Router from "next/router";
import { FormEvent, useState } from "react";
import TextInput from "../components/textInput";
export default function Register() {
  const [email, setemail] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (agreement) {
      try {
        const res = await axios.post("/auth/register", {
          email,
          password,
          username,
        });
        Router.push("/login");
      } catch (error) {
        setErrors(error.response.data);
      }
    } else {
      setErrors({ ...errors, agreement: "You Must agree to T&C" });
    }
  };
  return (
    <div>
      <div className="h-screen w-screen flex flex-col justify-center items-center  ">
        <span className="text-5xl font-bold py-8">Register Now.</span>
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
            type="email"
            value="Email"
            error={errors.email}
            placeholder="xxx"
            setValue={setemail}
          ></TextInput>
          <TextInput
            width="w-full"
            type="password"
            value="Password"
            error={errors.password}
            placeholder="xxxxxxxxxxxxx"
            setValue={setpassword}
          ></TextInput>
          <div className="flex flex-wrap">
            <div className="w-full">
              {errors.agreement && (
                <span className="text-red-500">
                  You must agree to terms and conditon
                </span>
              )}
            </div>
            <div className="mb-6">
              <input
                type="checkbox"
                className="mr-1 cursor-pointer"
                id="agreement"
                checked={agreement}
                onChange={(e) => setAgreement(e.target.checked)}
              />
            </div>
            <span className="px-2 ">Terms and Condition</span>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
