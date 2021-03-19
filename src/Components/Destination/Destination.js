import React from 'react';
import { useParams } from 'react-router';

const Destination = () => {
    const {vehicle} = useParams()
    return (
        <div>
            You selected {vehicle}!
        </div>
    );
};

export default Destination;