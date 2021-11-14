import { useState } from "react";

function NamesList(props) {
  let names = props.names;
  const listItems = names.map((name, i) => <li key={i}>{name}</li>);
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
  const [namesArray, setNamesArray] = useState([]);
  const [chosenNames, setChosenNames] = useState([]);
  const [showNames, setShowNames] = useState(false);

  function handleNames(event) {
    setNames(event.target.value);
  }

  function handleAdd(event) {
    setNamesArray(makeArray(names));
    setRandomButton(true);
    setShowNames(false);
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
      console.log("Everybody was chosen!");
    }
  }

  return (
    <>
      <h1>All Hands DSS Mississauga</h1>
      <h2>Hint: Use "GCal's send email to guests" to copy names</h2>
      {showNames && (
        <h2>Chosen one:🎆{chosenNames[chosenNames.length - 1]}🎆</h2>
      )}
      <form onSubmit={handleAdd}>
        <textarea
          value={names}
          onChange={handleNames}
          rows="10"
          cols="70"
          required
        ></textarea>
        <br />
        <button type="submit">Add</button>
        {randomButton && (
          <button onClick={handleRandom}>Randomly Select One</button>
        )}
      </form>
      <NamesList names={namesArray} />
    </>
  );
}

export default App;
