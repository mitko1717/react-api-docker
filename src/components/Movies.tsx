import { useAppSelector } from "../hooks/redux";
import { useGetMoviesQuery } from "../store/data/data.api";
import Movie from "./Movie";

const Movies = () => {
  const { token } = useAppSelector((state) => state.data);
  const { isLoading, data } = useGetMoviesQuery({
    Authorization: token,
  });

  if (isLoading) return <div>loading</div>;

  if (data && data.data.length)
    return (
      <div className="flex flex-wrap">
        {data.data.map((movie) => {
          return <Movie key={movie.id} movie={movie} />;
        })}
      </div>
    );

  return <></>;
};

export default Movies;
