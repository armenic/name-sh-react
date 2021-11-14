import { useState } from "react";

function NamesList(props) {
  let names = props.names;
  let chosens = props.chosenNames;
  const listItems = names.map((name, i) => {
    if (chosens.includes(name)) {
      const liStyle = {
        color: "blue",
      };
      return (
        <li key={i} style={liStyle}>
          {name}
        </li>
      );
    } else {
      return <li key={i}>{name}</li>;
    }
  });
  return (
    <>
      <p>Total number: {names.length}</p>
      <ul>{listItems}</ul>
    </>
  );
}

function makeArray(namesString) {
  const re = /,*[\r\n]/;
  let namesArray = namesString.split(re);
  namesArray = namesArray.filter((name) => name.trim() !== "");
  return namesArray;
}

// Array to store indexes which are left to access.
// It helps in accessing values without repeating
var alreadyDone = [];

// Function picking random values from array
const randomValueFromArray = (myArray) => {
  // If alreadyDone is empty then fill it will indexes equal
  // to the size of myArray
  if (alreadyDone.length === 0) {
    for (var i = 0; i < myArray.length; i++) alreadyDone.push(i);
  }

  // Generate random number within the range of
  // length of alreadyDone array
  var randomValueIndex = Math.floor(Math.random() * alreadyDone.length);

  // Getting not accessed index of myArray using above
  // random number
  var indexOfItemInMyArray = alreadyDone[randomValueIndex];

  // remove this index from alreadyDone array because
  // we are accessing it now.
  alreadyDone.splice(randomValueIndex, 1);

  // Get the value
  return myArray[indexOfItemInMyArray];
};

function App() {
  const [names, setNames] = useState("");
  const [randomButton, setRandomButton] = useState(false);
  const [addButton, setAddButton] = useState(true);
  const [namesArray, setNamesArray] = useState([]);
  const [chosenNames, setChosenNames] = useState([]);
  const [showNames, setShowNames] = useState(false);
  const [showTextArea, setShowTextArea] = useState(true);

  function handleNames(event) {
    setNames(event.target.value);
  }

  function handleAdd(event) {
    setNamesArray(makeArray(names));
    setRandomButton(true);
    setAddButton(false);
    setShowNames(false);
    setShowTextArea(false);
    setChosenNames([]);
    alreadyDone.length = 0;
    event.preventDefault();
  }

  function handleRandom(event) {
    event.preventDefault();
    let chosenName = randomValueFromArray(namesArray);
    setChosenNames((prevState) => [...prevState, chosenName]);
    setShowNames(true);
    if (namesArray.length === chosenNames.length + 1) {
      setRandomButton(false);
      setShowTextArea(true);
      setAddButton(true);
      console.log("Everybody was chosen!");
    }
  }

  return (
    <>
      <h1>Name Shuffler, All Hands DSS Mississauga</h1>
      <h2>Hint: Use "GCal's send email to guests" to copy names</h2>
      {showNames && (
        <h2>Chosen one:🎆{chosenNames[chosenNames.length - 1]}🎆</h2>
      )}
      <form onSubmit={handleAdd}>
        {showTextArea && (
          <textarea
            value={names}
            onChange={handleNames}
            rows="10"
            cols="70"
            required
          ></textarea>
        )}

        <br />
        {addButton && <button type="submit">Add</button>}
        {randomButton && (
          <button onClick={handleRandom}>Randomly Select One</button>
        )}
      </form>
      <NamesList names={namesArray} chosenNames={chosenNames} />
    </>
  );
}

export default App;
