import { useEffect, useState } from "react";
import TaskList from "../components/tasks/TaskList";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addTask, loadTask } from "../features/taskSlice";
import { deleteMessage, setMessage } from "../features/messageSlice";
import NotifyMessage from "../components/messages/NotifyMessage";
import { RootState } from "../store";
import LoginSubmitButton from "../components/main/LoginSubmitButton";

function Home() {
  //redux dispatcher
  const dispatch = useDispatch();
  //redux states
  const tasker = useSelector((state: RootState) => state.tasker);
  const userAuth = useSelector((state: RootState) => state.userAuth);
  const messenger = useSelector((state: RootState) => state.messenger);
  //useState hook
  const [newTask, setNewTask] = useState<string>("");
  const { user } = userAuth;
  //handle inputs
  const handleTaskName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(e.target.value);
  };
  //handle submit
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
  //initial load of data with useEffect hook
  useEffect(() => {
    const fetchData = async () => {
      if (user) {
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
      }
    };
  }, [dispatch, user]);

  return (
    <div className="font-semibold text-black">
      <h3 className="text-2xl">Home</h3>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row gap-4 py-2 lg:w-1/2 w-100 justify-start"
      >
        <input
          type="text"
          className="p-2 border-2 border-black w-100 lg:w-1/2 outline-none focus:border-4 focus:border-quaternary focus:ring focus:ring-primary "
          placeholder="Add new task"
          value={newTask}
          onChange={handleTaskName}
          required
        />
        <LoginSubmitButton
          buttonText={"Add Task"}
          customClass={""}
        ></LoginSubmitButton>
        {messenger.message !== null && messenger.messageType && (
          <NotifyMessage
            message={messenger.message}
            messageType={messenger.messageType}
          ></NotifyMessage>
        )}
      </form>
      <div className="py-2 w-100">
        <h4 className="text-xl underline mb-2">Tasks Added</h4>
        <TaskList></TaskList>
      </div>
    </div>
  );
}

export default Home;
