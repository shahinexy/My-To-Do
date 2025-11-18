import baseApi from "@/redux/api/baseApi";
import { TToDo } from "@/types/data.type";
import { TQueryParams } from "@/types/global.type";

export const todoApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createTodo: builder.mutation({
      query: (data: Partial<TToDo>) => ({
        url: "/todos/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["ToDo"],
    }),

    allToDos: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) => {
            params.append(item.name, item.value as string);
          });
        }
        return {
          url: "/todos/",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["ToDo"],
    }),

    updateTodo: builder.mutation({
      query: (args: { data: Partial<TToDo>; id: string }) => ({
        url: `/todos/${args.id}/`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["ToDo"],
    }),

    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `/todos/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["ToDo"],
    }),
  }),
});

export const {
  useCreateTodoMutation,
  useAllToDosQuery,
  useUpdateTodoMutation,
  useDeleteTodoMutation
} = todoApi;
