import React, { useState, useEffect} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "rbx/index.css";
import { Button, Container, Message, Title } from "rbx";
import ApiCalendar from 'react-google-calendar-api';
import { Switch, Route } from 'react-router-dom'
import "./App.css"
import LinkGenerator from "./LinkGenerator";
import data from './data/dummy.json'
import data2 from './data/silly.json'
import Addevents from "./addevents";


const times = ['9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00']

const events = Object.values(data);

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
        <Route exact path='/' component={Home}/>
        <Route path={window.location.pathname} component={Calendar}/>
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

const day = () =>{
  let day = new Date();
  let daysofweek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let dayarray =[];
  for (let i = 0; i < 7; i++)

  {
    dayarray[i] = daysofweek[(day.getDay() + i) % 7];
  }
  return dayarray;
};

const date = () => {
  let day= new Date();

  let datearray =[];

  for (let i=0;i<7;i++)
  {
    datearray[i] = day.getDate() + i;
  }

  return datearray;
}

const daygrid = () => {
  let days = day();
  let dates = date();
  let times = ['9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00']
  

  let timeBlock = times.map(x => {
      return <div className="dayTime">{x}</div>
  })

  let cal = []
  cal.push(<div className="dayCol">
            <div className="dayEmpty"></div>
              {timeBlock}
            </div>
  )
  for (let i = 0; i < days.length; i++) {
      let hours = []
      for (let j = 0; j<= 14; j++) {
        hours.push(<div id={`${days[i]} ${dates[i]} ${times[j]}`} className="dayHour"/>)
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

  const setBusy = () => {
    if (ApiCalendar.sign)
      ApiCalendar.listUpcomingEvents(1)
      .then(({result}) => {
        console.log(result.items);
    });

    for (let i = 0; i < events.length; i++) {
      let day = data[i].day;
      let date = data[i].date;
      let startIndex = times.indexOf(data[i].startTime)
      let endIndex = times.indexOf(data[i].endTime)
      let event = document.getElementById(`${day} ${date} ${times[startIndex]}`)

      if(event === null) continue;

      event.innerHTML = data[i].title;
      for(let j = startIndex; j<= endIndex; j++) {
        let nextEvent = document.getElementById(`${day} ${date} ${times[j]}`)
        nextEvent.className += "Busy"
      }

    }
  }

  const showEvents = () => {
    if (ApiCalendar.sign)
      ApiCalendar.listUpcomingEvents(7)
        .then(({result}) => {
          console.log(result.items);
        });
  };

const App = () =>  {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
    setBusy(); 
    // If we're at root, we can show a generic calendar (maybe empty?)
    // Otherwise, fetch the relevant data from firebase?
  }, []);

  return (
    <div className="container">
      <button onClick={() => {ApiCalendar.handleAuthClick(); showEvents();}}>Sync with Google</button>
      <LinkGenerator message={setLink()}/>
      <Main/>  
      <Addevents />
    </div>

  )
};

export default App;