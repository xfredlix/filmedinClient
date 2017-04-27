import React from 'react';
import CreateThreadForm from './CreateThreadForm';

class CreateThread extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="col-md-12">
          <button
            className="btn btn-default btn-sm"
            onClick={this.props.setShowThreadListView}
          >
            Back to List
          </button>
        </div>
        <div className="col-md-10 offset-md-2">
          <CreateThreadForm
            getTopics={this.props.getTopics}
            userID={this.props.userID}
            getCurrentThread={this.props.getCurrentThread}
            username={this.props.username}
            picture={this.props.imageUrl}
          />
        </div>
      </div>
    )
  }
}

CreateThread.propTypes = {
  userID: React.PropTypes.number.isRequired,
  getTopics: React.PropTypes.func.isRequired,
  setShowThreadListView: React.PropTypes.func.isRequired
}

export default CreateThread;
