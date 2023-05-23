import TaskCheckBox from "./TaskCheckBox";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../features/taskSlice";
import { RootState } from "../../store";
import { TaskType } from "../../interface/interface";

function TaskList({ tasks }: { tasks: [] }) {
  const dispatch = useDispatch();
  const tasker = useSelector((state: RootState) => state.tasker);

  const handleDelete = (e: React.ChangeEvent<any>) => {
    console.log(e.target.name);
    axios
      .delete(`http://localhost:4000/api/tasks/` + e.target.name)
      .then(function (response) {
        //filter the current state to remove the deleted item
        const data = tasker.taskList.filter(
          (task: TaskType) => task._id !== response.data._id
        );
        //dispatch new state to delete action
        dispatch(deleteTask(data));
      })
      .catch(function (error) {
        console.log(error);
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
