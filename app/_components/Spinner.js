function Spinner({ isFull = true }) {
  return (
    <div
      className={`w-full mt-12 mb-16 ${
        isFull ? "min-h-[calc(100vh-186px)]" : ""
      }`}
    >
      <div className="loader mx-auto"></div>
    </div>
  );
}

export default Spinner;
