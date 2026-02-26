function Spinner({ isFull = true }) {
  return (
    <div className={`w-full mt-12 mb-16 ${isFull ? "flex-1" : ""}`}>
      <div className="loader mx-auto"></div>
    </div>
  );
}

export default Spinner;
