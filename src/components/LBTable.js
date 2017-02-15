import React, { Component } from 'react';
import $ from 'jquery';

import Camper from './Camper';

export default class LBTable extends Component {
    
    constructor(){
        super();

let html = <tr><td>1</td><td>Matt</td></tr>;

        this.state = {
            selectRecent: true,
            recent: [],
            allTime: [],
            table: [],
            recentTitle: '',
            allTimeTitle: ''
        }
    }
    
    componentWillMount(){

//get recent data
let thisVar = this;
        $.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent','', 
            function(data){
                thisVar.setState({ recent: data })
                thisVar.handleTable(true);
               })

//get all time data
        $.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime','',
            function(data){
                thisVar.setState({ allTime: data });
             thisVar.handleTable(true);    
            })
            
    }

handleRecentClick(){
    this.handleTable(true);
}    

handleAllTimeClick(){
    this.handleTable(false);
}

handleTable(recent){

    var html = [];
    var data;
    var url;

if( recent ){
    data = this.state.recent
}
else { data = this.state.allTime }

if(data.length > 0){
for(var i = 0; i < 30; i++){
    
    url = 'https://www.freecodecamp.com/' + data[i].username;
    html.push(
    <tr key={i}>
        <td>{i+1}</td>
        <Camper imgsrc={data[i].img} 
                username={data[i].username}
                userUrl={url}/>
        <td>{data[i].recent}</td>
        <td>{data[i].alltime}</td>
    </tr>)
}

var recentTitle = (recent) ? 'Points in past 30 days▼' : 'Points in past 30 days';
var allTimeTitle = (recent) ? 'All time points' : 'All time points▼';

this.setState({table: html,
                selectRecent: recent,
                recentTitle: recentTitle,
                allTimeTitle: allTimeTitle });
//this.forceUpdate();
}
}


    render(){
        return (

            <table>
                <tbody>
                    <tr>
                     <th id='thNum'>#</th>
                     <th id='thName'>Camper Name</th>
                     <th id='thRecent'><a href='#' onClick={this.handleRecentClick.bind(this)}>{this.state.recentTitle}</a></th>
                     <th id='thAllTime'><a href='#' onClick={this.handleAllTimeClick.bind(this)}>{this.state.allTimeTitle}</a></th>
                    </tr>
                    {this.state.table}
                </tbody>
                </table>

        )
    }
}