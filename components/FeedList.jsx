import React from 'react';
import FeedEntry from './FeedEntry';

var FeedList = ({handleFilmClick, handleUserClick, feeds}) => (
  <div className="feed-list">
    {feeds.map((feed, i) =>
      <FeedEntry
        key={i}
        handleFilmClick={handleFilmClick}
        handleUserClick={handleUserClick}
        feed={feed}
      /> )}
  </div>
)

export default FeedList;