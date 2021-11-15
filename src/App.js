import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";

function Help(props) {
  return (
    <Modal {...props} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Random Selector</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          <li>
            the app randomly selects requested number of items from provided
            list
          </li>
          <li>
            paste a list with one item per line into the text area and click Add
          </li>
          <li>
            for Google Calendar use "send email to guests" to copy names as a
            list
          </li>
          <li>the app will remove duplicated and empty lines</li>
          <li>
            after adding a list, choose the number of items to be selected
          </li>
          <li>
            the number has to less or equal to the remaining number of items
          </li>
          <li>click Randomly Select</li>
          <li>the app will print chosen items</li>
        </ul>
        <a href="https://github.com/armenic/random-selector">Code on GitHub</a>
      </Modal.Body>
    </Modal>
  );
}

function NamesList(props) {
  let names = props.names;
  let chosens = props.chosenNames;
  let remainingNames = props.remainingNames;
  const listItems = names.map((name, i) => {
    let liStyle;
    if (chosens.includes(name)) {
      liStyle = {
        color: "blue",
        fontWeight: "bold",
      };
    }
    return (
      <li key={i} style={liStyle}>
        {name}
      </li>
    );
  });

  return (
    <>
      <p>
        Total number: {names.length}, remaining number: {remainingNames}
      </p>
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
  const [lastChosen, setLastChosen] = useState([]);
  const [showNames, setShowNames] = useState(false);
  const [showTextArea, setShowTextArea] = useState(true);
  const [modalShow, setModalShow] = useState(false);
  const [alertNumberShow, setAlertNumberShow] = useState(false);
  const [alertCompleteShow, setAlertCompleteShow] = useState(false);
  const [showRestart, setShowRestart] = useState(false);

  function handleNames(event) {
    setNames(event.target.value);
  }
  function handleNumber(event) {
    setNumber(event.target.value);
    setAlertNumberShow(false);
  }

  function handleAdd(event) {
    event.preventDefault();
    setNamesArray(makeArray(names));
    setRandomButton(true);
    setNumber(1);
    setAddButton(false);
    setShowNames(false);
    setShowTextArea(false);
    setChosenNames([]);
    alreadyDone.length = 0;
  }

  let remainingNames = namesArray.length - chosenNames.length;
  if (remainingNames < 0) {
    remainingNames = 0;
  }

  function handleRandom(event) {
    event.preventDefault();

    if (remainingNames !== 0 && number > remainingNames) {
      setAlertNumberShow(true);
    } else {
      // setShowNumber(false);
      // need to select randomly "number of times"
      const tempLastChosens = [];
      for (let t = 0; t < number; t++) {
        let chosenName = randomValueFromArray(namesArray);
        tempLastChosens.push(chosenName);
        setChosenNames((prevState) => [...prevState, chosenName]);
      }
      setLastChosen(tempLastChosens);
      setShowNames(true);
      if (namesArray.length === chosenNames.length) {
        setAlertCompleteShow(true);
        setRandomButton(false);
        setShowRestart(true);
      }
    }
  }

  function handleRestart() {
    setAlertCompleteShow(false);
    setShowTextArea(true);
    setAddButton(true);
    setShowNames(false);
    setShowRestart(false);
    setNamesArray([]);
  }

  const alertStyle = { width: "50%" };
  const namesToShow = [...lastChosen].sort()

  return (
    <Container>
      <h1>Random Selector</h1>

      <br />
      {randomButton && (
        <Form onSubmit={handleRandom}>
          <Stack direction="horizontal" gap={3}>
            <Button type="submit" variant="success">
              Randomly Select
            </Button>
            {/* {showNumber && ( */}
            <Col xs={2} md={2}>
              <Form.Control
                type="number"
                min={1}
                onChange={handleNumber}
                value={number}
                required
                placeholder={`<= ${remainingNames}`}
              ></Form.Control>
            </Col>
            {/* )} */}
          </Stack>
          {alertNumberShow && (
            <>
              <br />
              <Alert
                variant="danger"
                onClose={() => setAlertNumberShow(false)}
                dismissible
                style={alertStyle}
              >
                <Alert.Heading>Invalid Number to Choose</Alert.Heading>
                <p>
                  {`Value has to be less or equal to the remaining number of
                   names, ${remainingNames}`}
                </p>
              </Alert>
            </>
          )}
        </Form>
      )}
      <br />
      {alertCompleteShow && (
        <Alert
          variant="danger"
          onClose={() => setAlertCompleteShow(false)}
          dismissible
          style={alertStyle}
        >
          <Alert.Heading>Everybody Was Chosen</Alert.Heading>
          <p>Press the Restart button if you wish to start again</p>
        </Alert>
      )}
      {showRestart && (
        <>
          <Button onClick={handleRestart}>Restart</Button>
          <br />
          <br />
        </>
      )}

      {showNames &&
        namesToShow.map((chosen, i) => (
          <h3 key={i}>
            <Badge pill bg="primary">
              Chosen:🎆{chosen}🎆
            </Badge>
          </h3>
        ))}
      <Form onSubmit={handleAdd}>
        <Form.Group>
          {showTextArea && (
            <Form.Control
              as="textarea"
              style={{ width: "50rem", height: "10rem" }}
              value={names}
              onChange={handleNames}
              placeholder="paste a list with one item per line and click Add"
              required
            ></Form.Control>
          )}
          <br />
          {addButton && (
            <>
              <Button type="submit">Add</Button>{" "}
              <Button variant="info" onClick={() => setModalShow(true)}>
                Help
              </Button>
            </>
          )}
        </Form.Group>
      </Form>
      <br />
      <NamesList
        names={namesArray}
        chosenNames={chosenNames}
        remainingNames={remainingNames}
      />
      <Help show={modalShow} onHide={() => setModalShow(false)} />
    </Container>
  );
}

export default App;
