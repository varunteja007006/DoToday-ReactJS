import TaskCheckBox from "./TaskCheckBox";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../features/taskSlice";
import { RootState } from "../../store";
import { TaskType } from "../../interface/interface";
import { deleteMessage, setMessage } from "../../features/messageSlice";

function TaskList({ tasks }: { tasks: [] }) {
  const dispatch = useDispatch();
  const tasker = useSelector((state: RootState) => state.tasker);
  const userAuth = useSelector((state: RootState) => state.userAuth);
  const { user }: any = userAuth;

  const handleDelete = (e: React.ChangeEvent<any>) => {
    axios
      .delete(`http://localhost:4000/api/tasks/` + e.target.id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then(function (response) {
        //filter the current state to remove the deleted item
        const data = tasker.taskList.filter(
          (task: TaskType) => task._id !== response.data._id
        );
        //dispatch new state to delete action
        dispatch(deleteTask(data));
        dispatch(
          setMessage({
            message: "Task deleted Successfully",
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
  };

  return (
    <>
      <table className="table-auto">
        <tbody>
          {tasks.map((item) => (
            <tr key={item["_id"]} className=" bg-gray-100 border-2 border-black">
              <td className="py-2">
                {/* task check box component */}
                <TaskCheckBox
                  id={item["_id"]}
                  checked={item["status"]}
                ></TaskCheckBox>
              </td>
              <td className="py-2">
                {/* task name */}
                <p className="mx-2 self-center">{item["taskName"]}</p>
              </td>
              <td className="p-2">
                {/* delete button */}
                <button
                  className="border-2 border-black rounded-full h-12 w-12 bg-quaternary text-black hover:bg-red-600 hover:text-quaternary"
                  name={item["_id"]}
                  onClick={handleDelete}
                >
                  <span
                    id={item["_id"]}
                    className="material-symbols-outlined items-center align-middle p-2 font-bold"
                  >
                    close
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TaskList;
