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
  const [wrongCount, setWrongCount] = useState(0);
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
      if (!selectedCodes.includes(randomCode)) {
        selectedCodes.push(randomCode);
      }

      console.log(selectedCodes);
      // Gera indice aleatorio, 0, 1 ou 2 para escolher a resposta correta
      const correctIndex = Math.floor(Math.random() * selectedCodes.length);
      const correctCode = selectedCodes[correctIndex];
      // Define a bandeira correta usando o state
      setFlagUrl("https://flagcdn.com/256x192/'+correctCode+'.png");
      // Define a URL da imagem da bandeira correta
      setOptions(selectedCodes.map((code) => flags[code]));
      // Limpa a mensagem
      setMsg("");
      // Reseta o estado de respondido
      setAnswered(false);
    }
  };

  const handleOptionClick = (selectedCodes) => {
    setAnswered(true);
    if (selectedCodes === correctFlag) {
      setMsg("Correto!");
      setCorrectCount(correctCount + 1);
    } else {
      setMsg(`Errado!`);
      setWrongCount(wrongCount + 1);
    }

    setTimeout(() => {
      startNewRound();
    }, 2000);
  };

  return (
    <div>
      <Flag />
    </div>
  );
}

export default Game;
