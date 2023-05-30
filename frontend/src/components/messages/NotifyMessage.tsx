function NotifyMessage({
  message,
  messageType,
}: {
  message: string;
  messageType: number;
}) {
  return (
    <>
      {messageType === 200 && (
        <div className=" border-2 border-green-800 bg-green-400 text-sm w-fit my-2 p-2 align-middle">
          ✅ {message ? message : "Success"} !!
        </div>
      )}
      {messageType === 400 && (
        <div className=" bg-red-200 border-2 border-red-700 text-sm w-fit my-2 p-2">
          ❌ {message ? message : "Failed"} !!
        </div>
      )}
      {messageType !== 200 && messageType !== 400 && (
        <div className=" bg-red-200 border-2 border-red-700 text-sm w-fit my-2 p-2">
          ⚠ {message ? message : "Something went wrong"} !!
        </div>
      )}
    </>
  );
}

export default NotifyMessage;
