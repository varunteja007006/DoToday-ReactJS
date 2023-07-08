import TaskCheckBox from "./TaskCheckBox";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../features/taskSlice";
import { RootState } from "../../store";
import { deleteMessage, setMessage } from "../../features/messageSlice";

function TaskList() {
  const dispatch = useDispatch();
  const tasker = useSelector((state: RootState) => state.tasker);
  const userAuth = useSelector((state: RootState) => state.userAuth);
  const { user } = userAuth;
  const tasks = tasker.taskList;
  const handleDelete = (e: any) => {
    if (user) {
      axios
        .delete(import.meta.env.VITE_API_URL + `/api/tasks/` + e.target.id, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then(function (response) {
          //filter the current state to remove the deleted item
          const data = tasker.taskList.filter(
            (task: any) => task._id !== response.data._id
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
    } else {
      dispatch(
        setMessage({
          message: "Please login",
          messageType: 200,
        })
      );
    }
  };

  return (
    <>
      <table className="table-fixed w-100">
        <tbody>
          {tasks.map((item: any) => (
            <tr
              key={item["_id"]}
              className={
                `border-2 border-black ` +
                (item["status"] ? `bg-gray-400 line-through` : `bg-white`)
              }
              // className={` border-2 border-black bg-gray-100`}
            >
              <td className="py-2 w-auto">
                {/* task check box component */}
                <TaskCheckBox
                  id={item["_id"]}
                  checked={item["status"]}
                ></TaskCheckBox>
              </td>
              <td className="py-2 w-auto">
                <p className="mx-2 self-center">{item["taskName"]}</p>
              </td>
              <td className="p-2 w-auto">
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
