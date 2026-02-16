/* ============================================================
   PHASE 3-4: SMART ADVICE CARD
   ============================================================ */
import { toast } from "react-toastify";

toast.success("Project added successfully");
toast.error("Something went wrong");

function SmartAdviceCard({ message }) {
  return (
    <div className="advice-card warning">
      <strong>Warning</strong>
      <p>{message}</p>
    </div>
  );
}

export default SmartAdviceCard;
