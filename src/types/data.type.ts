export type TToDo = {
  id: number;
  title: string;
  description: string;
  priority: "extreme" | "moderate" | "low";
  is_completed: boolean;
  position: number;
  todo_date: string; 
  created_at: string;
  updated_at: string;
};
