import React from 'react';
import {Link} from 'react-router-dom';

const MovieList = props => {


    return([
        <h1>Movies</h1>,
        <div className='movie-list'>

            {
            props.movies.map(movie => <Link to={
                `/movies/${
                    movie.id
                }`
            }>
                {
                < MovieCard {
                    ...props
                }
                movie = {
                    movie
                } />
            } </Link>)
        } </div>

    ]);
};


function MovieCard({movie}) {
    const {title, director, metascore, stars} = movie;
    return (
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
    );
};

export {
    MovieList
};
