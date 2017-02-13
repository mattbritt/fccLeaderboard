import React, { Component } from 'react';

import Leaderboard from './components/Leaderboard';

export default class App extends Component {
  render(){
    return (
    <div className='col-sm-offset-2 col-sm-8'>
      <Leaderboard />
    </div>
  )
}
}
