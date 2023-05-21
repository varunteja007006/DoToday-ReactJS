import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../../features/taskSlice";
import { RootState } from "../../store";

function TaskCheckBox({ id, checked }) {
  const [checkedItem, setCheckedItem] = useState<boolean>(checked);
  const [disableCheckbox, setDisableCheckbox] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const tasker = useSelector((state: RootState) => state.tasker);

  const handleCheckbox = (e: React.ChangeEvent<any>) => {
    setCheckedItem(e.target.checked);
    axios
      .patch(`http://localhost:4000/api/tasks/` + id, {
        status: e.target.checked,
      })
      .then(function (response) {
        setErrorMessage(null);
      })
      .catch(function (error) {
        setErrorMessage("Unable to update, please try again later");
      });
  };

  return (
    <>
      <input
        type="checkbox"
        name={id}
        id={id}
        checked={checkedItem}
        onChange={handleCheckbox}
        className="ms-2 self-center"
      />
      {errorMessage}
    </>
  );
}

export default TaskCheckBox;