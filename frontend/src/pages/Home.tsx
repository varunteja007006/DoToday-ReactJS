import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskList from "../components/tasks/TaskList";

function Home() {
  const [newTask, setNewTask] = useState<string>("");
  const [taskList, setTaskList] = useState([]);
  const handleTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };
  const handleSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTaskList([...taskList, newTask]);
    setNewTask("");
  };

  return (
    <>
      <div className="p-2">
        <h3 className="text-2xl">Home</h3>
        <form action="" onSubmit={handleSubmit} className="py-2">
          <input
            type="text"
            className="p-2 my-2 border-2 border-red-500"
            placeholder="Add new task"
            value={newTask}
            onChange={handleTask}
            required
          />
          <button
            type="submit"
            className="border-2 border-red-600 w-fit p-2 mx-2 font-semibold bg-red-200 hover:bg-red-600 hover:text-white"
          >
            Add Task
          </button>
        </form>{" "}
        <h4 className="text-xl underline">Tasks Added</h4>
        <TaskList tasks={taskList}></TaskList>
      </div>
    </>
  );
}

export default Home;
