import { useEffect, useState } from "react";
import TaskList from "../components/tasks/TaskList";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addTask, loadTask } from "../features/taskSlice";
import { RootState } from "../store";

function Home() {
  const dispatch = useDispatch();
  const tasker = useSelector((state: RootState) => state.tasker);
  const [newTask, setNewTask] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleTaskName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const handleSubmit = (e: React.ChangeEvent<null>) => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/api/tasks", {
        taskName: newTask,
      })
      .then(function (response) {
        setErrorMessage(null);
        setSuccessMessage("New Task added successfully");
        dispatch(addTask([response.data, ...tasker.taskList]));
      })
      .catch(function (error) {
        //console.log(error);
        setErrorMessage(error.message);
        setSuccessMessage(null);
      });
    setNewTask("");
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:4000/api/tasks")
        .then(function (response) {
          if (response.status === 200 && response.statusText === "OK") {
            //setTaskList(response.data);
            setErrorMessage(null);
            dispatch(loadTask(response.data));
          }
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    };
    fetchData();
  }, [dispatch]);

  return (
    <>
      <div className="p-2">
        <h3 className="text-2xl">Home</h3>
        <form onSubmit={handleSubmit} className="py-2">
          <input
            type="text"
            className="p-2 my-2 border-2 border-red-500"
            placeholder="Add new task"
            value={newTask}
            onChange={handleTaskName}
            required
          />
          <button
            type="submit"
            className="border-2 border-red-600 w-fit p-2 mx-2 font-semibold bg-red-200 hover:bg-red-600 hover:text-white"
          >
            Add Task
          </button>
        </form>
        <h4 className="text-xl underline">Tasks Added</h4>
        <TaskList tasks={tasker.taskList}></TaskList>
      </div>
    </>
  );
}

export default Home;
