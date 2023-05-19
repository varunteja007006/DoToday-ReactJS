function TaskList({ tasks }) {
  localStorage.setItem("tasks", tasks);
  const getTasks = (localStorage.getItem("tasks"));
  console.log(getTasks);
  return (
    <>
      {tasks.map((item, index) => (
        <>
          <p className="p-2 border-b-2 border-red-700" key={index}>
            {" "}
            {item}{" "}
          </p>
        </>
      ))}
    </>
  );
}

export default TaskList;
