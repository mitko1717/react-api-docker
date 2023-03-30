export interface IMoviesList {
  data: IMov[];
  meta: IMeta;
  status: number;
}

export interface IMov {
  id: number;
  title: string;
  year: number;
  format: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMeta {
  total: number;
}

export interface IRequestUser {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

export interface IRequestSession {
  email: string;
  password: string;
}

export interface IMovie {
  title: string;
  year: string;
  format: string;
  actors: string[];
}

export interface IAddMovie {
  token: string;
  movie: IMovie;
}

export interface IDelete {
  token: string;
  id: number | string;
}
