import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react'

//COMPONENTS
import Search from './Search';
import InterestsList from './InterestsList';


class InterestsAside extends Component {
    render() {
        return (
            <div className="filter-container">
                <Search />
                <InterestsList />
            </div>

        );
    }
}

export default InterestsAside;