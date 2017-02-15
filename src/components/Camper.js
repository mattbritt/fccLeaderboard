import React, { Component } from 'react';

export default class Camper extends Component {
    


    render(){
        return(
            <td>
                <a href={this.props.userUrl} target='_blank'>
                    <img className='user-img' role='presentation' src={this.props.imgsrc} />
                    {this.props.username}</a>
            </td>
        )
    }
}