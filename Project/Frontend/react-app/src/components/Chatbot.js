import React, { Component } from 'react';
import ReactObserver from 'react-event-observer';
import {
  Widget,
  BOT_MESSAGE_RECEIVED,
  CHAT_OPENED,
  CHAT_CLOSED
} from 'rasa-webchat-josh';

class Chatbot extends Component {
  constructor(props) {
    super(props);
    this.observer = ReactObserver();
    this.initializeListeners();
  }

  initializeListeners() {
    this.msgAddListener = this.observer.subscribe(BOT_MESSAGE_RECEIVED, (data) => {
    });
    this.chatOpened = this.observer.subscribe(CHAT_OPENED, (data) => {
    });
    this.chatClosed = this.observer.subscribe(CHAT_CLOSED, (data) => {
    });
  }

  render() {
    return (
      <div id="webchat" style={{
        zIndex: "10",
        width: "300px"
      }}>
        <Widget
          interval={1000}
          key={"#webchat"}
          initPayload={"/greet"}
          socketUrl={"http://localhost:5005"}
          socketPath={"/socket.io/"}
          title={"Demo Chatbot"}
          inputTextFieldHint={"Type a message..."}
          connectingText={"Waiting for server..."}
          embedded={false}
          openLauncherImage="/img/chatbot/bot.png"
          closeLauncherImage="/img/chatbot/bot.png"
          observer={this.observer}
          params={{
            images: {
              dims: {
                width: 300,
                height: 200
              }
            },
            storage: "session"
          }}
        />
      </div>
    )
  }
}

export default Chatbot
