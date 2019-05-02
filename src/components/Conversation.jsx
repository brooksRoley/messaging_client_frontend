import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom'
import { BASE_URL, QUERY_PARAMS } from './constants'
import uuidv1 from 'uuid/v1';

// View the messages of a selected conversation in-order
// Incoming vs outgoing messages must be visually distinct
// Compose a new message and have it appear in the interface
// Refreshing the page should remain viewing that conversation when the page reloads

export default class Conversation extends React.Component {

  constructor(props) {
    super(props)
    const uuid = _.get(props, ['match', 'params', 'convoId'], "default");
    this.state = {
      uuid,
      messages: [],
      newMessage: '',
    }
  }

  componentDidMount() {
    let { uuid } = this.state;
    fetch(`${BASE_URL}/conversations/${uuid}${QUERY_PARAMS}`)
      .then((response) => {
        return response.json();
      })
      .then((conversation) => {
        let data = conversation.data || {};
        let messages = data.messages || [];
        this.setState({ messages });
      });
  }

  handleResponseField = (e) => {
    this.setState({newMessage: e.target.value});
  }

  handleResponseSubmit = (e) => {
    e.preventDefault();
    let {messages, newMessage} =  this.state

    if(newMessage !== ''){
      messages.push({
        uuid: uuidv1(), // ⇨ '3b99e3e0-7598-11e8-90be-95472fb3ecbd'
        body: newMessage,
        direction: "outgoing",
        created_at: new Date().toISOString(),
      })
      this.setState({ messages, newMessage: '' });
    }
  }

  render() {
    let { messages, uuid, newMessage } = this.state;
    if(!!!uuid){
      return <p>Incorrect Conversation ID</p>
    }
    if(messages.length === 0){
      return <p>No message history; Loading</p>;
    }

    return (
      <div>
        <div className="conversation">

          <button>
            <Link to='/'>Back</Link>
          </button>

          <h2>Conversation:</h2>
          {messages.map(m => {
            return <div key={m.uuid} className={ m.direction === 'incoming' ? 'incoming' : 'outgoing' }>{m.body}</div>;
          })}

        </div>
        <form  onSubmit={this.handleResponseSubmit} className="response-field">
          <input type="text"
                 value={newMessage}
                 onChange={this.handleResponseField}
          />
          <input type="submit" value="Send" />
        </form>
      </div>
    )
  }

}