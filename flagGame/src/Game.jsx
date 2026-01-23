import { useEffect, useState } from "react";
import Flag from "./Flag";
import "./Game.css";

function Game() {
  const [flags, setFlags] = useState({});
  const [options, setOptions] = useState([]);
  const [correctFlag, setCorrectFlag] = useState("");
  const [flagUrl, setFlagUrl] = useState("");
  const [msg, setMsg] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    fetch("https://flagcdn.com/pt/codes.json")
      .then((response) => response.json())
      .then((data) => setFlags(data))
      .catch((error) => console.error(error));
  }, []);

  useEffect(() => {
    // Se o objeto flags tiver mais de 0 chaves, inicia uma nova rodada
    if (Object.keys(flags).length > 0) {
      startNewRound();
    }
  }, [flags]);

  // funcao chamada comeca um novo jogo
  const startNewRound = () => {
    // pega todas as keys do objeto flags e guarda em um array
    const flagCodes = Object.keys(flags);
    // cria um array vazio para armazenar os codigos selecionados
    const selectedCodes = [];
    // loop que roda enquanto o array selectedCodes tiver menos de 3 elementos
    while (selectedCodes.length < 3) {
      // gera um indice aleatorio entre 0 e o tamanho do array flagCodes
      const randomIndex = Math.floor(Math.random() * flagCodes.length);
      // pega o codigo da bandeira correspondente ao indice aleatorio
      const randomCode = flagCodes[randomIndex];
      // se o codigo ainda nao estiver no array selectedCodes, adiciona
      if (!selectedCodes.includes(randomCode)) selectedCodes.push(randomCode);
    }

    console.log(selectedCodes);
    // Gera indice aleatorio, 0, 1 ou 2 para escolher a resposta correta
    const correctIndex = Math.floor(Math.random() * selectedCodes.length);
    const correctCode = selectedCodes[correctIndex];
    // Define a bandeira correta usando o state
    setCorrectFlag(flags[correctCode]);
    setFlagUrl(`https://flagcdn.com/256x192/${correctCode}.png`);
    // Define a URL da imagem da bandeira correta
    setOptions(selectedCodes.map((code) => flags[code]));
    // Limpa a mensagem
    setMsg("");
    // Reseta o estado de respondido
    setAnswered(false);
  };

  const handleOptionClick = (selectedFlag) => {
    setAnswered(true);
    if (selectedFlag === correctFlag) {
      setMsg("Correto!");
      setCorrectCount(correctCount + 1);
    } else {
      setMsg(`Errado!`);
      setIncorrectCount(incorrectCount + 1);
    }

    setTimeout(() => {
      startNewRound();
    }, 2000);
  };

  return (
    <div className="game-container">
      {/* cabeçalho do jogo */}
      <h1>Jogo das Bandeiras</h1>
      <h2>Que bandeira é essa?</h2>
      {/* placar do jogo */}
      <div className="score-container">
        <p className="score-correct">Acertos: {correctCount}</p>
        <p
          className={
            msg == "Acertou"
              ? "score correct"
              : msg == "Errou"
                ? "score wrong"
                : ""
          }
        >
          {msg}
        </p>
        <p className="score-wrong">Erros: {incorrectCount}</p>
      </div>
      {/* imagem da bandeira */}
      <div className="flag-container">
        {/* operador ternario
        Se flagUrl existe (tem valor): renderiza o componente <Flag> passando flagUrl como prop */}
        {flagUrl ? <Flag flagUrl={flagUrl} /> : "Carregando..."}
      </div>
      {/* opcoes de resposta */}
      <div className="options-container">
        {options.map((flag, index) => (
          <button
            onClick={() => handleOptionClick(flag)}
            className={
              answered && flag === correctFlag
                ? "option-button correct-option"
                : "option-button"
            }
            key={index}
            disabled={answered}
          >
            {index + 1}) {flag}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Game;
