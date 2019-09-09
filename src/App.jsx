import React, { useEffect, useState, createRef } from 'react';
import './App.scss';

import { TextField, Typography } from '@material-ui/core';
import debounce from 'debounce';

import moviesDataset from './data/movies.json';
import MovieCard from './components/MovieCard/MovieCard';
import GenreChip from './components/GenreChip/GenreChip';

function App() {
  const [genres, setGenres] = useState({});
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 20;
  const searchInputRef = createRef();

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
  };

  const filterMovies = (searchTerm = '', activeGenres) => {
    let newMovies;

    searchTerm = searchTerm.trim();

    if (!searchTerm && !activeGenres.length) {
      newMovies = movies.map(movie => {
        movie.visible = true;
        return movie;
      });
    } else {
      newMovies = movies.map(movie => {
        const titleIncludesSearchTerm = movie.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;

        if (searchTerm && !activeGenres.length) {
          movie.visible = titleIncludesSearchTerm;
        } else {
          movie.visible = titleIncludesSearchTerm && firstArrayContainsElementsFromSecondArray(movie.genres, activeGenres);
        }

        return movie;
      });
    }

    setMovies(newMovies);
  }


  // EVENTS
  const onPageClicked = page => setCurrentPage(page);

  const onGenreClicked = genre => {
    const genreClone = {...genres[genre]};

    genreClone.active = !genreClone.active;

    const newGenres = {...genres, [genre]: genreClone};

    filterMovies(searchInputRef.current.value, getActiveGenres(newGenres))
    setGenres(newGenres);
  };

  const onSearchInputChange = debounce(searchTerm => filterMovies(searchTerm, getActiveGenres(genres)), 300);

  //UTIL

  const firstArrayContainsElementsFromSecondArray = (arr1, arr2) => arr2.some(item => arr1.includes(item));

  const getActiveGenres = genres => Object.keys(genres).filter(genre => genres[genre].active);


  useEffect(parseMovies, moviesDataset);

  const visibleMovies = movies.filter(movie => movie.visible);
  const pages = new Array(Math.ceil(visibleMovies.length / pageSize)).fill(1);

  return (
    <div className="app">
      <div className="panel__left">
        <Typography className="panel__title" variant="h4" gutterBottom > Genres </Typography>
        <div className="genres">
          {Object.keys(genres).map(genre => (
            <GenreChip 
              key={genre}
              genre={{...genres[genre], name: genre}}
              onClick={onGenreClicked}
            />
          ))}
        </div>
      </div>
      <div className="panel__right">
        <Typography className="panel__title" variant="h4" gutterBottom > Movies </Typography>
        <TextField 
          label="Search Movies"
          type="search"
          inputRef={searchInputRef}
          onChange={evt => onSearchInputChange(evt.target.value)}
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
