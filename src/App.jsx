import React, { useEffect, useState } from 'react';
import './App.scss';

import moviesDataset from './data/movies.json';

function App() {
  const [genres, setGenres] = useState({});
  const [movies, setMovies] = useState([]);

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

  useEffect(parseMovies, moviesDataset);

  return (
    <div className="app">
    </div>
  );
}

export default App;
