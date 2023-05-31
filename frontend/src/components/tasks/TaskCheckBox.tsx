import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { deleteMessage, setMessage } from "../../features/messageSlice";

function TaskCheckBox({ id, checked }: { id: string; checked: boolean }) {
  const [checkedItem, setCheckedItem] = useState<boolean>(checked);
  const userAuth = useSelector((state: RootState) => state.userAuth);
  const { user }: any = userAuth;
  const dispatch = useDispatch();
  const handleCheckbox = (e: React.ChangeEvent<any>) => {
    setCheckedItem(checkedItem ? false : true);
    console.log(checkedItem);
    axios
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
