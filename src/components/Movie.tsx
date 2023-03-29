import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

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
}

const Movie = ({ movie }: IMovieProps) => {
  return (
    <div className="flex shadow-md my-3 mx-4 w-[20%] h-40 flex-col p-4">
      <h3 className="font-bold">{movie.title}</h3>
      <p>year: {movie.year}</p>
      <p>format: {movie.format}</p>
      <Button size="small" variant="outlined" startIcon={<DeleteIcon />}>
        Delete
      </Button>
    </div>
  );
};

export default Movie;
