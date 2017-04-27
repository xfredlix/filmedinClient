import React from 'react';
import ThreadReplyForm from './ThreadReplyForm';
import helpers from '../lib/helpers';

class Thread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      threadMessages: this.props.threadMessages,
      currentTopicID: this.props.currentTopicID,
      currentThreadName: '',
      imageUrl: this.props.profile.imageUrl
    }
    this.getMessages = this.getMessages.bind(this);
    this.getCurrentTopic = this.getCurrentTopic.bind(this);
  }

  componentDidMount() {
    this.getMessages();
    this.getCurrentTopic();
  }

  getCurrentTopic() {
    helpers.getTopicByTopicID(this.state.currentTopicID)
      .then(resp => {
        this.setState({ currentThreadName: resp.data[0].topic })
      })
      .catch(err => {

      })
  }

  getMessages() {
    helpers.getMessagesByTopicID(this.state.currentTopicID)
      .then(resp => {
        var data = resp.data;
        return data;
      })
      .then(data => {
        this.setState({
          threadMessages: data
        });
      })
      .catch(err => {
        console.log('Error: ', err);
      })
  }

  render() {
    console.log('this state threadmessage', this.state.threadMessages);
    var messages = this.state.threadMessages.map((message, i) => {
      var {dateAmerican, dateWords, timeWithTimeZone } = helpers.timestampParser(message.createdAt);
        if (i === 0) {
          return (
            <div className="user-home-feed">
              <div className="col-md-3"></div>
              <div className="col-md-9">{dateWords + ' @ ' + timeWithTimeZone}</span></div>
              <div className="col-md-3">{message.username}
                <div className="col-md-3">
                  <img className='profilePictureThread' src={message.imageUrl} />
                </div>

              </div>
              <div className="col-md-9">{message.message}</div>

          </div>
          )
        } else {
        return (
          <div className="user-home-feed">
            <div className="col-md-3"></div>
            <div className="col-md-9">RE: { this.state.currentThreadName }<span style={{ 'float': 'right' }}>{dateWords + ' @ ' + timeWithTimeZone}</span></div>
            <div className="col-md-3">{message.username}
              <div className="col-md-3">
                  <img className='profilePictureThread' src={message.imageUrl} />
               </div>

            </div>
            <div className="col-md-9">{message.message}</div>
          </div>
        )
      }
    })
    return (
      <div className="container">
        <button
          onClick={this.props.setShowThreadListView}
          className="btn btn-default"
        >
          Back to List
        </button>
        <div>
            { messages }
          <div className="container">
            <ThreadReplyForm
              topicID={this.props.threadMessages[0].topicID}
              userID={this.props.userID}
              getMessages={this.getMessages}
              setShowThreadView={this.props.setShowThreadView}
            />
          </div>
        </div>
      </div>
    )

  }
}

Thread.propTypes = {
  userID: React.PropTypes.number.isRequired,
  currentTopicID: React.PropTypes.number.isRequired,
  threadMessages: React.PropTypes.array.isRequired,
  setShowThreadListView: React.PropTypes.func.isRequired
}

export default Thread;
    // return (
    //   <div>
    //     <button
    //       onClick={this.props.setShowThreadListView}
    //       className="btn btn-default btn-sm"
    //     >
    //       Back to List
    //     </button>

    //     <table className="table">
    //       <tbody>
    //       <tr>
    //         <th className="col-md-8">Message</th>
    //         <th>Created At</th>
    //       </tr>
    //       {messages}
    //       </tbody>
    //     </table>
    //     <ThreadReplyForm
    //       topicID={this.props.threadMessages[0].topicID}
    //       userID={this.props.userID}
    //       getMessages={this.getMessages}
    //       setShowThreadView={this.props.setShowThreadView}
    //     />
    //   </div>
    // )
