import React from 'react';
import helpers from '../lib/helpers'

class FilmedInNavBar extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      userSearch: '',
      filmSearch: ''
    }
  }
  changeUser (e) {
    this.setState({userSearch: e.target.value});
  }
  changeFilm (e) {
    this.setState({filmSearch: e.target.value});
  }
  searchFilm() {
    helpers.searchFilm(this.state.filmSearch).then(films => {
      console.log(films);
      this.props.searchFilm(films.data);
      this.setState({
        filmSearch: ''
      })
    }).catch(err => {
      console.log('error with search film', err)
    })

  }
  searchUser() {
    helpers.searchProfile(this.state.userSearch).then(friends => {
      console.log(friends);
      this.props.searchUser(friends.data);
      this.setState({
        userSearch: ''
      })
    }).catch(err => {
      console.log('error with search user', err)
    })

  }
  searchFilmKeyPress (e) {
    if (e.key === 'Enter') {
      this.searchFilm();
    }
  }
  searchUserKeyPress (e) {
    if (e.key === 'Enter') {
      this.searchUser();
    }
  }
  render() {
    return (
        <div>
          <div className="navbar navbar-default navbar-fixed-top login-bar">
              <div className="container login-bar-container">
                  <div className="navbar-header login-bar-header">
                      <span className="navbar-brand glyphicon glyphicon-film" id="logo" />
                      <a className="navbar-brand title" href="#">FilmedIn</a>
                  </div>
                  <span className="nav-bar-button nav-bar-home nav-bar-hover glyphicon glyphicon-home" onClick={this.props.handleHomeClick} />
                  <span className="nav-bar-button nav-bar-hover glyphicon glyphicon-comment" onClick={this.props.handleForumClick} />
                  <div className="nav-bar-button">
                    <input type="text" placeholder="Search Film" onKeyDown={this.searchFilmKeyPress.bind(this)} onChange={this.changeFilm.bind(this)} value={this.state.filmSearch} />
                    <span onClick={this.searchFilm.bind(this)} className="glyphicon glyphicon-search"></span>
                  </div>
                  <div className="nav-bar-button nav-bar-right">
                    <input type="text" placeholder="Search Friends" onKeyDown={this.searchUserKeyPress.bind(this)} onChange={this.changeUser.bind(this)} value={this.state.userSearch}/>
                    <span onClick={this.searchUser.bind(this)} className="glyphicon glyphicon-search"></span>
                  </div>
                  <span onClick={this.props.handleLogOutClick} className="nav-bar-button nav-bar-logout nav-bar-hover glyphicon glyphicon-log-out" />
                  <span className="nav-bar-button nav-bar-hover nav-bar-logout glyphicon glyphicon-user" onClick={this.props.handleProfileClick} />
              </div>
          </div>
        </div>



      )
  }
}

export default FilmedInNavBar;



//                  <div className="nav-bar-button nav-bar-hover">FEED</div>

// <div className="user-login">
//                       <div className="navbar-collapse collapse" id="navbar-main">
//                           <form className="navbar-form navbar-right" role="search">
//                               <div className="form-group user-search">
//                                   <input type="text" className="form-control" value={this.state.username} onChange={this.handleUsernameChange} name="username" placeholder="Username"/>
//                               </div>
//                               <div className="form-group user-search">
//                                   <input type="password" className="form-control" value={this.state.password} onChange={this.handlePasswordChange} name="password" placeholder="Password"/>
//                               </div>
//                               <button type="submit" onClick={this.handleLoginClick} className="btn btn-default">Sign In</button>
//                           </form>
//                       </div>
//                   </div>





        //    <div className="navbar">
        //   <ul>
        //     <li>
        //       <a href="#" onClick={this.props.handleHomeClick}>Home</a>
        //     </li>
        //     <li>
        //       <div>
        //         <label>Search Film: </label>
        //         <input type="text" placeholder="Film Title" onChange={this.changeFilm.bind(this)} value={this.state.filmSearch} />
        //         <button onClick={this.searchFilm.bind(this)}>Search</button>
        //       </div>
        //     </li>
        //     <li>
        //       <div>
        //         <label>Search Users: </label>
        //         <input type="text" placeholder="Name" onChange={this.changeUser.bind(this)} value={this.state.userSearch}/>
        //         <button onClick={this.searchUser.bind(this)}>Search</button>
        //       </div>
        //     </li>
        //     <li>
        //       <a href="#" onClick={this.props.handleLogOutClick}>Logout</a>
        //     </li>


        //   </ul>
        // </div>
