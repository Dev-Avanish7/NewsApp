import './App.css';
import React from 'react';
import Navbar from './Components/Navbar.js'
import News from './Components/News.js';
import {useState} from "react";
import LoadingBar from 'react-top-loading-bar';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  // const apiKey = "87e58df78d7a432d9bd1621b200b95a6";
  const apiKey = "821c51737c6b4ae58537e91ac9699b7e";
  // const apiKey = process.env.REACT_APP_NEWS_API
  const country = "in";
  
  const[mode, setMode] = useState("light");
  const [progress, setProgress] = useState(0);

  const toggleMode = () => {
    if(mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(56, 56, 56)";
      document.body.style.color = "white";
    }
    else{
      setMode("light")
      document.body.style.backgroundColor = "transparent";
      document.body.style.color = "black";
    }
  }

  const Progress = (progress) => {
    setProgress(progress);
  }
  return (
    <>
    <Router>
      <Navbar mode={mode} toggleMode={toggleMode}/>
      <LoadingBar
            color="#f11946"
            progress={progress}
      />
      <Switch>
      <Route exact path="/">
        <News Progress={Progress} country={country} apiKey={apiKey} mode={mode} toggleMode={toggleMode} pageSize={6} category="" key=""/>
      </Route>
      <Route exact path="/general">
        <News Progress={Progress} country={country} apiKey={apiKey} mode={mode} toggleMode={toggleMode} pageSize={6} category="general" key="general"/>
      </Route>
      <Route exact path="/entertainment">
        <News Progress={Progress} country={country} apiKey={apiKey} mode={mode} toggleMode={toggleMode} pageSize={6} category="entertainment" key="entertainment"/>
      </Route>
      <Route exact path="/sports">
        <News Progress={Progress} country={country} apiKey={apiKey} mode={mode} toggleMode={toggleMode} pageSize={6} category="sports" key="sports"/>
      </Route>
      <Route exact path="/health">
        <News Progress={Progress} country={country} apiKey={apiKey} mode={mode} toggleMode={toggleMode} pageSize={6} category="health" key="health"/>
      </Route>
      <Route exact path="/business">
        <News Progress={Progress} country={country} apiKey={apiKey} mode={mode} toggleMode={toggleMode} pageSize={6} category="business" key="business"/>
      </Route>
      <Route exact path="/science">
        <News Progress={Progress} country={country} apiKey={apiKey} mode={mode} toggleMode={toggleMode} pageSize={6} category="science" key="science"/>
      </Route>
      <Route exact path="/technology">
        <News Progress={Progress} country={country} apiKey={apiKey} mode={mode} toggleMode={toggleMode} pageSize={6} category="technology" key="technology"/>
      </Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
