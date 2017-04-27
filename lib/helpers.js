import axios from 'axios';
import react from 'react';

var getRequest = function (url) {
  var request = {
    headers: {
      'x-access-token': window.localStorage.getItem('filmedInToken'),
      'Content-Type': 'application/json; charset=utf-8',

    },
    url: url,
    baseURL: 'https://filmedinjs.herokuapp.com/',
    method: 'GET'
  }
  return request;
}

var helpers = {};

helpers.logInUser = function(data) {
  return axios.request({
    url: 'https://filmedinjs.herokuapp.com/signin',
    method: 'POST',
    data: data
  });
}
helpers.signUpUser = function(data) {
  return axios.request({
    url: 'https://filmedinjs.herokuapp.com/signup',
    method: 'POST',
    data: data
  });
}
helpers.getHome = function () {
  return axios.request(getRequest('/home'));
}
helpers.getFeed = function () {
  return axios.request(getRequest('/feed'));
}
helpers.getProfile = function (id) {
  return axios.request(getRequest('/profile/' + id));
}
helpers.getFilm = function(id) {
  return axios.request(getRequest('/film/' + id));
}

helpers.getMovies = function() {
  var url = 'http://data.tmsapi.com/v1.1/movies/showings?startDate=2017-02-09&zip=94030&api_key=hrwx8yckjeehxpuxuy73qzqj'
  return axios.request(getRequest(url))
}

helpers.searchProfile = function(search) {
  return axios.request(getRequest('/searchprofile/' + search));
}
helpers.searchFilm = function(search) {
  return axios.request(getRequest('/searchfilm/' + search));
}
helpers.addFriend = function(friendID) {
  return axios.request({
    url: 'https://filmedinjs.herokuapp.com/friend',
    method: 'POST',
    headers: {
      'x-access-token': window.localStorage.getItem('filmedInToken'),
      'Content-Type': 'application/json; charset=utf-8',
    },
    data: {
      friendID: friendID
    }
  });
}
helpers.addRating = function(filmID, rating, review) {
  return axios.request({
    url: 'https://filmedinjs.herokuapp.com/rating',
    method: 'POST',
    headers: {
      'x-access-token': window.localStorage.getItem('filmedInToken'),
      'Content-Type': 'application/json; charset=utf-8',
    },
    data: {
      filmID: filmID,
      rating: rating,
      review: review
    }
  });
}

helpers.castList = function(string) {
  return string.split(';').map(pair => {
    return pair.split(':')
  })
}
helpers.dateDiff = function(date) {
  var today = new Date();
  var calcDate = new Date(date);
  var diff = today - calcDate;
  var msec = diff;
  var dd = Math.floor(msec / 1000 / 60 / 60 / 24);
  msec -= dd * 1000 * 60 * 60 * 24;
  var hh = Math.floor(msec / 1000 / 60 / 60);
  msec -= hh * 1000 * 60 * 60;
  var mm = Math.floor(msec / 1000 / 60);
  return (dd !== 0 ? (dd + "d ") : "") + (hh !== 0 ? (hh + "h ") : "") + (mm !== 0 ? (mm + "m ") : "");
}

helpers.getUserIdByName = function(username) {
  return axios({
    method: 'get',
    url: 'https://filmedinjs.herokuapp.com/users',
    params: {
      username: username
    }
  });
}

helpers.getMessagesByTopicID = function(topicID) {
  return axios({
    method: 'get',
    url: 'https://filmedinjs.herokuapp.com/getMessagesByTopicID',
    params: {
      topicID: topicID
    }
  })
}

helpers.getTopics = function () {
  return axios({
    method: 'get',
    url: 'https://filmedinjs.herokuapp.com/topics'
  });
}

helpers.postMessage = function(topicID, topicMessage, userID) {
  return axios.request({
  url: 'http://filmedinjs.herokuapp.com/postMessage',
    method: 'POST',
    headers: {
      'x-access-token': window.localStorage.getItem('filmedInToken'),
      'Content-Type': 'application/json; charset=utf-8',
    },
    data: {
      topicID: topicID,
      topicMessage: topicMessage,
      userID: userID
    }
  });
}

helpers.setFavoriteGenre = (category, id) => {
  return axios.request({
    url: 'https://filmedinjs.herokuapp.com/setFavoriteGenre',
    method: 'POST',
    data: {
      category: category,
      id: id
    }
  });
}

helpers.setLeastFavoriteGenre = (category, id) => {
  return axios.request({
    url: 'https://filmedinjs.herokuapp.com/setLeastFavoriteGenre',
    method: 'POST',
    data: {
      category: category,
      id: id
    }
  });
}

helpers.postNewTopic = function(topicName, username) {
  return axios.request({
  url: 'https://filmedinjs.herokuapp.com/postTopic',
    method: 'POST',
    headers: {
      'x-access-token': window.localStorage.getItem('filmedInToken'),
      'Content-Type': 'application/json; charset=utf-8',
    },
    data: {
      topicName: topicName,
      username: username
    }
  });
}

helpers.getMessagesByTitle = function(title) {
  return axios.request({
    url: 'https://filmedinjs.herokuapp.com/getMessagesByTitle',
    method: 'GET',
    headers: {
      'x-access-token': window.localStorage.getItem('filmedInToken'),
      'Content-Type': 'application/json; charset=utf-8',
    },
    params: {
      title: title
    }
  });
}

helpers.getTopicByTopicID = function(topicID) {
  return axios.request({
    url: 'https://filmedinjs.herokuapp.com/getTopicByTopicID',
    method: 'GET',
    params: {
      topicID: topicID
    }
  });
}

helpers.setProfilePicture = (image, id) => {
  return axios.request({
    url: 'https://filmedinjs.herokuapp.com/updateProfilePicture',
    method: 'POST',
    headers: {
      'x-access-token': window.localStorage.getItem('filmedInToken'),
      'Content-Type': 'application/json; charset=utf-8',
    },
    data: {
      profilePicture: image,
      id: id
    }
  })
}

helpers.timestampParser = (timestamp) => {
  var months = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
  };

  var date = timestamp.slice(0,10).split('-');
  var dateAmerican = date[1] + '/' + date[2] + '/' + date[0];
  var dateWords = months[Number(date[1])] + ' ' + date[2] + ', ' + date[0];

  var time = timestamp.slice(11,16).split(':');
  time[0] = (Number(time[0]) - 8).toString();
  if (Number(time[0]) < 0) {
    time[0] = (24 + Number(time[0])).toString();
  }
  var timeWithTimeZone = '';

  if (Number(time[0]) > 12) {
    timeWithTimeZone = ((Number(time[0]) - 12).toString() + ':' + time[1] + 'PM');
  } else if (Number(time[0]) === 12) {
    timeWithTimeZone = (time[0] + ':' + time[1] + 'PM');
  } else if (Number(time[0]) === 0) {
    timeWithTimeZone = ('12:' + time[1] + 'AM');
  } else {
    timeWithTimeZone = (time[0] + ':' + time[1] + 'AM');
  }

  return {
    dateAmerican: dateAmerican,
    dateWords: dateWords,
    timeWithTimeZone: timeWithTimeZone
  }
};

export default helpers
