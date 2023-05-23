import { useState } from "react";
import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "../../store";

function TaskCheckBox({ id, checked }: { id: string; checked: boolean }) {
  const [checkedItem, setCheckedItem] = useState<boolean>(checked);
  // const dispatch = useDispatch()
  // const tasker = useSelector((state: RootState) => state.tasker);

  const handleCheckbox = (e: React.ChangeEvent<any>) => {
    setCheckedItem(e.target.checked);
    axios
      .patch(`http://localhost:4000/api/tasks/` + id, {
        status: e.target.checked,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.message);
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
    </>
  );
}

export default TaskCheckBox;
