import React from "react";
import "./index.css";


class Addevents extends React.Component {
  constructor(props) {
    super(props);
    var datePH = (new Date().toISOString().substring(0, 11));
    console.log(datePH)
    this.state = {
      show: false,
      event: '',
      starttime: datePH+'12:00',
      endtime: datePH+'13:00',
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
    let newStart = eventa.target.value
    this.setState({
      starttime: newStart
    })
  }

  handleEndtime(eventa) {
    let newEnd = eventa.target.value
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
    this.props.createEvent(this.state.event, this.state.starttime + ":00", this.state.endtime + ":00");
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