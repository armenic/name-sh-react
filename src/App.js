import { useState } from "react";

function App() {
  const [names, setNames] = useState("");
  const [namesArray, setNamesArray] = useState([]);

  function handleNames(event) {
    setNames(event.target.value);
  }

  function handleSubmit(event) {
    setNamesArray(makeArray(names));
    event.preventDefault();
  }

  function makeArray(namesString) {
    const re = /,*[\r\n]/;
    let namesArray = namesString.split(re);
    console.log(namesArray);
    return namesArray;
  }

  function NamesList(props) {
    let names = props.names;
    names = names.filter((name) => name.trim() !== "")
    const listItems = names.map((name, i) => <li key={i}>{name}</li>);
    return (
      <>
      <p>Total number: {names.length}</p>
        <ul>{listItems}</ul>
      </>
    );
  }

  return (
    <>
      <h1>All Hands DSS Mississauga</h1>
      <h2>Hint: Use "GCal's send email to guests" to copy names</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={names}
          onChange={handleNames}
          rows="10"
          cols="70"
          required
        ></textarea>
        <br />
        <button type="submit">Add</button>
      </form>
      <NamesList names={namesArray} />
    </>
  );
}

export default App;
