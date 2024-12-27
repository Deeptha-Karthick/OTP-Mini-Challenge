import "./styles.css";
import { useRef } from "react";

export default function App() {
  const digits = 6;
  const inputRefs = useRef([]);

  //using keydown instead of onchange because on change doesnt pick up Backspace
  //cant use onchange and keydownin conjunction because key down is fired first and onchange next, so it might target same getElementById
  //e.preventdefault inside keydown , because browser processes the keydown event before updating the input's value, and you're manually assigning e.key to the input value. This creates a situation where both the input's native behavior and your custom logic are inserting the character, resulting in duplicate values.
  const onNavigate = (e, index) => {
    console.log("navigate", e);
    if (e.code === "Backspace") {
      inputRefs.current[index].value = null;
      if (index - 1 > -1) {
        inputRefs.current[index - 1].focus();
      }
    }
    if (e.code === "ArrowLeft") {
      if (index - 1 > -1) {
        inputRefs.current[index - 1].focus();
      }
    }
    if (e.code === "ArrowRight") {
      if (index + 1 < digits) {
        inputRefs.current[index + 1].focus();
      }
    }
    if (!isNaN(e.key) && index < digits && e.key.length === 1) {
      e.preventDefault(); // Prevent the default character insertion
      inputRefs.current[index].value = e.key;
      if (index + 1 < digits) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const onPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    let pasteDataArray = pasteData.split("");

    console.log("pasteData", pasteDataArray);
    pasteDataArray.forEach(
      (el, index) => (inputRefs.current[index].value = el)
    );
  };

  return (
    <div className="App">
      <h1>OTP</h1>
      <div className="otp-container">
        {Array.from({ length: digits }, (el, index) => {
          return (
            <input
              type="text"
              className="box"
              key={index}
              onClick={(e) => console.log("e", e)}
              ref={(el) => (inputRefs.current[index] = el)}
              onKeyDown={(e) => onNavigate(e, index)}
              onPaste={(e) => onPaste(e)}
            />
          );
        })}
      </div>
    </div>
  );
}
