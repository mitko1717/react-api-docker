import { Button, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useAppSelector } from "../hooks/redux";
import { useGetMoviesQuery } from "../store/data/data.api";
import Movie from "./Movie";
import useDebounce from "../hooks/debounce";

const Movies = () => {
  const [search, setSearch] = useState<string>("");
  const [actorSearch, setActorSearch] = useState<string>("");
  const [sortingBy, setSortingBy] = useState<string>("year");

  const { token } = useAppSelector((state) => state.data);
  const { isLoading, data } = useGetMoviesQuery({
    Authorization: token,
    title: search,
    search: actorSearch,
    sort: sortingBy,
  });

  const debouncedSearchHandler = useDebounce((value: string) => {
    if (typeof value === "string") setSearch(value);
  }, 1500);

  const debouncedActorSearchHandler = useDebounce((value: string) => {
    if (typeof value === "string") setActorSearch(value);
  }, 1500);

  const searchHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    debouncedSearchHandler(value);
  };

  const actorSearchHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    debouncedActorSearchHandler(value);
  };

  useEffect(() => {}, [search, actorSearch]);

  if (isLoading) return <div>loading</div>;

  return (
    <div className="flex flex-col w-full">
      <div className="flex">
        <div className="p-4">
          <TextField
            id="outlined-basic"
            label="search by title"
            variant="outlined"
            onChange={(e) => searchHandler(e)}
            type="text"
            required
          />
        </div>
        <div className="p-4">
          <TextField
            id="outlined-basic"
            label="search by actor"
            variant="outlined"
            onChange={(e) => actorSearchHandler(e)}
            type="text"
            required
          />
        </div>
        <div className="flex h-[50%] self-center gap-x-2">
          sort by:
          <Button
            variant="contained"
            size="small"
            onClick={() => setSortingBy("year")}
          >
            <span className="text-white">
              {sortingBy === "year" ? (
                <span className="font-bold">year</span>
              ) : (
                <span>year</span>
              )}
            </span>
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => setSortingBy("title")}
          >
            <span className="text-white">
              {sortingBy === "title" ? (
                <span className="font-bold">title</span>
              ) : (
                <span>title</span>
              )}
            </span>
          </Button>
        </div>
      </div>
      {data && data.data && data.data.length ? (
        <div className="flex flex-wrap">
          {data.data.map((movie) => {
            return (
              <Movie key={movie.id} movie={movie} actorSearch={actorSearch} />
            );
          })}
        </div>
      ) : (
        <div className="font-bold text-center text-2xl">
          there is no results. add some movies or change search params
        </div>
      )}
    </div>
  );
};

export default Movies;
