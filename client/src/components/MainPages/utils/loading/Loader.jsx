import React from 'react';
import { Puff } from 'react-loading-icons'

const Loader = () => {
    return (
        <>
            <Puff stroke="#98ff98" strokeOpacity={.125} speed={.25}/>
        </>
    )
}

export default Loader
