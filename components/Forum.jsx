import React from 'react';
import helpers from '../lib/helpers';
import ThreadList from './ThreadList';
import Thread from './Thread';
import CreateThread from './CreateThread';

class Forum extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      view: 'showThreadListView',
      topics: this.props.topics,
      threadMessages: [],
      currentTopicID: 0
    }
    this.getTopics = this.getTopics.bind(this);
    this.handleThreadEntryClick = this.handleThreadEntryClick.bind(this);
    this.setShowThreadListView = this.setShowThreadListView.bind(this);
    this.setShowThreadView = this.setShowThreadView.bind(this);
    this.setShowCreateThreadView = this.setShowCreateThreadView.bind(this);
    this.getCurrentThread = this.getCurrentThread.bind(this);
  }

  componentWillMount() {
    this.getTopics();
  }

  getTopics() {
    helpers.getTopics()
      .then(resp => {
        var topics = resp.data.reverse();
        this.setState({
          topics: topics
        });
      })
      .catch(err => {
        console.log('ERROR: ', err);
      });
  }

  getCurrentThread(topicID) {
    helpers.getMessagesByTopicID(topicID)
      .then(resp => {
        console.log('getCurrentThread', resp);
        this.setState({ threadMessages: resp.data, currentTopicID: topicID, view: 'showThreadListView' })
      })
      .then(() => {
        this.setState({ view: 'showThreadView' }, this.forceUpdate)
      })
      .catch(err => {
        console.log('Error: ', err);
      })
  }

  handleThreadEntryClick(title) {
    console.log('title', title);
    helpers.getMessagesByTitle(title)
      .then(resp => {
        console.log('resp', resp);
        this.setState({
          threadMessages: resp.data,
          currentTopicID: resp.data[0].topicID,
        }, this.setShowThreadView);
      })
      .catch(err => {
        console.log('ERROR: ', err);
      });
  }

  setShowThreadListView() {
    this.setState({
      view: 'showThreadListView'
    });
  }

  setShowThreadView() {
    this.setState({
      view: 'showThreadView'
    });
  }

  setShowCreateThreadView() {
    console.log('showing');
    this.setState({
      view: 'showCreateThreadView'
    });
  }

  render() {
    if (this.state.view === 'showThreadListView') {
      return (
        <ThreadList
          threadTopics={this.state.topics}
          handleThreadEntryClick={this.handleThreadEntryClick}
          setShowCreateThreadView={this.setShowCreateThreadView}
          profile={this.props.profile}
          handleUserClick={this.props.handleUserClick}
        />
      );
    } else if (this.state.view === 'showThreadView') {
      return (
        <Thread
          userID={this.props.userID}
          currentTopicID={this.state.currentTopicID}
          threadMessages={this.state.threadMessages}
          setShowThreadListView={this.setShowThreadListView}
          setShowThreadView={this.setShowThreadView}
          profile={this.props.profile}
          handleUserClick={this.props.handleUserClick}
        />
      );
    } else if (this.state.view === 'showCreateThreadView') {
      return (
        <CreateThread
          userID={this.props.userID}
          getTopics={this.getTopics}
          setShowThreadListView={this.setShowThreadListView}
          getCurrentThread={this.getCurrentThread}
          username={this.props.username}
        />
      )
    }
  }
}

Forum.propTypes = {
  topics: React.PropTypes.array.isRequired,
  userID: React.PropTypes.number.isRequired
}

export default Forum;
