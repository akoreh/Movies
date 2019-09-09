import React from 'react';

import {Card, CardContent, Typography} from '@material-ui/core';

import './MovieCard.scss';

function MovieCard({movie}) {
    return (
        <Card className="movie">
            <CardContent>
                <Typography className="movie__title" variant="body1" gutterBottom>
                    {movie.title}
                </Typography>
                <Typography className="movie__genres" variant="body1" color="textSecondary" gutterBottom>
                    {movie.genres.join(' ')}
                </Typography>
            </CardContent>
        </Card>
    )
};

export default MovieCard;