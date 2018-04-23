import React, { Component } from 'react';
import {connect} from 'react-redux';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import moment from 'moment';


class ReflectionItem extends Component{

    handleDelete = () => {
        this.props.dispatch({
            type: 'DELETE_REFLECTION',
            payload: this.props.reflection,
        })
    }
    
    handleBookMark = () => {
        this.props.dispatch({
            type: 'BOOKMARK_REFLECTION',
            payload: this.props.reflection,
        })
    }


    render(){
        return(
            <Card>
                <CardContent>
                    {moment(this.props.reflection.date).format("MMM Do, YYYY")}
                    <br/>
                    {this.props.reflection.topic}
                    <br/>
                    {this.props.reflection.description}
                    <br/>
                    <button onClick={this.handleDelete}>Delete</button>
                    <br/>
                    <button onClick={this.handleBookmark}>Bookmark</button>
                </CardContent>
            </Card>
        )
    }
}


const mapStateToProps = state => ({
    state,
})

export default connect(mapStateToProps)(ReflectionItem);
