import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { deleteMessage, setMessage } from "../../features/messageSlice";
import { deleteTask, addTask } from "../../features/taskSlice";
import { TaskType } from "../../interface/interface";

function TaskCheckBox({
  id,
  checked,
  index,
}: {
  id: string;
  checked: boolean;
  index: number;
}) {
  const dispatch = useDispatch();
  const [checkedItem, setCheckedItem] = useState<boolean>(checked);
  const tasker = useSelector((state: RootState) => state.tasker);
  const userAuth = useSelector((state: RootState) => state.userAuth);
  const { user }: any = userAuth;
  const tasks = tasker.taskList;

  const handleCheckbox = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setCheckedItem(checkedItem ? false : true);
    await axios
      .patch(
        `http://localhost:4000/api/tasks/` + id,
        {
          status: checkedItem ? false : true,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then(function (response) {
        dispatch(
          setMessage({
            message: "Task updated",
            messageType: response.status,
          })
        );
        const updatedData = response.data;
        updatedData["status"] = updatedData.status ? false : true;
        const data = tasks.filter(
          (task: TaskType) => task._id !== updatedData._id
        );
        dispatch(deleteTask(data));
        dispatch(addTask([updatedData, ...data]));
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
      <button id={id} onClick={handleCheckbox} className="p-2">
        {checkedItem ? (
          <>
            <span
              id={id}
              className="material-symbols-outlined items-center align-middle p-2 font-bold hover:text-red-600 hover:accent-red-600"
            >
              select_check_box
            </span>
          </>
        ) : (
          <span
            id={id}
            className="material-symbols-outlined items-center align-middle p-2 font-bold text-black hover:text-primary hover:animate-spin  "
          >
            check_box_outline_blank
          </span>
        )}
      </button>
    </>
  );
}

export default TaskCheckBox;
