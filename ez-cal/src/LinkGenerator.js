import React, { useState, Component} from "react";
import Popup from "reactjs-popup";
import PropTypes from 'prop-types'
import "./index.css";
import {Card,Content, Message, Delete} from "rbx";

const copyCode = (message) => {
  const x = document.createElement('textarea');
  x.value = message;
  document.body.appendChild(x);
  x.select();
  document.execCommand('copy');
  document.body.removeChild(x);
}

const Linkgenerator= ({ message } ) => {

  const [copied, setCopied] = useState("Copy"); 

  return(
    <Popup trigger={open => (<button className="sendInvite">{open ? "" : setCopied("Copy")}</button>)} modal>
      {close => (
          <div>    
            <Card>
              <Message.Header>
                <p></p>
                <Delete as="button"
                onClick={() => {
                    close();
                    setCopied("Copy");
                  }} />
              </Message.Header>
              <Card.Content>
                <Content textAlign='centered'>
                  {message}
                </Content>
              </Card.Content>
              <Card.Footer>
                <Card.Footer.Item 
                  textAlign='centered'
                  as="a" 
                  href="#" 
                  onClick={() => {
                    copyCode(message);
                    setCopied("Copied!");
                  }}> 
                  {copied}
                </Card.Footer.Item>
              </Card.Footer>
            </Card>
          </div>
        )}
    </Popup>
// {/* <Popup
//     trigger={open => (
//       <button className="button">Trigger - {open ? "Opened" : "Closed"}</button>
//     )}
//     position="right center"
//     closeOnDocumentClick
//   >
//     <span> Popup content </span>
//   </Popup> */}
    
    )
};


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