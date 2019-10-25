import React, { Component } from 'react';
import ApiCalendar from "./ApiCalendar";
import { Switch, Route } from 'react-router-dom'
import "./App.css";
import {db} from './firebase';
import {subTimes, times} from './constants';
import Addevents from "./addevents";


export default class App extends Component {

  constructor(props) {
    super(props);
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
        <ApiCalendar/>

        {this.Main()}
        <Addevents />

      </div>
    );
  }
};
