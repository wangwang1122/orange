import React, { Component } from "react";
import PropTypes from 'prop-types'

export default class AddEvent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      event: '',
      starttime: '2019-11-01T10:00:00',
      endtime: '2019-11-01T17:00:00',
      description: '',
    }
  }

    open = () => {
      this.setState ({
        show: true
      })
    }

    close =() => {
      this.setState({
        show: false,
      })
    }

    upload(){
        console.log(this.state.starttime);
      this.props.createEvent(this.state.event,this.state.starttime,this.state.endtime);

    }




  render() {

    return (

      <div>
        <button onClick={this.open} className="addEvent"/>
        {this.state.show ? 

          <div className="modalBackdrop">
            <div className="modalContainer">
                <div className="closeButtonWrapper">
                  <button onClick={this.close} className="closeButton"/>
                  <div>{this.props.link}</div>
                  <button onClick={this.upload} className="copyButton">Create Event</button>
                </div>
            </div>
          </div> 
          : null}
      </div>
      )


  }

}