import React from 'react'
import { Link } from 'react-router-dom'
import { BASE_URL, QUERY_PARAMS } from './constants'

// View the list of conversations with friends
// Conversations are displayed in descending order of their last timestamp
// Display a preview of each conversation (name, unread count, and last message time)

export default class MessagingClient extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      nameFilter: '',
      conversations: [],
    }
  }

  componentDidMount(){
    // returns a list of conversations which include name of the other party, and an ID.
    // You can use this ID to fetch the messages of a given conversation
    fetch(`${BASE_URL}/conversations${QUERY_PARAMS}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        const conversations = response.data.sort((a,b) => {
          return new Date(b.last_message.created_at) - new Date(a.last_message.created_at);
        });
        this.setState({ conversations });
      });
  }

  handleChange = (event) => {
    this.setState({ nameFilter: event.target.value });
  }

  render(){
    let {conversations, nameFilter} = this.state;

    return (
      <div>
        <form className="friend-filter">
          <label>
            <h4>Friend Filter:</h4>
            <input type="text" value={nameFilter} onChange={this.handleChange} />
          </label>
        </form>

        <div className="conversation-list">
          {conversations.filter(convo => convo.name.match(new RegExp(`${nameFilter}`, 'i', 'g'))).map(convo => {
            let { name, unread, last_message, uuid } = convo;
            let { created_at, direction } = last_message;

            return (
              <div key={uuid} className={direction==='incoming' ? 'respondCTO': ''}>
                <Link to={{ pathname: `/conversation/${uuid}` }}>
                  <div className="message-preview">
                    <p>
                      With: {name}
                    </p>
                    <p>
                      Unread: {unread}
                    </p>
                    <h5>
                      Last Message: {new Date(created_at).toString()}
                    </h5>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}