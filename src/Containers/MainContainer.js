import React from 'react';

//COMPONENTS
import FilterContainer from './FilterContainer'
import CentralContainer from './CentralContainer'
import MessagingContainer from './MessagingContainer'

const MainContainer = () => {
    return (
        <div className="main-container">
            <FilterContainer />
            <CentralContainer />
            <MessagingContainer />
        </div>
    );
};

export default MainContainer;