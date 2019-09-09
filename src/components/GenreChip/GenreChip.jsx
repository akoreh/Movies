import React from 'react';

import Chip from '@material-ui/core/Chip';

import './GenreChip.scss';

function GenreChip({genre, onClick}) {
    return (
        <Chip 
            className="genreChip"
            label={`${genre.name} (${genre.count})`}
            onClick={onClick.bind(null, genre.name)}
            color={genre.active ? 'primary' : 'default'}
        />
    );
};

export default GenreChip;