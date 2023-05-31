function LoginSubmitButton({
  buttonText,
  customClass,
}: {
  buttonText: string;
  customClass: string;
}) {
  return (
    <>
      <button
        type="submit"
        className={
          `w-fit p-2 my-3 bg-quaternary border-2 border-black transition ease-in-out delay-150 hover:shadow-inner hover:shadow-yellow-700  hover:translate-y-1 hover:scale-95 duration-300 ` +
          customClass
        }
      >
        {buttonText}
      </button>
    </>
  );
}

export default LoginSubmitButton;
