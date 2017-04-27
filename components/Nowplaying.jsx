import React from 'react';
import { Carousel } from 'react-bootstrap';
import helpers from '../lib/helpers'
import movies from '../data/onConnect';

class Nowplaying extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMovies: movies,
      apikey: 'vah23z92k8mvpscqy7nrg44e'
    };
    // helpers.getMovies().then( movies => {
      // console.log(movies);
      // this.setState({
      //   currentMovies: movies
      // });
    // });
  }

  removeLeastPreferred() {
    const {user} = this.props;
    let movieCopy = this.state.currentMovies.slice(0);
    for (let i = 0; i < movieCopy.length; i++) {
      for (let genre of movieCopy[i].genres) {
        if (genre.toLowerCase() === user.leastPreferredGenre) {
          movieCopy.splice(i, 1);
          i --;
        }
      }
    }
    this.setState({
      currentMovies: movieCopy
    }, this.sortMovies);
  }

  sortMovies() {
    const {user} = this.props;
    this.setState({
      currentMovies: this.state.currentMovies.sort((a,b) => {
        for ( let genre of b.genres) {
          if (genre.toLowerCase() === user.preferredGenre) {
            return 1
          }
        }
        return -1
      })
    })
  }

  componentWillMount() {
    this.removeLeastPreferred();
  }

  render() {
    return (
    <Carousel className="carousel-class" indicators={false}>
      {this.state.currentMovies.map(movie =>
        <Carousel.Item>
          <div className="col-md-12">
            <h3 className="carousel-title">[{movie.title.split(' ').join('_')}]</h3>
          </div>
          <div className="col-md-3 carousel-movie-img">
            <img className="movie-img" src={movie.preferredImage.uri} />
          </div>
          <div className="col-md-9 carousel-movie-text">
            <p className="carousel-description">{movie.shortDescription}</p>
            <h8 className='carousel-genre'>Genres: { movie.genres ? movie.genres.join(', ') : 'N/A'}</h8>
            <div className="carousel-showtimes">
              <h8 className="carousel-showtimes-title">Upcoming Showtimes:</h8>
              <p>
                {movie.showtimes.map(time =>
                  <a href={time.ticketURI}>{
                      time.dateTime.slice(5).split('T').join(' ')}  | </a>
                  )}
                </p>
              </div>
            </div>
        </Carousel.Item>
      )}
    </Carousel>
  );
  }
}

export default Nowplaying;
