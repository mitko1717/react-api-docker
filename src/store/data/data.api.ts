import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IAddMovie,
  IDelete,
  IMoviesList,
  IRequestSession,
  IRequestUser,
} from "../../models/interface";

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

interface IMoviesQueryParams {
  sort: string;
  order: string;
  offset: string;
  search?: string;
  title?: string;
}


export const dataApi = createApi({
  reducerPath: "posts/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/v1/",
  }),
  tagTypes: ["getMovies"],
  refetchOnFocus: true,
  endpoints: (build) => ({
    getOneMovie: build.query({
      query: ({ Authorization, id }) => ({
        url: `movies/${id}`,
        headers: { Authorization },
      }),
      providesTags: ["getMovies"],
      transformResponse: (response: IOneMovieData) => response,
    }),

    getMovies: build.query({
      query: ({ Authorization, search, title }) => {
        const params: IMoviesQueryParams = {
          sort: "year",
          order: "DESC",
          offset: "0",
        };
    
        if (search) {
          params.search = search;
        }
    
        if (title) {
          params.title = title;
        }
    
        return {
          url: `movies`,
          headers: { Authorization },
          params,
        };
      },
      
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
      transformResponse: (response: any) => response,
    }),

    addMovie: build.mutation<null, IAddMovie>({
      query: (payload) => ({
        url: "/movies",
        method: "POST",
        body: payload.movie,
        headers: {
          Authorization: payload.token,
          "Access-Control-Allow-Origin": "http://localhost:8000",
          "Access-Control-Allow-Credentials": "true",
        },
      }),
      invalidatesTags: ["getMovies"],
    }),

    deleteMovie: build.mutation<null, IDelete>({
      query: (payload) => ({
        url: `/movies/${payload.id}`,
        method: "DELETE",
        headers: {
          Authorization: payload.token,
          "Access-Control-Allow-Origin": "http://localhost:8000",
          "Access-Control-Allow-Credentials": "true",
        },
      }),
      invalidatesTags: ["getMovies"],
    }),
  }),
});

export const {
  useGetOneMovieQuery,
  useGetMoviesQuery,
  useLogInMutation,
  useSignUpMutation,
  useAddMovieMutation,
  useDeleteMovieMutation,
} = dataApi;
