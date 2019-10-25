import {db} from './firebase';
import {subTimes, times} from './constants';
import App from './App'
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import LinkGenerator from "./LinkGenerator";

const Config = require("./data/apiGoogleconfig.json");

export default class ApiCalendar extends Component  {

    static propTypes = {
        uid: null,
        name: null
    }
    constructor(props) {
        super(props);
        this.state = {
          uid: null,
          userName: null,
        }
        this.sign = false;
        this.gapi = null;
        this.onLoadCallback = null;
        this.calendar = 'primary';
        try {
            this.updateSigninStatus = this.updateSigninStatus.bind(this);
            this.initClient = this.initClient.bind(this);
            this.handleSignoutClick = this.handleSignoutClick.bind(this);
            this.handleAuthClick = this.handleAuthClick.bind(this);
            this.createEvent = this.createEvent.bind(this);
            this.listUpcomingEvents = this.listUpcomingEvents.bind(this);
            this.createEventFromNow = this.createEventFromNow.bind(this);
            this.listenSign = this.listenSign.bind(this);
            this.onLoad = this.onLoad.bind(this);
            this.setCalendar = this.setCalendar.bind(this);
            this.handleClientLoad();
        }
        catch (e) {
            console.log(e);
        }
    }
    componentDidMount = () => {
        const userLink = window.location.pathname.substring(1);
        if (userLink) {
          db.child(userLink).child("events").once('value', this.handleData, error => alert(error));
        }
    };

    handleData = (snap) => {
        if (snap.val()) {
          this.setBusy2(Object.values(snap.val()));
        }
    };
    /**
     * Update connection status.
     * @param {boolean} isSignedIn
     */

    setLink = (uid) => {
        return window.location.href + uid;
    };

    showEvents = () => {
        let googleEvents;
        if (this.sign)
          this.listUpcomingEvents()
            .then(({ result }) => {
              googleEvents = result.items;
            this.setState({
                uid: this.getUserID(),
                userName: this.getUserName(),
            })
             db.child(this.getUserID()).child('events').set(googleEvents);
             db.child(this.getUserID()).child('userName').set(this.getUserName());
              this.setBusy(googleEvents);
            });
      };
    
      setBusy = (events) => {
        const userLink = window.location.pathname.substring(1);
        if (!userLink) {
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
        }
        else if (userLink && this.state.uid) {
            for (let i = 0; i < events.length; i++) {
              let date = events[i].start.dateTime.substring(8, 10);
              let startIndex = subTimes.indexOf(events[i].start.dateTime.substring(11, 16));
              let endIndex = subTimes.indexOf(events[i].end.dateTime.substring(11, 16));
        
              for (let j = startIndex; j < endIndex; j++) {
                let nextEvent = document.getElementById(`${date} ${subTimes[j]}`);
                if (nextEvent.className.includes("FriendBusy")) {
                    if (nextEvent.className.includes("Sub")) {
                        nextEvent.className = "daySubHourOverlapBusy"
                    } else {
                        nextEvent.className = "dayHourOverlapBusy"
                    }
                }
                else {
                  nextEvent.className += "Busy";
                }
              }
            }               
        }

      };

