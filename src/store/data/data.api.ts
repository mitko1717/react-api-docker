import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface IMoviesList {
  data: IMov[];
  meta: IMeta;
  status: number;
}

interface IMov {
  id: number;
  title: string;
  year: number;
  format: string;
  createdAt: string;
  updatedAt: string;
}

interface IMeta {
  total: number;
}

interface IRequestUser {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}

interface IRequestSession {
  email: string;
  password: string;
}

interface IMovie {
  title: string;
  year: string;
  format: string;
  actors: string[];
}

interface IAddMovie {
  token: string;
  movie: IMovie;
}

export const dataApi = createApi({
  reducerPath: "posts/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1/",
  }),
  tagTypes: ["getMovies", "Put", "Get"],
  refetchOnFocus: true,
  endpoints: (build) => ({
    getMovies: build.query({
      query: ({ Authorization }) => ({
        url: `movies`,
        headers: { Authorization },
        params: {
          sort: "year",
          order: "DESC",
          limit: "10",
          offset: "0",
        },
      }),
      providesTags: ["getMovies"],
      transformResponse: (response: IMoviesList) => response,
    }),

    signUp: build.mutation<null, IRequestUser>({
      query: (payload) => ({
        url: "/users",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      // invalidatesTags: ["Post"],
      transformResponse: (response: any) => response,
    }),

    logIn: build.mutation<null, IRequestSession>({
      query: (payload) => ({
        url: "/sessions",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      // invalidatesTags: ["Post"],
      transformResponse: (response: any) => response,
    }),

    addMovie: build.mutation<null, IAddMovie>({
      query: (payload) => ({
        url: "/movies",
        method: "POST",
        body: payload.movie,
        headers: {
          Authorization: payload.token,
        },
      }),
      invalidatesTags: ["getMovies"],
    }),
  }),
});

export const {
  useGetMoviesQuery,
  useLogInMutation,
  useSignUpMutation,
  useAddMovieMutation,
} = dataApi;
