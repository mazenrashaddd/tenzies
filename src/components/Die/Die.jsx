import "./Die.css";
import dieOne from "../../assets/icons/dice-six-faces-one (2).png";
import dieTwo from "../../assets/icons/dice-six-faces-two (2).png";
import dieThree from "../../assets/icons/dice-six-faces-three (2).png";
import dieFour from "../../assets/icons/dice-six-faces-four (2).png";
import dieFive from "../../assets/icons/dice-six-faces-five (2).png";
import dieSix from "../../assets/icons/dice-six-faces-six (2).png";

export default function Die(props) {

  const diceImages = [dieOne, dieTwo, dieThree, dieFour, dieFive, dieSix]

  return (
    <>
      <button
        className={`dieButton ${props.isHeld ? "held" : ""}`}
        onClick={() => props.holdDie()}
      >
        {/* {props.value} */} 
        {/* uncomment if you want to revert back to values not dice images */}
        <img className="dieIcon" src={diceImages[props.value - 1]} alt={`Die image with the value of ${props.value}`} />
      </button>
    </>
  );
}
