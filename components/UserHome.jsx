import React from 'react';
import NavBar from './NavBar';
import FilmList from './FilmList';
import UserList from './UserList';
import FeedList from './FeedList';
import Nowplaying from './Nowplaying';
import _ from 'underscore';

var UserHome = ({handleFilmClick, handleUserClick, profile, username, feed}) => (
  <div className="user-home">
    <div className="user-home-personal">
          <h4 className="user-home-username">@{username}</h4>
      <h3>{profile.firstName} {profile.lastName}</h3>

      <div className="memberStatus"><i>Member since: {new Date(profile.createdAt).toLocaleDateString("en-US", {year: "numeric", month: "short",day: "numeric"})}</i></div>
      <div className="friendStat">
        <img className="friendsLogo" src="assets/friends.png"/>
        {profile.friends.length} Friend(s)
      </div>
      <div className="friendStat">
        <img className="friendsLogo" src="assets/logo2.png"/>
        {profile.ratings.length} Film(s) Rated
      </div>
      <div className="filmStatus">Films you have rated: </div>
      <FilmList
        handleFilmClick={handleFilmClick}
        allFilms={profile.ratings}
      />
      <div className="filmStatus">Recommended for you</div>
      <FilmList
        handleFilmClick={handleFilmClick}
        allFilms={_.uniq(profile.recs, rec => rec.filmID)}
        rating={true}
        />
    </div>
    <div className="user-home-feed">
      <FeedList handleFilmClick={handleFilmClick} handleUserClick={handleUserClick} feeds={feed}/>
    </div>
    <div className="user-home-right-panel">
      <div className="user-home-recs">
        <Nowplaying user={profile}/>
      </div>
      <div className="user-home-friends">
        <UserList
          handleUserClick={handleUserClick}
          allFriends={profile.friends}
        />
      </div>
    </div>

  </div>
  )


export default UserHome;

//        <span>Films recommended for you:</span>
