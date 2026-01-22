import { useEffect, useState } from "react";

function Teste() {
  const [bandeira, setBandeira] = useState({});

  useEffect(() => {
    fetch("https://flagcdn.com/pt/codes.json")
      .then((response) => response.json())
      .then((data) => setBandeira(data));
  }, []);
  return (
    <div>
      <ul>
        {Object.entries(bandeira).map(([code, name]) => (
          <li key={code}>
            {code} - {name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Teste;
