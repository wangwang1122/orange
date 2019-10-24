import React, { Component } from 'react';
import ApiCalendar from "./ApiCalendar";
import { Switch, Route } from 'react-router-dom'
import "./App.css";
import LinkGenerator from "./LinkGenerator";
import {db} from './firebase';
import {subTimes, times} from './constants';
import Addevents from "./addevents";

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      uid: null,
      userName: null,
    }
  };

  componentDidMount = () => {
    const userLink = window.location.pathname.substring(1);
    if (userLink) {
      db.child(userLink).child("events").once('value', this.handleData, error => alert(error));
    }
  };

  handleData = (snap) => {
    if (snap.val()) {
      this.setBusy(Object.values(snap.val()));
    }
  };

  setLink = (uid) => {
    return window.location.href + uid;
  };

  buildDayList = () => {
    let date = new Date();
    let weekDays = ["Su", "M", "Tu", "W", "Th", "F", "Sa"];
    let dayList = [], dateList = [];

    for (let i = 0; i < 7; i++) {
      dayList.push(weekDays[(date.getDay() + i) % 7]);
      dateList.push(date.getDate() + i);
    }

    return [dayList, dateList];
  };

  dayGrid = () => {
    let [days, dates] = this.buildDayList();
    let timeBlock = subTimes.map(x => {
      return x.split(":")[1] === "00" ? <div className="dayTime">{x}</div> : <div className="dayTime"></div>;
    });

    let cal = [];
    cal.push(<div className="dayCol">
      <div className="dayEmpty"></div>
      {timeBlock}
    </div>
    );

    for (let i = 0; i < days.length; i++) {
      let hours = [];
      for (let j = 0; j < subTimes.length; j++) {
        if (times.includes(subTimes[j])) {
          hours.push(<div id={`${dates[i]} ${subTimes[j]}`} className="dayHour" />);
        } else {
          hours.push(<div id={`${dates[i]} ${subTimes[j]}`} className="daySubHour" />);
        }
      }

      cal.push(<div className="dayCol">
        <div className="dayHead">{days[i]}
          <div className="dayDate">{dates[i]}</div>
        </div>
        {hours}
      </div>);
    }

    return (
      <div className="dayWrapper">
        {cal}
      </div>
    );
  };

  showEvents = () => {
    let googleEvents;
    if (ApiCalendar.sign)
      ApiCalendar.listUpcomingEvents()
        .then(({ result }) => {
          googleEvents = result.items;
          this.setState({
            uid: ApiCalendar.getUserID(),
            userName: ApiCalendar.getUserName(),
          })
          db.child(this.state.uid).child('events').set(googleEvents);
          db.child(this.state.uid).child('userName').set(this.state.userName);
          this.setBusy(googleEvents);
        });
  };

  setBusy = (events) => {
    for (let i = 0; i < events.length; i++) {
      let date = events[i].start.dateTime.substring(8, 10);
      let startIndex = subTimes.indexOf(events[i].start.dateTime.substring(11, 16));
      let endIndex = subTimes.indexOf(events[i].end.dateTime.substring(11, 16));

      for (let j = startIndex; j < endIndex; j++) {
        let nextEvent = document.getElementById(`${date} ${subTimes[j]}`);
        if (nextEvent.className.includes("Busy")) {
          continue;
        }
        else {
          nextEvent.className += "Busy";
        }
      }
    }
  };

  SharedCalendar = () => {
    return (
      <div>
        {this.dayGrid()}
      </div>
    );
  };

  MyCalendar = () => {
    return (
      <div>
        {this.dayGrid()}
      </div>
    );
  };

  Main = () => {
    return (
      <Switch>
        <Route exact path='/' component={this.MyCalendar} />
        <Route path={window.location.pathname} component={this.SharedCalendar} />
      </Switch>
    );
  };

  render() {
    return (
      <div className="container">
        {this.state.uid ? <div>Welcome, {this.state.userName}!</div> : <button onClick={() => { ApiCalendar.handleAuthClick(); this.showEvents(); }}>Sync with Google</button>}
        {this.state.uid ? <LinkGenerator link={this.setLink(this.state.uid)} /> : null}
        {this.Main()}
        <Addevents />

      </div>
    );
  }
};
