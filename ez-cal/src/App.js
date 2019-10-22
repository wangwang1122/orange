import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "rbx/index.css";
import { Button, Container, Message, Title } from "rbx";
import ApiCalendar from "./ApiCalendar";
import { Switch, Route } from 'react-router-dom'
import "./App.css"
import LinkGenerator from "./LinkGenerator";
import data from './data/dummy.json'
import data2 from './data/silly.json'

const firebaseConfig = {
  apiKey: "AIzaSyDZzj4QwsGSpJmXRiVjuqgAq-5YB9EoxrE",
  authDomain: "ezcal-2394a.firebaseapp.com",
  databaseURL: "https://ezcal-2394a.firebaseio.com",
  projectId: "ezcal-2394a",
  storageBucket: "ezcal-2394a.appspot.com",
  messagingSenderId: "1029216905931",
  appId: "1:1029216905931:web:33ccd473548edd99ecc94e"
};

firebase.initializeApp(firebaseConfig);

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};


function Main() {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path={window.location.pathname} component={Calendar} />
      </Switch>
    </main>
  );
}

const Home = () => (
  <div>
    {daygrid()}
  </div>
)

const Calendar = () => (
  <div>
    Hi, welcome to {window.location.pathname}!
    We can fetch the relevant data from firebase and show it here!
  </div>
  // On reaching this component, it means we aren't at root, and we're at a subdomain/directory
  // When we're doing it for real, we can either populate the contents of the calendar 
  // here or in useEffect, not sure what the best way is (or maybe in daygrid())
)

const setLink = () => {
  // Potentially do work to save schedule in firebase? :)
  var randNum = Math.floor(Math.random() * Math.floor(100));
  return window.location.href + randNum;
}

const day = () => {
  let day = new Date();
  let daysofweek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let dayarray = [];
  for (let i = 0; i < 7; i++) {
    dayarray[i] = daysofweek[(day.getDay() + i) % 7];
  }
  return dayarray;
};

const date = () => {
  let day = new Date();

  let datearray = [];

  for (let i = 0; i < 7; i++) {
    datearray[i] = day.getDate() + i;
  }

  return datearray;
}

const daygrid = () => {
  let days = day();
  let dates = date();

  let timeHours = Array(Math.ceil((24 - 9))).fill(9).map((x, y) => x + y);

  let minutes = [":00", ":15", ":30", ":45"];

  let subTimes = timeHours.flatMap(x => minutes.map(y => x + y));

  let times = subTimes.filter(x => x.split(":")[1] === "00");


  let timeBlock = subTimes.map(x => {
    return x.split(":")[1] == "00" ? <div className="dayTime">{x}</div> : <div className="dayTime"></div>;
  })

  let cal = []
  cal.push(<div className="dayCol">
    <div className="dayEmpty"></div>
    {timeBlock}
  </div>
  )

  for (let i = 0; i < days.length; i++) {
    let hours = []
    for (let j = 0; j < subTimes.length; j++) {
      hours.push(<div id={`${dates[i]} ${times[j]}`} className="dayHour" />)
    }

    cal.push(<div className="dayCol">
      <div className="dayHead">{days[i]}
        <div className="dayDate">{dates[i]}</div>
      </div>
      {hours}
    </div>)
  }

  return (
    <div className="dayWrapper">
      {cal}
    </div>
  );
};


const showEvents = () => {
  let googleEvents
  if (ApiCalendar.sign)
    ApiCalendar.listUpcomingEvents()
      .then(({ result }) => {
        googleEvents = result.items
        setBusy(googleEvents)
      });
};

const setBusy = (events) => {
  for (let i = 0; i < events.length; i++) {
    let date = events[i].start.dateTime.substring(8, 10);
    let startTime = events[i].start.dateTime.substring(11, 16);
    let endTime = events[i].end.dateTime.substring(11, 16);
    console.log(startTime);
    console.log(endTime);
    let startIndex = times.indexOf(startTime)
    let endIndex = times.indexOf(endTime)
    let event = document.getElementById(`${date} ${times[startIndex]}`)
    if (event === null) continue;
    for (let j = startIndex; j < endIndex; j++) {
      let nextEvent = document.getElementById(`${date} ${times[j]}`);
      nextEvent.className += "Busy";
    }
  }
}

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
    // If we're at root, we can show a generic calendar (maybe empty?)
    // Otherwise, fetch the relevant data from firebase?
  }, []);

  return (
    <div className="container">
      <button onClick={() => { ApiCalendar.handleAuthClick(); showEvents(); }}>Sync with Google</button>
      <LinkGenerator message={setLink()} />
      <Main />
    </div>
  )
};

export default App;