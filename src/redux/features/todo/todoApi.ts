import baseApi from "@/redux/api/baseApi";

export const todoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTodo: builder.mutation({
      query: (data) => ({
        url: "/auth/login/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Todo"],
    }),
  }),
});

export const { useCreateTodoMutation } = todoApi;
