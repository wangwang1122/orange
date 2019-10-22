import React, { Component } from "react";
import PropTypes from 'prop-types'

export default class LinkGenerator extends Component {

  static propTypes = {
    link: PropTypes.string
  }

  constructor(props) {
    super(props);
    this.state = {
      show: false,
      copied: 'Copy',
    }
  }

  copyCode = () => {
      const x = document.createElement('textarea');
      x.value = this.props.link
      document.body.appendChild(x);
      x.select();
      document.execCommand('copy');
      document.body.removeChild(x);
      this.setState({
        copied: 'Copied!'
      })
      return;
    }

    open = () => {
      this.setState ({
        show: true
      })
    }

    close =() => {
      this.setState({
        show: false,
        copied: 'Copy'
      })
    }




  render() {

    return (

      <div>
        <button onClick={this.open} className="sendInvite"/>
        {this.state.show ? 

          <div className="modalBackdrop">
            <div className="modalContainer">
                <div className="closeButtonWrapper">
                  <button onClick={this.close} className="closeButton"/>
                  <div>{this.props.link}</div>
                  <button onClick={this.copyCode} className="copyButton">{this.state.copied}</button>
                </div>
            </div>
          </div> 
          : null}
      </div>
      )


  }

}