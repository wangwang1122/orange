import React, { Component } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "rbx/index.css";
import { Button, Container, Message, Title } from "rbx";
import ApiCalendar from "./ApiCalendar";
import { Switch, Route } from 'react-router-dom'
import "./App.css"
import LinkGenerator from "./LinkGenerator";
import data from './data/dummy.json'
import data2 from './data/silly.json'

const timeHours = Array(Math.ceil((24 - 9))).fill(9).map((x, y) => x + y);

const minutes = [":00", ":15", ":30", ":45"];

const subTimes = timeHours.flatMap(x => minutes.map(y => x + y));

const times = subTimes.filter(x => x.split(":")[1] === "00");


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
const db = firebase.database().ref("users");

const uiConfig = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

export default class App extends Component {


constructor(props) {
  super(props);
  this.state = {
    uid: null
  }
}


setLink = (uid) => {
  // Potentially do work to save schedule in firebase? :)
  return window.location.href + uid;
}

day = () => {
  let day = new Date();
  let daysofweek = ["Su", "M", "Tu", "W", "Th", "F", "Sa"];
  let dayarray = [];
  for (let i = 0; i < 7; i++) {
    dayarray[i] = daysofweek[(day.getDay() + i) % 7];
  }
  return dayarray;
};

date = () => {
  let day = new Date();

  let datearray = [];

  for (let i = 0; i < 7; i++) {
    datearray[i] = day.getDate() + i;
  }

  return datearray;
}

daygrid = () => {
  let days = this.day();
  let dates = this.date();
  let timeBlock = subTimes.map(x => {
    return x.split(":")[1] === "00" ? <div className="dayTime">{x}</div> : <div className="dayTime"></div>;
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
      if (times.includes(subTimes[j])) {
        hours.push(<div id={`${dates[i]} ${subTimes[j]}`} className="dayHour" />)         
      } else {
         hours.push(<div id={`${dates[i]} ${subTimes[j]}`} className="daySubHour" />)        
      }
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


showEvents = () => {
  let googleEvents
  if (ApiCalendar.sign)
    ApiCalendar.listUpcomingEvents()
      .then(({ result }) => {
        this.setState({
          uid: ApiCalendar.getUserID()
        })
        googleEvents = result.items
        db.child(this.state.uid).set(googleEvents)
        this.setBusy(googleEvents)
      });
};

setBusy = (events) => {
  for (let i = 0; i < events.length; i++) {
    let date = events[i].start.dateTime.substring(8, 10);
    let startTime = events[i].start.dateTime.substring(11, 16);
    let endTime = events[i].end.dateTime.substring(11, 16);
    let startIndex = subTimes.indexOf(startTime);
    let endIndex = subTimes.indexOf(endTime);
    let event = document.getElementById(`${date} ${subTimes[startIndex]}`);
    if (event === null) continue;
    for (let j = startIndex; j < endIndex; j++) {
      let nextEvent = document.getElementById(`${date} ${subTimes[j]}`);
      nextEvent.className += "Busy";
    }
  }
}

Calendar = () => (
  <div>
    Hi, welcome to {window.location.pathname}!
    We can fetch the relevant data from firebase and show it here!
  </div>
  // On reaching this component, it means we aren't at root, and we're at a subdomain/directory
  // When we're doing it for real, we can either populate the contents of the calendar 
  // here or in useEffect, not sure what the best way is (or maybe in daygrid())
)

Home = () => (
  <div>
    {this.daygrid()}
  </div>
)

Main = () => {
  return (
    <main>
      <Switch>
        <Route exact path='/' component={this.Home} />
        <Route path={window.location.pathname} component={this.Calendar} />
      </Switch>
    </main>
  );
}





  render() {
  


        return (
          <div className="container">
            {this.state.uid ? <div>Welcome, {ApiCalendar.getUserName()}!</div> : <button onClick={() => {ApiCalendar.handleAuthClick(); this.showEvents();}}>Sync with Google</button>}
            {this.state.uid ? <LinkGenerator link={this.setLink(this.state.uid)}/> : null}
            {this.Main()}  
          </div>
        )




  }



}
