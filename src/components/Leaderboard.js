import React, { Component } from 'react';

import TitleBar from './TitleBar';
import LBTable from './LBTable';

export default class Leaderboard extends Component {
    render(){
        return (
            <div id='Leaderboard'>
                <TitleBar />
                <LBTable />
            </div>
        )
    }
}