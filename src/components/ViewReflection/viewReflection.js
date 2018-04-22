import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';

class ViewReflection extends Component{
    constructor(props){
        super(props)
        this.state = {
            reflections: [],
        }
    }
    render(){
        return(
            <div>
                <p>Hello</p>
            </div>
        )
    }
}

export default ViewReflection;
