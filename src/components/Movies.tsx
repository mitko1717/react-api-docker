import { TextField } from "@mui/material";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { useAppSelector } from "../hooks/redux";
import { useGetMoviesQuery } from "../store/data/data.api";
import Movie from "./Movie";
import debounce from "lodash.debounce";

const Movies = () => {
  const [search, setSearch] = useState<string>("");
  const [actorSearch, setActorSearch] = useState<string>("");
  const { token } = useAppSelector((state) => state.data);
  const { isLoading, data } = useGetMoviesQuery({
    Authorization: token,
    title: search,
    search: actorSearch
  });

  const searchHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const actorSearchHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();    
    setActorSearch(e.target.value);
  };
//   const debouncedSearchHandler = useCallback(debounce(searchHandler, 300), []);
//   const debouncedActorSearchHandler = useCallback(debounce(actorSearchHandler, 300), []);

  if (isLoading) return <div>loading</div>;

  if (data && data.data && data.data.length)
    return (
      <div className="flex flex-col w-full">
        <div>
          <div className="p-4 w-full">
            <TextField
              id="outlined-basic"
              label="search by title"
              variant="outlined"
              value={search}
              onChange={(e) => searchHandler(e)}            
              type="text"
              required
            />
          </div>
          <div className="p-4 w-full">
            <TextField
              id="outlined-basic"
              label="search by actor"
              variant="outlined"
              value={actorSearch}
              onChange={(e) => actorSearchHandler(e)}
              type="text"
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap">
          {data.data
            .filter((movie) =>
              movie.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((movie) => {
              return (
                <Movie key={movie.id} movie={movie} actorSearch={actorSearch} />
              );
            })}
        </div>
      </div>
    );

  return <></>;
};

export default Movies;
