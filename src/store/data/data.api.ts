import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IComment, IPost, IPostWithComments } from "./../../models/interfaces";

interface IQueries {
  postId: number;
}

export const dataApi = createApi({
  reducerPath: "posts/api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://blog-api-t6u0.onrender.com/",
  }),
  tagTypes: ["Post", "Put"],
  refetchOnFocus: true,
  endpoints: (build) => ({
    getPosts: build.query<IPost[], "">({
      query: () => ({
        url: `posts`,
      }),
      providesTags: ["Post"],
      transformResponse: (response: IPost[]) => response,
    }),

    // getAllComments: build.query<IComment[], "">({
    //   query: () => ({
    //     url: `comments`,
    //   }),
    //   providesTags: ["Post"],
    //   transformResponse: (response: IComment[]) => response,
    // }),

    getCommentsToPost: build.query<IPostWithComments, IQueries>({
      query: ({ postId }) => ({
        url: `posts/${postId}/`,
        params: {
          _embed: "comments",
        },
      }),
      providesTags: ["Put", "Post"],
      transformResponse: (response: IPostWithComments) => response,
    }),

    addPost: build.mutation<null, IPost>({
      query: (payload) => ({
        url: "/posts",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Post"],
    }),

    addComment: build.mutation<null, IComment>({
      query: (payload) => ({
        url: "/comments",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Post"],
    }),

    deletePost: build.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Post"],
    }),

    editPost: build.mutation<null, IPost>({
      query: (payload) => ({
        url: `/posts/${payload.id}`,
        method: "PUT",
        body: payload,
        credentials: "include",
      }),
      invalidatesTags: ["Put"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetCommentsToPostQuery,
  // useGetAllCommentsQuery,
  useAddPostMutation,
  useAddCommentMutation,
  useDeletePostMutation,
  useEditPostMutation,
} = dataApi;
