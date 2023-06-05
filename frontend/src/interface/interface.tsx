interface TaskType {
  _id: string;
  taskName: string;
  status: boolean;
}

//userslice initial state
interface UserInitialStateType {
  user: UserType | null;
}

type MessageType = {
  message: string | null;
  messageType: number | null;
};

type UserType = {
  email: string | null;
  token: string | null;
};

type LoginDataType = {
  email?: string;
  password?: string;
};

// Define a type for the slice state
interface TaskListInitialStateType {
  taskList: (string | boolean | null | number)[];
}

export type {
  TaskType,
  UserInitialStateType,
  MessageType,
  TaskListInitialStateType,
  UserType,
  LoginDataType,
};
