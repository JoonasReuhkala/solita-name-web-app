const inputElement = (className, inputHandler, clickable) => (
  <div className={className}>
    <input
      type="text"
      className="Input"
      onChange={inputHandler}
      maxlength="15"
    ></input>
    <button
      className="Button"
      style={{ cursor: "pointer" }}
      onClick={clickable.onClick}
    >
      {clickable.text}
    </button>
  </div>
);

export default inputElement;
