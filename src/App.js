import "./styles.css";

import { v4 as uuidv4 } from "uuid";

import { useEffect, useState } from "react";

export default function App() {
  const [characters, setCharecters] = useState([]);
  const [house, setHouse] = useState("");
  const api =
    house === ""
      ? "https://hp-api.herokuapp.com/api/characters"
      : `https://hp-api.herokuapp.com/api/characters/${house}`;
  useEffect(() => {
    async function fetchData() {
      const data = await fetch(api);
      const result = await data.json();
      setCharecters(result);
    }
    fetchData();
  }, [characters, api]);

  function handleClick(e) {
    setHouse(`house/${e.target.value}`);
  }

  function reset(e) {
    setHouse("");
  }
  return (
    <div className="App">
      <h1>Harry Potter</h1>
      <h2>School ID</h2>
      <div className="housees">
        <button className="myButton" onClick={handleClick} value="Gryffindor">
          Gryffindor
        </button>
        <button className="myButton" onClick={handleClick} value="Slytherin">
          Slytherin
        </button>
        <button className="myButton" onClick={handleClick} value="Hufflepuff">
          Hufflepuff
        </button>
        <button className="myButton" onClick={handleClick} value="Ravenclaw">
          Ravenclaw
        </button>
        <button className="myButton" onClick={reset} value="All">
          All
        </button>
      </div>
      {characters.map((charecter) => {
        return (
          <ul key={uuidv4()} className="card">
            <li>
              <div className="info">
                <h3>{charecter.name}</h3>
                <p>{charecter.house}</p>
                <p>DOB: {charecter.dateOfBirth}</p>
                <p>
                  Wand: {charecter.wand.wood} {charecter.wand.core}
                </p>
                <p>patronus: {charecter.patronus}</p>
              </div>
              <img src={charecter.image} alt="potrait" />
            </li>
          </ul>
        );
      })}
    </div>
  );
}
