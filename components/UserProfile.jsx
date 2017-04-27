import React from 'react';
import NavBar from './NavBar';
import FriendFilmList from './FriendFilmList';
import FriendUserList from './FriendUserList';

var UserProfile = ({user, handleFilmClick, handleUserClick, addFriend}) => (
    <div className="user-profile">
      <div className="user-left-panel" >
        <div className="user-profile-info">
          <div className="user-fullname">
            <h1>{user.firstName} {user.lastName}</h1>
          </div>
          <div className="user-username">
            <h4>@{user.username}</h4>
          </div>
          <div align="center">
            <img className='profilePicture' src={user.imageUrl} />
          </div>
          <div onClick={() => {!user.isFriend ? addFriend(user) : console.log("Already friends")}} className="friendStat-profile">
            <img className="friendsLogo" src={user.isFriend ? "assets/isFriend.png" : "assets/addFriend.png"}/>
            {user.isFriend ? "Friends" : "Add Friend"}
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
      </div>

      <div className="user-profile-films">
        <h3 className="user-profile-films-title">{user.firstName}'s Films</h3>
        <FriendFilmList
          allFilms={user.ratings}
          handleFilmClick={handleFilmClick}
        />
      </div>

      <div className="user-right-panel">
        <h3 className="user-profile-friends-title">{user.firstName}'s Friends</h3>
        <FriendUserList
          allFriends={user.friends}
          handleUserClick={handleUserClick}
          />
      </div>

    </div>
  )

export default UserProfile
