import React, { useState } from "react";
import Popup from "reactjs-popup";
import "./index.css";
import { Delete, Field, Label, Button, Control, FontAwesomeIcon } from "rbx";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


class Addevents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      event: '',
      starttime: '2019-11-01T10:00:00',
      endtime: '2019-11-01T17:00:00',
      description: 'aa',
    };
    this.handleEvent = this.handleEvent.bind(this);
    this.handleStarttime = this.handleStarttime.bind(this);
    this.handleEndtime = this.handleEndtime.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.upload = this.upload.bind(this);
  }
  handleEvent(eventa) {
    this.setState({
      event: eventa.target.value
    })
  }
  handleStarttime(eventa) {
    this.setState({
      starttime: eventa.target.value + ":00"
    })
  }
  handleEndtime(eventa) {
    this.setState({
      endtime: eventa.target.value + ":00"
    })
  }
  handleDescription(eventa) {
    this.setState({
      description: eventa.target.value
    })
  }

  open = () => {
    this.setState({
      show: true
    })
  }

  close = () => {
    this.setState({
      show: false,
    })
  }

  upload() {
    this.props.createEvent(this.state.event, this.state.starttime, this.state.endtime);
  }


  render() {
    return (

      <div>
        <button onClick={this.open} className="addEvent" />
        {this.state.show ?

          <div className="modalBackdropAdd">
            <div className="modalContainerAdd">
              <div className="closeButtonWrapper">
                <button onClick={this.close} className="closeButton" />
                <div>
                  <div>Event Title:</div>
                  <input type="text" onChange={this.handleEvent} />
                  <div>Start Time:</div>
                  <input type="datetime-local" value={this.state.starttime} onChange={this.handleStarttime} />
                  <div>End Time:</div>
                  <input type="datetime-local" value={this.state.endtime} onChange={this.handleEndtime} />
                </div>
                <button onClick={this.upload} className="copyButton">Create Event</button>
              </div>
            </div>
          </div>
          : null}
      </div>
    )
  }
}

export default Addevents;