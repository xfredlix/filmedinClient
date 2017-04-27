import React from 'react';
import helpers from '../lib/helpers';

class ThreadReplyForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      topicMessage: ''
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  postMessage(topicID, topicMessage, userID) {
    helpers.postMessage(topicID, topicMessage, userID)
      .then(resp => {
        console.log('Message Posted');
        console.log('Response: ', resp);
        // TO DO: Redirect to Thread Page with Updated Posts
        this.props.getMessages();
      })
      .catch(err => {
        console.log('ERROR: ', err);
      })
  }

  onSubmit(e) {
    e.preventDefault();
    const { topicMessage } = this.state;
    const { topicID, userID } = this.props;
    this.postMessage(topicID, topicMessage, userID);
    this.setState({ topicMessage: '' });
  }

  render() {
    return (
      <div className='form-group'>
        <form onSubmit={this.onSubmit}>
        <label className='control-label'>Comment Below</label>
          <input
            onChange={this.onChange}
            value={this.state.topicMessage}
            type='text'
            name='topicMessage'
            className='form-control'
        />
      <button
        type="submit"
        className="btn btn-primary btn-lg btn-success">
        Submit
      </button>
      </form>
      </div>
    );
  }
}

ThreadReplyForm.propTypes = {
  topicID: React.PropTypes.number.isRequired,
  userID: React.PropTypes.number.isRequired,
  getMessages: React.PropTypes.func.isRequired
}


export default ThreadReplyForm;
