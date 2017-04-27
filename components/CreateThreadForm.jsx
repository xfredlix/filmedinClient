import React from 'react';
import helpers from '../lib/helpers';

class CreateThreadForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      topicName: '',
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

  postNewTopic(topicName, topicMessage, userID, username) {
    helpers.postNewTopic(topicName, this.props.username)
      .then(resp => {
        const topicID = resp.data.insertId;
        console.log('PostNewTopic: ', resp);
        return topicID;
      })
      .then(topicID => {
        helpers.postMessage(topicID, topicMessage, userID)
          .then(resp => {
            console.log('Message Posted');
            // TO DO: Redirect to Forum or the Same Thread (with new posts)
            this.props.getTopics();
            this.props.getCurrentThread(topicID);
          });
      })
      .catch(err => {
        console.log('ERROR: ', err);
      })
  }

  onSubmit(e) {
    e.preventDefault();
    const { topicName, topicMessage } = this.state;
    const { userID } = this.props;
    this.postNewTopic(topicName, topicMessage, userID);
  }

  render() {
    return (
      <div className="container">
        <div className="col-md-9 offset-md-3">
          <div className='form-group'>
            <form onSubmit={this.onSubmit}>
            <label className='control-label'>Topic Name</label>
            <input
              onChange={this.onChange}
              value={this.state.topicName}
              type='text'
              name='topicName'
              className='form-control'
            />
            <label className='control-label'>Topic Message</label>
              <input
                onChange={this.onChange}
                value={this.state.topicMessage}
                type='text'
                name='topicMessage'
                className='form-control'
                style={{ 'height': '100px' }}
            />
          <button
            type="submit"
            className="btn btn-primary btn-lg btn-success">
            Submit
          </button>
          </form>
          </div>
        </div>
      </div>
    );
  }
}

CreateThreadForm.propTypes = {
  getTopics: React.PropTypes.func.isRequired,
  userID: React.PropTypes.number.isRequired
}


export default CreateThreadForm;
