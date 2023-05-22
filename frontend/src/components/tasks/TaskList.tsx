import { useState } from "react";
import TaskCheckBox from "./TaskCheckBox";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../features/taskSlice";
import { RootState } from "../../store";
interface taskType {
  _id: string;
  taskName: string;
  status: boolean;
}

function TaskList({ tasks }: { tasks: [] }) {
  // localStorage.setItem("tasks", JSON.stringify(tasks));
  // const getTasks = localStorage.getItem("tasks");
  // console.log(getTasks);
  // const initialCheckedItems = {};
  // tasks.map((item) => {
  //   initialCheckedItems[item["_id"]] = item["status"];
  // });
  // const [checkedItems, setCheckedItems] = useState(initialCheckedItems);
  // const handleCheckedItems = (e) => {
  //   setCheckedItems({ ...checkedItems, [e.target.name]: e.target.checked });
  //   initialCheckedItems[e.target.name] = e.target.checked;
  //   console.log(initialCheckedItems);
  // };
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const tasker = useSelector((state: RootState) => state.tasker);

  const handleDelete = (e: React.ChangeEvent<any>) => {
    console.log(e.target.name);
    axios
      .delete(`http://localhost:4000/api/tasks/` + e.target.name)
      .then(function (response) {
        setErrorMessage(null);
        setSuccessMessage("Task deleted successfully");
        const data = tasker.taskList.filter(
          (task) => task._id !== response.data._id
        );
        dispatch(deleteTask(data));
      })
      .catch(function (error) {
        //console.log(error);
        setErrorMessage(error.message);
        setSuccessMessage(null);
      });
  };

  return (
    <>
      {tasks.map((item) => (
        <div className="flex flex-row " key={item["_id"]}>
          <div className="my-1 py-2 flex w-1/2 border-2 border-red-700">
            <TaskCheckBox
              id={item["_id"]}
              checked={item["status"]}
            ></TaskCheckBox>
            <p className="mx-2 self-center">{item["taskName"]}</p>
          </div>
          <button
            name={item["_id"]}
            onClick={handleDelete}
            className="my-1 p-2 border-2 border-red-700 hover:bg-red-300 rounded-full mx-2"
          >
            ❌
          </button>
        </div>
      ))}
    </>
  );
}

export default TaskList;
