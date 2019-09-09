import React, { useEffect, useState } from 'react';
import './App.scss';

import { TextField, Typography } from '@material-ui/core';

import moviesDataset from './data/movies.json';
import MovieCard from './components/MovieCard/MovieCard';

function App() {
  const [genres, setGenres] = useState({});
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 20;

  const parseMovies = () => {
    const genres = {};
    const movies = moviesDataset.map(movie => {
      
      const parsedMovie = {
        id: movie[0],
        title: movie[1],
        genres: movie[2].split('|'),
        visible: true
      };

      for (const genre of parsedMovie.genres) {
        if (!genres[genre]) {
          genres[genre] = {
            count: 1,
            active: false
          };
        } else {
          genres[genre].count++;
        }
      }

      return parsedMovie;
    });

    setGenres(genres);
    setMovies(movies);
  }


  // EVENTS
  const onPageClicked = page => setCurrentPage(page);


  useEffect(parseMovies, moviesDataset);

  const visibleMovies = movies.filter(movie => movie.visible);
  const pages = new Array(Math.ceil(visibleMovies.length / pageSize)).fill(1);

  return (
    <div className="app">
      <div className="panel__left">
        <Typography className="panel__title" variant="h4" gutterBottom > Genres </Typography>
      </div>
      <div className="panel__right">
        <Typography className="panel__title" variant="h4" gutterBottom > Movies </Typography>
        <TextField 
          label="Search Movies"
          type="search"
        />
        <div className="movies">
          {visibleMovies.slice(currentPage * pageSize, !currentPage ? pageSize : currentPage * pageSize + pageSize).map(movie => <MovieCard key={movie.id} movie={movie}/>)}
        </div>
        <div className="pages">
          {pages.map((page, index) => <button key={`${page}_${index+1}`} onClick={onPageClicked.bind(null, index)}>{index + 1}</button>)}
        </div>
      </div>
    </div>
  );
}

export default App;
