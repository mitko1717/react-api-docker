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

export interface IOneMovieData {
  data: IOneMovie;
  status: number;
}

export interface IOneMovie {
  id: number;
  title: string;
  year: number;
  format: string;
  actors: IActor[];
  createdAt: string;
  updatedAt: string;
}

export interface IActor {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMoviesQueryParams {
  sort?: string;
  order: string;
  offset: string;
  search?: string;
  title?: string;
}

interface IMovieInfoWithActors {
  id: number;
  title: string;
  year: number;
  format: string;
  createdAt: string;
  updatedAt: string;
}

export interface IMovieProps {
  movie: IMovieInfoWithActors;
}

interface IUser {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

interface ISession {
  email: string;
  password: string;
}

export interface IDataState {
  createdUser: IUser | {};
  session: ISession | {};
  isAuthedUser: boolean;
  isAuthedSession: boolean;
  token: string;
}