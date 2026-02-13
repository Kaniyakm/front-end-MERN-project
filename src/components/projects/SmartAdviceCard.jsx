/* ============================================================
   PHASE 3-4: SMART ADVICE CARD
   ============================================================ */

function SmartAdviceCard({ message }) {
  return (
    <div className="advice-card warning">
      <strong>Warning</strong>
      <p>{message}</p>
    </div>
  );
}

export default SmartAdviceCard;
