import React, { useState, useEffect } from "react";
import RockBtn from "../assets/buttons/rock-human.png";
import PaperBtn from "../assets/buttons/paper-human.png";
import ScissorsBtn from "../assets/buttons/scissors-human.png";
import HumanRock from "../assets/choices/rockH.png";
import HumanPaper from "../assets/choices/paperH.png";
import HumanScissors from "../assets/choices/scissorsH.png";
import AiRock from "../assets/choices/rockAi.png";
import AiPaper from "../assets/choices/paperAi.png";
import AiScissors from "../assets/choices/scissorsAi.png";
import ButtonClick from "../assets/audios/drumDeepImpact.wav";
import FailSound from "../assets/audios/playerLosing.wav";
import WinSound from "../assets/audios/gameLevelCompleted.wav";

const clickBtnAudio = new Audio(ButtonClick);
const winAudio = new Audio(WinSound);
const failAudio = new Audio(FailSound);

const playSound = () => {
  clickBtnAudio.currentTime = 0;
  clickBtnAudio.play();
};

const playWinSound = () => {
  winAudio.currentTime = 0;
  winAudio.play();
};

const playFailSound = () => {
  failAudio.currentTime = 0;
  failAudio.play();
};

function Game() {
  const choices = ["Rock", "Paper", "Scissors"];

  const humanChoices = [HumanRock, HumanPaper, HumanScissors];
  const aiChoices = [AiRock, AiPaper, AiScissors];

  const [userChoice, setUserChoice] = useState("");
  const [aiChoice, setAiChoice] = useState("");
  const [userScore, setUserScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [result, setResult] = useState();

  const [playing, setPlaying] = useState(true);

  const [shakeHands, setShakeHands] = useState(false);

  function playGame(choice) {
    setUserChoice(choices[choice]);

    const randomChoice = Math.floor(Math.random() * choices.length);
    setAiChoice(choices[randomChoice]);

    setPlaying(false);
  }

  useEffect(() => {
    if (!playing && userChoice && aiChoice) {
      if (
        (userChoice === "Rock" && aiChoice === "Scissors") ||
        (userChoice === "Scissors" && aiChoice === "Paper") ||
        (userChoice === "Paper" && aiChoice === "Rock")
      ) {
        setResult("Human wins!");
        setUserScore((s) => s + 1);
        playWinSound();
        document.body.style.backgroundColor = "#A4EE98";
      } else if (userChoice === aiChoice) {
        setResult("It's a Draw!");
        document.body.style.backgroundColor = "#FFC09D";
      } else {
        setResult("AI Wins!");
        setAiScore((s) => s + 1);
        playFailSound();
        document.body.style.backgroundColor = "#FF9D9D";
      }
    }
  }, [userChoice, aiChoice, playing]);

  useEffect(() => {
    checkGameOver();
  }, [userScore, aiScore]);

  const checkGameOver = () => {
    if (userScore === 5 || aiScore === 5) {
      setPlaying(false);
      alert(`${userScore > aiScore ? "You win" : "AI wins"}!`);
    }
  };

  const restartGame = () => {
    setPlaying(true);
    setAiChoice("");
    setUserChoice("");
    setUserScore(0);
    setAiScore(0);
    setResult();
    setShakeHands(false);
    document.body.style.backgroundColor = "#7ebefa";
  };

  const nextRound = () => {
    setPlaying(true);
    setShakeHands(false);
    document.body.style.backgroundColor = "#7ebefa";
  };

  return (
    <div className="game-content">
      <h1>Rock Paper Scissors Game:</h1>
      <img
        src={humanChoices[choices.indexOf(userChoice)] || HumanRock}
        alt="Your Choice"
        className={`hand human-hand ${shakeHands ? "shake" : ""}`}
      />
      <div className="scores">
        <div>
          <p className="score">{aiScore}</p> <p>AI:</p>
        </div>
        <div>
          <p className="score">{userScore}</p> <p>You:</p>
        </div>
      </div>

      <div className="result">{result}</div>

      {playing ? (
        <div className="buttons">
          <button
            onClick={() => {
              playSound();
              playGame(0);
            }}
          >
            <img src={RockBtn} alt="Rock" draggable="false" />
          </button>
          <button
            onClick={() => {
              playSound();
              playGame(1);
            }}
          >
            <img src={PaperBtn} alt="Paper" draggable="false" />
          </button>
          <button
            onClick={() => {
              playSound();
              playGame(2);
            }}
          >
            <img src={ScissorsBtn} alt="Scissors" draggable="false" />
          </button>
        </div>
      ) : (
        <div className="game-nav">
          <button className="next-round" onClick={nextRound}>
            Next Round
          </button>
          <button className="restart" onClick={restartGame}>
            Restart
          </button>
        </div>
      )}

      <img
        src={aiChoices[choices.indexOf(aiChoice)] || AiRock}
        alt="AI Choice"
        className={`hand ai-hand ${shakeHands ? "shake" : ""}`}
      />
    </div>
  );
}

export default Game;
