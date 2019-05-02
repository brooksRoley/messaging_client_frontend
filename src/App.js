import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import MessagingClient from './components/MessagingClient'
import Conversation from './components/Conversation'

// Build a functional, standalone React app that displays a set of conversations.
// Each conversation has a series of messages between two parties.
// Assume the person viewing the app is one of the participants in each conversation
// but don't worry about supporting multiple users
function App() {
  return (
    <div className="App">

        <Router>
          <div>

            <Route exact path="/" component={MessagingClient} />
            <Route path={`/conversation/:convoId`} component={Conversation} />

          </div>
        </Router>

    </div>
  );
}

export default App;