      setBusy2 = (events) => {
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
                  nextEvent.className += "FriendBusy";
                }
              }
            } 
      }

    setFree = () => {
        // for (let i = 0; i < events.length; i++) {
        //   let date = events[i].start.dateTime.substring(8, 10);
        //   let startIndex = subTimes.indexOf(events[i].start.dateTime.substring(11, 16));
        //   let endIndex = subTimes.indexOf(events[i].end.dateTime.substring(11, 16));
    
        //   for (let j = startIndex; j < endIndex; j++) {
        //     let nextEvent = document.getElementById(`${date} ${subTimes[j]}`);
        //     if (nextEvent.className.includes("Busy")) {
        //       continue;
        //     }
        //     else {
        //       nextEvent.className += "Busy";
        //     }
        //   }
        // }
        let x;
        while (document.getElementsByClassName("dayHourBusy").length > 0) {
            x = document.getElementsByClassName("dayHourBusy")[0]
            x.className = "dayHour"
        }
        let y;
        while (document.getElementsByClassName("daySubHourBusy").length > 0) {
            y = document.getElementsByClassName("daySubHourBusy")[0]
            y.className = "daySubHour"
        }
        let a;
        while (document.getElementsByClassName("dayHourFriendBusy").length > 0) {
            a = document.getElementsByClassName("dayHourFriendBusy")[0]
            a.className = "dayHour"
        }
        let b;
        while (document.getElementsByClassName("daySubHourFriendBusy").length > 0) {
            b = document.getElementsByClassName("daySubHourFriendBusy")[0]
            b.className = "daySubHour"
        }
        let c;
        while (document.getElementsByClassName("daySubHourOverlapBusy").length > 0) {
            c = document.getElementsByClassName("daySubHourOverlapBusy")[0]
            c.className = "dayHour"
        }
        let d;
        while (document.getElementsByClassName("dayHourOverlapBusy").length > 0) {
            d = document.getElementsByClassName("dayHourOverlapBusy")[0]
            d.className = "daySubHour"
        }                
        // var y=document.getElementsByClassName("daySubHourBusy");
        // console.log(y);
        // var j;
        // for(j=0;j<y.length;j++){
        //     y[j].className="daySubHour"
        // }
        
      };
    

    updateSigninStatus(isSignedIn) {
        this.sign = isSignedIn;
        if(this.getUserID()){
            this.showEvents();
        }

    }
    /**
     * Auth to the google Api.
     */
    initClient() {
        this.gapi = window['gapi'];
        this.gapi.client.init(Config)
            .then(() => {
            // Listen for sign-in state changes.
            this.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus);
            // Handle the initial sign-in state.
            this.updateSigninStatus(this.gapi.auth2.getAuthInstance().isSignedIn.get());
            if (this.onLoadCallback) {
                this.onLoadCallback();
            }
        })
            .catch((e) => {
            console.log(e);
        });
    }
    /**
     * Init Google Api
     * And create gapi in global
     */
    handleClientLoad() {
        this.gapi = window['gapi'];
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/api.js";
        document.body.appendChild(script);
        script.onload = () => {
            window['gapi'].load('client:auth2', this.initClient);
        };
    }
    getUserID() {
        //console.log(this.gapi.auth2.getAuthInstance().currentUser['Ab']['El']);
        return this.gapi.auth2.getAuthInstance().currentUser['Ab']['El'];
    }

    getUserName() {
        //console.log(this.gapi.auth2.getAuthInstance().currentUser['Ab']['El']);
        return this.gapi.auth2.getAuthInstance().currentUser['Ab']['w3']['ig'];
    }
    /**
     * Sign in Google user account
     */
    handleAuthClick() {
        if (this.gapi) {
            this.gapi.auth2.getAuthInstance().signIn();
        }
        else {
            console.log("Error: this.gapi not loaded");
        }
    }
    /**
     * Set the default attribute calendar
     * @param {string} newCalendar
     */
    setCalendar(newCalendar) {
        this.calendar = newCalendar;
    }
    /**
     * Execute the callback function when a user is disconnected or connected with the sign status.
     * @param callback
     */
    listenSign(callback) {
        if (this.gapi) {
            this.gapi.auth2.getAuthInstance().isSignedIn.listen(callback);
        }
        else {
            console.log("Error: this.gapi not loaded");
        }
    }
    /**
     * Execute the callback function when gapi is loaded
     * @param callback
     */
    onLoad(callback) {
        if (this.gapi) {
            callback();
        }
        else {
            this.onLoadCallback = callback;
        }
    }
    /**
     * Sign out user google account
     */
    handleSignoutClick() {
        if (this.gapi) {
            this.gapi.auth2.getAuthInstance().signOut();
            this.setFree();
            const userLink = window.location.pathname.substring(1);
            if (userLink) {
              db.child(userLink).child("events").once('value', this.handleData, error => alert(error));
            }
        }
        else {
            console.log("Error: this.gapi not loaded");
        }
    }
    /**
     * List all events in the calendar
     * @param {number} maxResults to see
     * @param {string} calendarId to see by default use the calendar attribute
     * @returns {any}
     */
    listUpcomingEvents(calendarId = this.calendar) {
        if (this.gapi) {
            let d = new Date();
            d.setDate(d.getDate() + 6); 
            return this.gapi.client.calendar.events.list({
                'calendarId': calendarId,
                'timeMin': (new Date()).toISOString(),
                'timeMax': d.toISOString(),
                'showDeleted': false,
                'singleEvents': true,
                //'maxResults': maxResults,
                'orderBy': 'startTime'
            });
        }
        else {
            console.log("Error: this.gapi not loaded");
            return false;
        }
    }
    /**
     * Create an event from the current time for a certain period
     * @param {number} time in minutes for the event
     * @param {string} summary of the event
     * @param {string} description of the event
     * @param {string} calendarId
     * @returns {any}
     */
    createEventFromNow({ time, summary, description = '' }, calendarId = this.calendar) {
        const event = {
            summary,
            description,
            start: {
                dateTime: (new Date()).toISOString(),
                timeZone: "Europe/Paris",
            },
            end: {
                dateTime: (new Date(new Date().getTime() + time * 60000)),
                timeZone: "Europe/Paris",
            }
        };
        return this.gapi.client.calendar.events.insert({
            'calendarId': calendarId,
            'resource': event,
        });
    }
    /**
     * Create Calendar event
     * @param {string} calendarId for the event.
     * @param {object} event with start and end dateTime
     * @returns {any}
     */
    createEvent(event, calendarId = this.calendar) {
        return this.gapi.client.calendar.events.insert({
            'calendarId': calendarId,
            'resource': event,
        });
    }

      Login = () => {
        this.handleAuthClick();
      }

      Logout= () => {
        this.handleSignoutClick();
        this.setState({ 
          uid: null,
          userName: null,
        })
      }

    render () {

        return (
            <div>
                    {this.state.uid ? <button onClick={()=> this.Logout() }>Sign out</button> : null}

                    {this.state.uid ? <div>Welcome, {this.state.userName}!</div> : <button onClick={() => { this.Login()  }}>Sync with Google</button>}
                    {this.state.uid ? <LinkGenerator link={this.setLink(this.state.uid)} /> : null}

            </div>
            )
    }
}
let apiCalendar;
try {
    apiCalendar = new ApiCalendar();
}
catch (e) {
    console.log(e);
}
