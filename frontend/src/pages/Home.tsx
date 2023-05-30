import { useEffect, useState } from "react";
import TaskList from "../components/tasks/TaskList";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addTask, loadTask } from "../features/taskSlice";
import { deleteMessage, setMessage } from "../features/messageSlice";
import NotifyMessage from "../components/messages/NotifyMessage";
import { RootState } from "../store";

function Home() {
  const dispatch = useDispatch();
  const tasker = useSelector((state: RootState) => state.tasker);
  const userAuth = useSelector((state: RootState) => state.userAuth);
  const [newTask, setNewTask] = useState<string>("");
  const { user }: any = userAuth;
  const messenger = useSelector((state: RootState) => state.messenger);
  const handleTaskName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };

  const handleSubmit = (e: React.ChangeEvent<null>) => {
    if (!user) {
      dispatch(
        setMessage({ message: "You must be logged in!!", messageType: 400 })
      );
      return;
    }
    e.preventDefault();
    axios
      .post(
        "http://localhost:4000/api/tasks",
        {
          taskName: newTask,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then(function (response) {
        dispatch(addTask([response.data, ...tasker.taskList]));
        dispatch(
          setMessage({
            message: "New task added",
            messageType: response.status,
          })
        );
        setTimeout(() => {
          dispatch(deleteMessage());
        }, 5000);
      })
      .catch(function (error) {
        dispatch(
          setMessage({
            message: error.response.data.errorMessage,
            messageType: error.response.status,
          })
        );
      });
    setNewTask("");
  };

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:4000/api/tasks", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(function (response) {
          if (response.status === 200 && response.statusText === "OK") {
            dispatch(loadTask(response.data));
            dispatch(deleteMessage);
          }
        })
        .catch((error) => {
          dispatch(
            setMessage({
              message: error.response.data.errorMessage,
              messageType: error.response.status,
            })
          );
        });
    };
    if (user) {
      fetchData();
    }
  }, [dispatch, user]);

  return (
    <div className="font-semibold text-black">
      <h3 className="text-2xl">Home</h3>
      <form onSubmit={handleSubmit} className="flex flex-row py-2 w-1/2 ">
        <input
          type="text"
          className="p-2 border-2 border-black w-1/2"
          placeholder="Add new task"
          value={newTask}
          onChange={handleTaskName}
          required
        />
        <button
          type="submit"
          className="w-fit p-2 m-2 bg-quaternary hover:bg-yellow-300 border-2 border-black"
        >
          Add Task
        </button>
        {messenger.message !== null && messenger.messageType && (
          <NotifyMessage
            message={messenger.message}
            messageType={messenger.messageType}
          ></NotifyMessage>
        )}
      </form>
      <div className="w-fit">
        <h4 className="text-xl underline mb-2">Tasks Added</h4>
        <TaskList tasks={tasker.taskList}></TaskList>
      </div>
    </div>
  );
}

export default Home;
