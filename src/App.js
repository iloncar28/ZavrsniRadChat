import logo from './logo.svg';
import './App.css';
import Messages from'./Msg.js';
import Input from "./Input"
import React from "react";

function randomName() {
  const ime = ["Ivan", "Ana", "Maja", "Marko", "Bob", "Rina", "Josip", "Nina", "Hella", "Ivana", "Elizabeta", "Tina", "Domagoj", "Mario", "Deni", "Zvonko", "Lucija", "Anita", "Tonka", "Antonija", "Andrea", "Johnny", "Luka", "Robi", "Matea", "Tihana", "Sara", "Drazen", "Lucijan"];
  const prezime = ["Planina", "Rijeka", "Bosna", "Jezero", "Kisa", "Plac", "Ananas", "Banana", "Kamen", "Oko", "Plato", "Knjiga", "Bezimena", "Vrecica", "Kola", "Majoneza", "Prezime", "Tanjur", "Kuna", "Gopro", "Mobitel", "Rukav", "Trenirka", "Kifla", "Maramice", "Grm", "Ograda", "Ruža", "Youtube", "Google"];
  const randomIme = ime[Math.floor(Math.random() * ime.length)];
  const randomPrezime = prezime[Math.floor(Math.random() * prezime.length)];
  return randomIme + " " + randomPrezime;
};

function randomColor() {
  return '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
};

/* Channel ID: XXmJILGbbv3nhcCM 
kako ovo stavit u .gitignore... nikak da proradi */

class App extends React.Component{
  constructor() {
    super();
    this.drone = new window.Scaledrone("XXmJILGbbv3nhcCM", {
      data: this.state.member
    });

    this.drone.on('open', error => {
      if (error) {
        return console.error(error);
      }
      const member = {...this.state.member};
      member.id = this.drone.clientId;
      this.setState({member});
    });

    const room = this.drone.subscribe("observable-pricaona");
    room.on('data', (data, member) => {
      const messages = this.state.messages;
      messages.push({member, text: data});
      this.setState({messages});
    });

  }

  state = {
    messages: [],
    member: {
      username: randomName(),
      color: randomColor()
    }
  }


onSendMessage = (message) => {
  this.drone.publish({
    room: "observable-pricaona",
    message
  });
}
  render(){
    return (
      <div className="App">
      <div className="App-header">
        <h1>Pricaona</h1>
      </div>
      <Messages
        messages={this.state.messages}
        currentMember={this.state.member}
      />
      <Input
        onSendMessage={this.onSendMessage}
      />
    </div>
    );
  }

}


export default App;
