import React, { FormEvent, useState } from "react";
import Button from "@mui/material/Button/";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useActions } from "../hooks/actions";

interface IRequestUser {
  token: string;
  status: string;
  error: any;
}

const Login = () => {
  const { setSession } = useActions();

  const [email, setEmail] = useState("dima1717@gmail.com");
  const [password, setPassword] = useState("super-password");

  const onSubmitSession = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = { email, password };
    const response = await axios.post<any, IRequestUser>(
      "http://localhost:8000/api/v1/sessions",
      body
    );
    console.log("response", response);

    if (response?.token && !response.error) {
      console.log("response?.token", response?.token);
      setSession();
    }
  };

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
