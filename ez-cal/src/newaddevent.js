import React from "react";
import "./index.css";


class Addevents extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      event: '',
      starttime: '2019-11-04T12:00:00',
      endtime: '2019-11-04T13:00:00',
    };
    this.handleEvent = this.handleEvent.bind(this);
    this.handleStarttime = this.handleStarttime.bind(this);
    this.handleEndtime = this.handleEndtime.bind(this);
    this.upload = this.upload.bind(this);
  }
  handleEvent(eventa) {
    this.setState({
      event: eventa.target.value
    })
  }

  handleStarttime(eventa) {
    let newStart = eventa.target.value + ":00"
    this.setState({
      starttime: newStart
    })
  }

  handleEndtime(eventa) {
    let newEnd = eventa.target.value + ":00"
    this.setState({
      endtime: newEnd
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