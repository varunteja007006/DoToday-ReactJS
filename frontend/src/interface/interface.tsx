interface TaskType {
  _id: string;
  taskName: string;
  status: boolean;
}

//userslice initial state
interface InitialStateType {
  user: object | null;
}

export type { TaskType, InitialStateType };
