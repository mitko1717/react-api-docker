import React, { ChangeEvent, FormEvent, useState } from "react";
import Button from "@mui/material/Button/";
import TextField from "@mui/material/TextField";
import { useAppSelector } from "../hooks/redux";
import { useAddMovieMutation } from "../store/data/data.api";

const AddFilm = () => {
  const { token } = useAppSelector((state) => state.data);
  const [logIn, { isSuccess, isError }] = useAddMovieMutation<any>();

  const [title, setTitle] = useState("Casablanca");
  const [year, setYear] = useState("1942");
  const [format, setFormat] = useState("DVD");
  const [actors, setActors] = useState([
    "Humphrey Bogartt",
    "Ingrid Bergman",
    "Claude Rains",
    "Peter Lorre",
  ]);

  const titleHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTitle(e.target.value);
  };
  const yearHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setYear(e.target.value);
  };
  const formatHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormat(e.target.value);
  };
  const actorsHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setActors(e.target.value.split(","));
  };

  const onSubmitSession = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await logIn({ movie: { title, year, format, actors }, token });
  };

  return (
    <form className="text-center mb-8" onSubmit={onSubmitSession}>
      <h3 className="my-2 font-bold text-xl">add film</h3>

      <div className="flex justify-center">
        <div className="p-2">
          <TextField
            id="outlined-basic"
            label="title"
            variant="outlined"
            value={title}
            onChange={(e) => titleHandler(e)}
            type="text"
            required
          />
        </div>
        <div className="p-2">
          <TextField
            id="outlined-basic"
            label="year"
            variant="outlined"
            value={year}
            onChange={(e) => yearHandler(e)}
            type="number"
            required
          />
        </div>
        <div className="p-2">
          <TextField
            id="outlined-basic"
            label="format"
            variant="outlined"
            value={format}
            onChange={(e) => formatHandler(e)}
            type="text"
            required
          />
        </div>
        <div className="p-2">
          <TextField
            id="outlined-basic"
            label="actors"
            variant="outlined"
            value={actors}
            onChange={(e) => actorsHandler(e)}
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

export default AddFilm;
