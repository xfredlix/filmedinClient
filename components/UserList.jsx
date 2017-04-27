import React from 'react';
import UserEntry from './UserEntry';


var UserList = ({handleUserClick, allFriends}) => (
  <div className="user-list">
    {allFriends.map((user, i) => 
      <UserEntry 
        key={i}
        handleUserClick={handleUserClick}
        user={user} 
      /> )}
  </div>
)


export default UserList;