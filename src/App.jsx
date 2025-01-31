import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import Confetti from "react-confetti";
import Die from "./components/Die/Die";

function App() {
  const [dice, setDice] = useState(generateNewDiceArray());

  const [stopwatch, setStopwatch] = useState(0);

  const gameWon = dice.every(
    (die) => die.isHeld && die.value === dice[0].value
  );

  const diceElement = dice.map((die) => {
    return (
      <Die
        key={die.id}
        id={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDie={() => holdDie(die.id)}
      />
    );
  });

  function generateNewDiceArray() {
    return new Array(10).fill(0).map(() => ({
      id: nanoid(),
      value: Math.floor(Math.random() * 6 + 1),
      isHeld: false,
    }));
  }

  function holdDie(id) {
    setDice((prevDice) => {
      return prevDice.map((die) => {
        return id === die.id ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  function handleButtonBehaviour() {
    gameWon
      ? setDice(generateNewDiceArray())
      : setDice((prevDice) =>
          prevDice.map((die) =>
            die.isHeld
              ? die
              : {
                  ...die,
                  value: (() => {
                    let newValue = Math.floor(Math.random() * 6 + 1);
                    while (newValue === die.value) {
                      newValue = Math.floor(Math.random() * 6 + 1);
                    }
                    return newValue;
                  })(),
                }
          )
        );
  }

  useEffect(() => {
    if (gameWon) {
      return;
    } else {
      setStopwatch(0);
      const interval = setInterval(() => {
        setStopwatch((prevStopwatch) => prevStopwatch + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameWon]);

  return (
    <main>
      <div className="innerSection">
        <h1>Tenzies</h1>
        <span>
          Roll until all dice are the same. Click each die to freeze it at it's
          current value between rolls.
        </span>
        <section className="gridSection">{diceElement}</section>
        <span className="stopwatchTimer">{stopwatch} Seconds</span>
        <button className="rollDiceButton" onClick={handleButtonBehaviour}>
          {gameWon ? "New Game" : "Roll Dice"}
        </button>
      </div>
      {gameWon && <Confetti />}
    </main>
  );
}

export default App;
