import React, { Component } from 'react';
import $ from 'jquery';

export default class LBTable extends Component {
    
    constructor(){
        super();

let html = <tr><td>1</td><td>Matt</td></tr>;

        this.state = {
            selectRecent: true,
            recent: [],
            allTime: [],
            table: []
        }
    }
    
    componentWillMount(){

//get recent data
let thisVar = this;
        $.get('https://fcctop100.herokuapp.com/api/fccusers/top/recent','', 
            function(data){
                thisVar.setState({ recent: data })
                console.log('Got recent data');
                thisVar.handleTable();
               })

//get all time data
        $.get('https://fcctop100.herokuapp.com/api/fccusers/top/alltime','',
            function(data){
                thisVar.setState({ allTime: data });
             thisVar.handleTable();    
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

if( recent ){
    data = this.state.recent
}
else { data = this.state.allTime }

if(data.length > 0){
for(var i = 0; i < 30; i++){
    html.push(
    <tr key={i}>
        <td>{i+1}</td>
        <td>{data[i].username}</td>
        <td>{data[i].recent}</td>
        <td>{data[i].alltime}</td>
    </tr>)
}
this.setState({table: html,
                selectRecent: recent});
this.forceUpdate();
}
}


    render(){
        return (

            <table>
                <tbody>
                    <tr>
                     <th id='thNum'>#</th>
                     <th id='thName'>Camper Name</th>
                     <th id='thRecent'><a href='#' onClick={this.handleRecentClick.bind(this)}>Points in past 30 days</a></th>
                     <th id='thAllTime'><a href='#' onClick={this.handleAllTimeClick.bind(this)}>All time points</a></th>
                    </tr>
                    {this.state.table}
                </tbody>
                </table>

        )
    }
}