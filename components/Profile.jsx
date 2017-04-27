import React from 'react';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import NavBar from './NavBar';
import FriendFilmList from './FriendFilmList';
import FriendUserList from './FriendUserList';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    const {preferredGenre, leastPreferredGenre, imageUrl} = this.props.user;
    this.state = {
      favorite: preferredGenre,
      leastFavorite: leastPreferredGenre,
      profilePicture: imageUrl
    }
    this.handleDropDownLeastPreferred = this.handleDropDownLeastPreferred.bind(this);
    this.handleDropDownPreferred = this.handleDropDownPreferred.bind(this);
    this.handleProfilePictureChange = this.handleProfilePictureChange.bind(this);
  }

  handleProfilePictureChange(filename) {
    const {user, setProfilePicture} = this.props;
    setTimeout( () => {
      setProfilePicture(`http://filmed-in.s3.amazonaws.com/${user.username}`)
      this.setState({
        profilePicture: `http://filmed-in.s3.amazonaws.com/${user.username}`
      })

    }, 500)
  }

  handleDropDownPreferred(category) {
    this.props.handleDropDownPreferred(category);
    this.setState({
      favorite: category
    });
  }

  handleDropDownLeastPreferred(category) {
    this.props.handleDropDownLeastPreferred(category);
    this.setState({
      leastFavorite: category
    })
  }

  render() {
    const {user, handleFilmClick, handleUserClick, addFriend, handleDropDownPreferred, handleDropDownLeastPreferred} = this.props;
    return (
      <div className="user-profile">
        <div className="user-left-panel" >
          <div className="user-profile-info">
            <img className='profilePicture' src={this.state.profilePicture} />
            <h4 className="user-profile-username">@{user.username}</h4>
            <h1>{user.firstName} {user.lastName}</h1>
            <div onClick={() => { !user.isFriend ? addFriend(user) : console.log('Already friends')}} className='friendStat-profile'>
              <img className="friendsLogo" src={user.isFriend ? 'assets/isFriend.png' : 'assets/addFriend.png'}/>
              {user.isFriend ? 'Friends' : 'Add Friend'}
            </div>
            <div className="friendStat-profile">
              <img className="friendsLogo" src="assets/friends.png"/>
              {user.friends.length} Friend(s)
            </div>
            <div className="friendStat-profile">
              <img className="friendsLogo" src="assets/logo2.png"/>
              {user.ratings.length} Movie(s) Rated
            </div>
          </div>
          <div className="user-profile-friends">
            <h3 className="user-profile-friends-title">Your Friends</h3>
            <FriendUserList
              allFriends={user.friends}
              handleUserClick={handleUserClick}
            />
          </div>
        </div>
        <div className="user-profile-films col-md-7">
          <h3 className="user-profile-films-title">Your Films</h3>
          <FriendFilmList
            allFilms={user.ratings}
            handleFilmClick={handleFilmClick}
          />
        </div>
        <div className="user-right-panel user-profile-genres">
          <h4>User Preferences</h4>

          <div className="genre-box">
            <h6 className="user-profile-genres-title">Your Preferred Genre</h6>
            <ButtonToolbar>
              <DropdownButton bsStyle={'default'} title={this.state.favorite || 'genre'} id={'dropdown-size-medium'} onSelect={this.handleDropDownPreferred}>
                <MenuItem eventKey="action">Action</MenuItem>
                <MenuItem eventKey="adventure">Adventure</MenuItem>
                <MenuItem eventKey="animation">Animation</MenuItem>
                <MenuItem eventKey="comedy">Comedy</MenuItem>
                <MenuItem eventKey="documentary">Documentary</MenuItem>
                <MenuItem eventKey="drama">Drama</MenuItem>
                <MenuItem eventKey="family">Family</MenuItem>
                <MenuItem eventKey="horror">Horror</MenuItem>
                <MenuItem eventKey="romance">Romance</MenuItem>
                <MenuItem eventKey="thriller">Thriller</MenuItem>
              </DropdownButton>
            </ButtonToolbar>
          </div>

          <div className="genre-box">
            <h6 className="user-profile-genres-title">Your Least Preferred Genre</h6>
            <ButtonToolbar>
              <DropdownButton bsStyle={'default'} title={this.state.leastFavorite || 'genre'} id={'dropdown-size-medium'} onSelect={this.handleDropDownLeastPreferred}>
                <MenuItem eventKey="action">Action</MenuItem>
                <MenuItem eventKey="adventure">Adventure</MenuItem>
                <MenuItem eventKey="animation">Animation</MenuItem>
                <MenuItem eventKey="comedy">Comedy</MenuItem>
                <MenuItem eventKey="documentary">Documentary</MenuItem>
                <MenuItem eventKey="drama">Drama</MenuItem>
                <MenuItem eventKey="family">Family</MenuItem>
                <MenuItem eventKey="horror">Horror</MenuItem>
                <MenuItem eventKey="romance">Romance</MenuItem>
                <MenuItem eventKey="thriller">Thriller</MenuItem>
              </DropdownButton>
            </ButtonToolbar>
          </div>

          <div className="genre-box">
            <form action="http://filmed-in.s3.amazonaws.com/" method="post" encType="multipart/form-data" onSubmit={this.handleProfilePictureChange}>
               <input type="hidden" name="key" defaultValue={user.username}/><br />
               <input type="hidden" name="acl" defaultValue="public-read" />
               <input type="hidden" name="Content-Type" defaultValue="image/jpeg" /><br />
               <input type="hidden" name="x-amz-server-side-encryption" defaultValue="AES256" />
               Select Photo:
               <input type="file" name="file" /> <br />
               <input type="submit" name="submit" defaultValue="Set Profile Photo" />
             </form>
          </div>

        </div>


      </div>
    );
  }
}

export default Profile;
