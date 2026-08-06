import "./StateMessage.css";

function StateMessage({ kind = "loading", message = "" }) {
  return (
    <div className={`state-message state-message--${kind}`} role="status">
      {kind === "loading" && <span className="state-message__spinner" />}
      <p className="state-message__text">{message}</p>
    </div>
  );
}

export default StateMessage;
