import React, { useState, useEffect} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "rbx/index.css";
import { Button, Container, Message, Title, Column } from "rbx";
import ApiCalendar from 'react-google-calendar-api';
import "./App.css"
import data from './data/dummy.json'

const times = ['9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00']

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

const Welcome = ({ user }) => (
  <Message color="info">
    <Message.Header>
      Welcome, {user.displayName}
      <Button primary onClick={() => {firebase.auth().signOut(); ApiCalendar.handleSignoutClick();}}>
        Log out
      </Button>
    </Message.Header>
  </Message>
);

const SignIn = () => (
  <StyledFirebaseAuth 
    uiConfig={uiConfig}
    firebaseAuth={firebase.auth()}
  />
);

// TODO fix this
const Banner = ({ user }) => (
  <React.Fragment>
    { user ? <Welcome user={ user } /> : <SignIn /> }
  </React.Fragment>
);

const showEvents = () => {
  if (ApiCalendar.sign)
    ApiCalendar.listUpcomingEvents(1)
      .then(({result}) => {
        console.log(result.items);
      });
};
const day= () =>{
  let day= new Date();
  let daysofweek= ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  let dayarray=[];
  for (let i=0;i<7;i++)
  {
    dayarray[i]=daysofweek[(day.getDay()+i)%7];
  }
  return dayarray
};

const daygrid = () => {
  let days = day();
  let times = ['9:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00','22:00','23:00']
  

  let timeBlock = times.map(x => {
      return <div className="dayHour">{x}</div>
  })

  let cal = []
  cal.push(<div className="dayCol">
            <div className="dayHead"></div>
              {timeBlock}
            </div>
  )
  for (let i = 0; i < days.length; i++) {
      let hours = []
      for (let j = 0; j<= 14; j++) {
        hours.push(<div id={`${days[i]} ${times[j]}`} className="dayHour"/>)
      }

        cal.push(<div className="dayCol">
            <div className="dayHead">{days[i]}</div>
              {hours}
            </div>)

  }

  return (<div className="dayWrapper">
            {cal}
          </div>);
}

  const setBusy = () => {
    for (let i = 0; i < Object.values(data).length; i++) {
      let day= data[i].day;
      let startIndex = times.indexOf(data[i].startTime)
      let endIndex = times.indexOf(data[i].endTime)
      for(let j = startIndex; j<= endIndex; j++) {
        let nextEvent = document.getElementById(`${day} ${times[j]}`)
        nextEvent.className += "Busy"
      }

    }
  }

const App = () =>  {
  const [user, setUser] = useState(null);


  
  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
    setBusy();
  }, []);

  return (
    // <React.Fragment>
    //   <Button onClick={() => ApiCalendar.handleAuthClick()}>lol</Button>
    //   <Button onClick={() => showEvents()}>lmao</Button>
    // </React.Fragment>
    // <div> {day()}</div>
    <div> {daygrid()}</div>

  )
};

export default App;