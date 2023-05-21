function NotifyMessage({ message, messageType }) {
  return (
    <>
      {messageType === "success" && (
        <div className=" border-2 border-green-800 bg-green-400 text-sm w-fit my-2 p-2 align-middle">
          ✅ {message} !!
        </div>
      )}
      {messageType === "error" && (
        <div className=" bg-red-200 border-2 border-red-700 text-sm w-fit my-2 p-2">
          ❌ {message} !!
        </div>
      )}
    </>
  );
}

export default NotifyMessage;
