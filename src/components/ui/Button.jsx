/* ============================================================
   PHASE 3-4: BUTTON COMPONENT
   ============================================================ */

function Button({ children, type = "button", onClick }) {
  return (
    <button className="bb-btn" type={type} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;