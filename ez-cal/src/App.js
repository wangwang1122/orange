import React, { useState, useEffect} from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "rbx/index.css";
import { Button, Container, Message, Title, Column } from "rbx";
import ApiCalendar from 'react-google-calendar-api';

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
  console.log(dayarray);
  return dayarray.map(x => 
    <li>{x}</li>
  )
};

const App = () =>  {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  return (
    // <React.Fragment>
    //   <Button onClick={() => ApiCalendar.handleAuthClick()}>lol</Button>
    //   <Button onClick={() => showEvents()}>lmao</Button>
    // </React.Fragment>
    // <div> {day()}</div>
    <Column.Group breakpoint="mobile">
  {day().map(i => (
    <Column key={i}>
        {i}
    </Column>
  ))}
</Column.Group>

  )
};

export default App;