import "./Flag.css";

function Flag(flagUrl) {
  return (
    <div>
      {flagUrl && (
        <img src={flagUrl} alt="ImagemBandeira" className="bandeira" />
      )}
    </div>
  );
}

export default Flag;
