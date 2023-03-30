import { Button, CircularProgress } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteMovieMutation } from "../store/data/data.api";
import { useAppSelector } from "../hooks/redux";
import { useGetOneMovieQuery } from "../store/data/data.api";

interface IMovie {
  id: number;
  title: string;
  year: number;
  format: string;
  createdAt: string;
  updatedAt: string;
}

interface IMovieProps {
  movie: IMovie;
  actorSearch: string;
}

const Movie = ({ movie, actorSearch }: IMovieProps) => {
  const { token } = useAppSelector((state) => state.data);
  const [deletePost, response] = useDeleteMovieMutation();
  const { isLoading, data } = useGetOneMovieQuery({
    Authorization: token,
    id: movie.id,
  });

  const onDelete = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    deletePost({ id: movie.id, token })
      .unwrap()
      .then(() => {})
      .then((error: any) => {
        error && console.log(error);
      });
  };

  if (isLoading) return <CircularProgress />;

  //   if (data?.data.actors.some)
  return (
    <div className="flex shadow-md my-3 mx-4 w-[20%] h-auto flex-col p-4 relative pb-11">
      <h3 className="font-bold">{movie.title}</h3>
      <p>year: {movie.year}</p>
      <p className="mb-4">format: {movie.format}</p>
      {data && data.data.actors && data.data?.actors.length && (
        <div>
          <h4 className="font-bold">actors:</h4>
          {data.data.actors.map((actor) => (
            <p key={actor.id}>{actor.name}</p>
          ))}
        </div>
      )}
      <div onClick={onDelete} className="absolute bottom-2 right-1">
        <Button size="small" variant="outlined" startIcon={<DeleteIcon />}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default Movie;
