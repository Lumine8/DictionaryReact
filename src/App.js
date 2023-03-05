import "./styles.css";
import Book from "./assets/images/book.png";
import { useState } from "react";

export default function App() {
  const [searched, setSearched] = useState("Hello");
  /*let fonts = [
    "PT Serif", 
    "Didact Gothic", 
    "Alegreya Sans SC ", 
    "Comic Neue"];*/

  const [fontz, setfontz] = useState("PT Serif");
  let counter = 0;
  function backGroundColorChanger(event) {
    counter += 1;
    if (counter % 2 === 0) {
      document.getElementById("SunOrMoon").innerText = "☀";
      document.getElementById("fontSelection").style.color = "Black";
      document.getElementById("fontSelection").style.backgroundColor = "#FFF";
      document.body.style.color = "Black";
      document.body.style.backgroundColor = "#FFF";
    } else {
      document.getElementById("SunOrMoon").innerText = "☾";
      document.getElementById("fontSelection").style.backgroundColor =
        "#3E3F4B";
      document.getElementById("fontSelection").style.color = "#ECECF1";
      document.body.style.color = "#ECECF1";
      document.body.style.backgroundColor = "#3E3F4B";
    }
  }

  function oncChangeHandler(event) {
    setfontz(event.target.value);
    console.log(event.target.value);
  }

  function errorHandler(error) {
    console.log("please type a proper word! error occured");
  }

  const onChangesHandler = (event) => {
    setSearched(event.target.value);
    const APIurl = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    fetch(APIurl + event.target.value)
      .then((response) => response.json())
      .then((ObjectfromAPI) => {
        const valueFromAPI = ObjectfromAPI[0];
        let {
          phonetic = undefined ?? "Not found",
          meanings: [
            {
              partOfSpeech: POS1,
              definitions: [
                { definition: definition11 },
                { definition: definition12 },
                { definition: definition13 }
              ]
            },
            {
              partOfSpeech: POS2 = undefined ?? "Not found",
              definitions: [
                { definition: definition21 },
                { definition: definition22 }
              ]
            }
          ],
          sourceUrls: [url]
        } = valueFromAPI;

        document.getElementById("POS1").innerText = POS1;
        document.getElementById("POS2").innerText = POS2;
        /*console.log(POS2);*/
        document.getElementById("phonetic").innerText = phonetic;
        document.getElementById("definition11").innerText = definition11;
        document.getElementById("definition12").innerText = definition12;
        document.getElementById("definition13").innerText = definition13;

        document.getElementById("definition21").innerText = definition21;
        document.getElementById("definition22").innerText = definition22;
        document.getElementById("sourceUrls").innerText = url;
      })
      .catch(errorHandler);
  };

  return (
    <div
      className="App"
      style={{
        fontFamily: `${fontz}`,
        backgroundColor: ``,
        padding: "0 10rem 0 10rem"
      }}
    >
      <header className="topnav" style={{ width: "50%" }}>
        <img
          id="BookImg"
          src={Book}
          alt="Some logo"
          style={{ height: "2rem" }}
        />
        <div id="fontSelector">
          <select
            style={{ backgroundColor: "none" }}
            id="fontSelection"
            onChangeCapture={oncChangeHandler}
          >
            <option value="PT Serif">Sefri</option>
            <option value="Didact Gothic">Gothic</option>
            <option value="Alegreya Sans SC ">Alegreya</option>
            <option value="Comic Neue">Comic</option>
          </select>
          &nbsp; &nbsp; |
        </div>

        <h4 id="SunOrMoon">
          <span role="img" aria-label="darkthemed">
            ☀
          </span>
        </h4>

        <div className="switchDiv">
          <label className="switch">
            <input type="checkbox" onClick={backGroundColorChanger} />
            <span className="slider round"></span>
          </label>
        </div>
      </header>

      <div className="body">
        {" "}
        <div className="SearchBar">
          <input placeholder="Search..." onChange={onChangesHandler} />
        </div>
        <div id="textInfo">
          <h1 id="title">{searched}</h1>
          <h3 id="phonetic" style={{ color: "#977CDC" }}>
            {" "}
          </h3>
          <h4 id="POS1"> </h4>
          <hr className="horizontalLine" />
          <h4 style={{ color: "#A2A2A2" }}>meaning</h4>
          <p>
            • &nbsp;<span className="defined" id="definition11"></span>
          </p>
          <p>
            • &nbsp;<span className="defined" id="definition12"></span>
          </p>
          <p>
            • &nbsp;<span className="defined" id="definition13"></span>
          </p>
          <br />
          <h3 style={{ color: "#A2A2A2" }}>Synonyms: object not found</h3>
          <br />
          <h4 id="POS2"> </h4>
          <hr className="horizontalLine" />
          <h4 style={{ color: "#A2A2A2" }}>meaning</h4>
          <p>
            • &nbsp;<span className="defined" id="definition21"></span>
          </p>
          <p>
            • &nbsp;<span className="defined" id="definition22"></span>
          </p>
          <br />
          <hr style={{ width: "101%" }} />
          <p style={{ color: "#A2A2A2" }}>
            Source{" "}
            <a style={{ color: "#646669" }} href=" " id="sourceUrls">
              {" "}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
