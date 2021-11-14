import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

function NamesList(props) {
  let names = props.names;
  let chosens = props.chosenNames;
  const listItems = names.map((name, i) => {
    if (chosens.includes(name)) {
      return (
        <li
          key={i}
          style={{
            color: "blue",
          }}
        >
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
  let namesArrayUnique = namesArray.filter((v, i, a) => a.indexOf(v) === i);
  return namesArrayUnique;
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
  const [number, setNumber] = useState(1);
  const [randomButton, setRandomButton] = useState(false);
  const [addButton, setAddButton] = useState(true);
  const [namesArray, setNamesArray] = useState([]);
  const [chosenNames, setChosenNames] = useState([]);
  const [showNames, setShowNames] = useState(false);
  const [showTextArea, setShowTextArea] = useState(true);

  function handleNames(event) {
    setNames(event.target.value);
  }
  function handleNumber(event) {
    setNumber(event.target.value);
  }

  function handleAdd(event) {
    event.preventDefault();
    setNamesArray(makeArray(names));
    setRandomButton(true);
    setAddButton(false);
    setShowNames(false);
    setShowTextArea(false);
    setChosenNames([]);
    alreadyDone.length = 0;
  }

  function handleRandom(event) {
    event.preventDefault();
    let remainder = namesArray.length % parseInt(number);

    if (remainder) {
      window.alert(
        `Value ${number} has to be a divisor of 
        Total number ${namesArray.length}, 
        e.g. 2 is a divisor of 4 (no remainder left)`
      );
    } else {
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
  }

  return (
    <Container>
      <h1>Random Selector, DSS All Hands Mississauga</h1>
      <h4>Hint: Use "GCal's send email to guests" to copy names</h4>
      <br />
      <Row>
        {randomButton && (
          <Col xs={7} onSubmit={handleRandom}>
            <Form>
              <Row>
                <Col xs={4}>
                  <Button type="submit" variant="info">
                    Randomly Select
                  </Button>
                </Col>
                <Col xs={3}>
                  <Form.Control
                    type="number"
                    min={1}
                    onChange={handleNumber}
                    value={number}
                    required
                  ></Form.Control>
                </Col>
              </Row>
            </Form>
          </Col>
        )}
        {showNames && (
          <Col>
            <h1>
              <Badge pill bg="primary">
                Chosen:🎆{chosenNames[chosenNames.length - 1]}🎆
              </Badge>
            </h1>
          </Col>
        )}
      </Row>
      <Form onSubmit={handleAdd}>
        <Form.Group>
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
          {addButton && <Button type="submit">Add</Button>}
        </Form.Group>
      </Form>
      <br />
      <NamesList names={namesArray} chosenNames={chosenNames} />
    </Container>
  );
}

export default App;
