import React, {useState, useEffect} from 'react';
import {Route} from 'react-router-dom';
import axios from 'axios';


import {MovieList} from './Movies/MovieCard';
import SavedList from './Movies/SavedList';

const App = () => {
    const [savedList, setSavedList] = useState([]);
    const [movies, setMovies] = useState([]);
    const [movie, setMovie] = useState([])


    useEffect(() => {
        axios.get('http://localhost:5000/api/movies').then((response) => {
            setMovies(response.data);
            console.log(response.data);
        }).catch(error => {
            console.error('Server Error', error);
        })
    }, [])

    const id = 1;
    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${id}`).then((response) => {
            setMovie(response.data);
            console.log(response.data);
        }).catch(error => {
            console.error('Server Error', error);
        })
    }, [id])

    if (!movie) {
        return <div>Loading movie information...</div>;
    }
 
  // const saveMovie = (props) => {
  //   const addToSavedList = props.addToSavedList;
  //   addToSavedList(movie)
  // }

    const addToSavedList = movie => {
        setSavedList([
            ...savedList,
            movie
        ]);
    };

    return (
        <div>
            <SavedList list={savedList}/>
            <Route path='/movies/:id'
                render={
                    props => <Display {...props}
                        movie={movie}/>
                }/>
            <Route exact path='/'
                render={
                    props => <MovieList {...props}
                        movies={movies}/>
                }/>

        </div>
    );
};


const Display = (props) => {
    const {title, director, metascore, stars} = props.movie;

    return (
      <div className='save-wrapper'>
        <div className="movie-card">
            <h2>{title}</h2>
            <div className="movie-director">
                Director:
                <em>{director}</em>
            </div>
            <div className="movie-metascore">
                Metascore:
                <strong>{metascore}</strong>
            </div>
            <h3>Actors</h3>
            {
            stars.map(star => (
                <div key={star}
                    className="movie-star">
                    {star} </div>
            ))

        } </div>
        <div className="save-button">Save</div>
        </div>

    )
}
export default App;
