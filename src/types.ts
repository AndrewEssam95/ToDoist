export interface ITodo {
  id: string;
  title: string;
  categoryId: string;
  isCompleted: boolean;
}

export interface ICategory {
  id: string;
  title?: string;
  icon?: string;
  tagBackground?: string;
  tasksNumber?: number;
}
