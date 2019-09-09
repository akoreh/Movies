import React from 'react';

import {Card, CardContent, Typography} from '@material-ui/core';

import './MovieCard.scss';

function MovieCard({movie, activeGenres}) {
    return (
        <Card className="movie">
            <CardContent>
                <Typography className="movie__title" variant="body1" gutterBottom>
                    {movie.title}
                </Typography>
                <div className="movie__genres">
                 {movie.genres.filter(genre => activeGenres.indexOf(genre) != -1).map(genre => <Typography className="movie__genre movie__genre--active"  variant="body1">{genre}</Typography>)}
                 {movie.genres.filter(genre => activeGenres.indexOf(genre) === -1).map(genre => <Typography className="movie__genre" color="textSecondary" variant="body1">{genre}</Typography>)}
                </div>
            </CardContent>
        </Card>
    )
};

export default MovieCard;