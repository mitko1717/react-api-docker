import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Button from "@mui/material/Button/";
import TextField from "@mui/material/TextField";
import { useActions } from "../hooks/actions";
import { useLogInMutation } from "../store/data/data.api";
import toast from "react-hot-toast";

const Login = () => {
  let commentToastId: string;
  const { setSession, setToken } = useActions();
  const [logIn, { isSuccess, isError, data, error }] = useLogInMutation<any>();

  const [email, setEmail] = useState("dima1717@gmail.com");
  const [password, setPassword] = useState("super-password");

  const emailHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(e.target.value);
  };

   const passwordHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(e.target.value);
  };

  const onSubmitSession = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await logIn({ email, password });
  };

  useEffect(() => {
    if (isSuccess && data && data.token) {
      toast.success("you successfully logined", { id: commentToastId });
      setSession();
      setToken(data.token);
    }
    if (isError) {
      toast.error(error, { id: commentToastId });
    }
  }, [isSuccess, isError]);

  return (
    <form className="text-center mb-8" onSubmit={onSubmitSession}>
      <h3 className="my-2 font-bold text-xl">log in</h3>

      <div className="flex justify-center">
        <div className="p-2">
          <TextField
            id="outlined-basic"
            label="email"
            variant="outlined"
            value={email}
            onChange={(e) => emailHandler(e)}
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
            onChange={(e) => passwordHandler(e)}
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

export default Login;
