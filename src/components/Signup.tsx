import React, { FormEvent, useEffect, useState } from "react";
import { useActions } from "../hooks/actions";
import Button from "@mui/material/Button/";
import TextField from "@mui/material/TextField";
import { useSignUpMutation } from "../store/data/data.api";
import toast from "react-hot-toast";

const Signup = () => {
  let commentToastId: string
  const { setAuth } = useActions();
  const [signUp, { isSuccess, isError, data, error }] = useSignUpMutation<any>();

  const [email, setEmail] = useState("dima1717@gmail.com");
  const [password, setPassword] = useState("super-password");
  const [name, setName] = useState("dima1717");
  const [confirmPassword, setConfirmPassword] = useState("super-password");

  const onSubmitUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp({ email, name, password, confirmPassword });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("you successfully sign in", { id: commentToastId })
      setAuth()
    }
    if (isError) toast.error(error.code, { id: commentToastId })
  }, [])

  return (
    <form className="text-center mb-8" onSubmit={onSubmitUser}>
      <h3 className="my-2 font-bold text-xl">sign up</h3>

      <div className="flex justify-center">
        <div className="p-2">
          <TextField
            id="outlined-basic"
            label="email"
            variant="outlined"
            value={email}
            type="text"
            required
          />
        </div>
        <div className="p-2">
          <TextField
            id="outlined-basic"
            label="name"
            variant="outlined"
            value={name}
            type="text"
            required
          />
        </div>
        <div className="p-2">
          <TextField
            id="outlined-basic"
            label="password"
            variant="outlined"
            value={password}
            type="text"
            required
          />
        </div>
        <div className="p-2">
          <TextField
            id="outlined-basic"
            label="confirmPassword"
            variant="outlined"
            value={confirmPassword}
            type="text"
            required
          />
        </div>
      </div>

      <div className="mt-4 ml-2">
        <Button variant="contained" type="submit">
          <span className="text-2xl font-bold text-gray-400">send</span>
        </Button>
      </div>
    </form>
  );
};

export default Signup;
