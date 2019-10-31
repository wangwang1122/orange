import React, { Component } from 'react';
import ApiCalendar from "./ApiCalendar";
import { Switch, Route } from 'react-router-dom'
import "./App.css";
import {db} from './firebase';
import {subTimes, times} from './constants';


export default class App extends Component {

  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div className="container">
        <ApiCalendar/>
      </div>
    );
  }
};
