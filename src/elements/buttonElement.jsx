const buttonElement = (className, clickableLeft, clickableRight) => (
  <div className={className}>
    <button
      className={"Button " + isVisible(clickableLeft)}
      onClick={clickableLeft.onClick}
    >
      {clickableLeft.text.toUpperCase()}
    </button>
    <button
      className={"Button " + isVisible(clickableRight)}
      onClick={clickableRight.onClick}
    >
      {clickableRight.text.toUpperCase()}
    </button>
  </div>
);

const buttonBuilder = (clickable) => (
  <button
    className={"Button " + isVisible(clickable)}
    onClick={clickable.onClick}
  >
    {clickable.text.toUpperCase()}
  </button>
);

function isVisible(clickable) {
  return clickable.state ? "Hidden" : "Visible";
}

export default buttonElement;
