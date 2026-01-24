import "./Flag.css";
function Flag({ flagUrl }) {
  return (
    <div>
      {flagUrl && <img src={flagUrl} alt="Bandeira" className="flag" />}
    </div>
  );
}

export default Flag;
