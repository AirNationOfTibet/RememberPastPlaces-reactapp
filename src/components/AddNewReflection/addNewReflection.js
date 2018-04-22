import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddReflection extends Component{
    constructor(props){
        super(props);
        this.state = {
            topic: " ",
            reflection: " "
        }
    }

    handleChangeReflection = (propertyName) => {
        return (event) => {
            this.setState({
                ...this.state,
                [propertyName]: event.target.value,
            })
        }
    }

    addNewReflection = event => {
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_REFLECTION',
            payload: this.state
        });
    }

    render(){
        return(
            <div>
            <form onSubmit={this.addNewReflection}>
                <h3>TOPIC</h3>
                <input value={this.state.topic} onChange={this.handleChangeReflection('topic')} type="text" name="Topic" />
                <br/>
                <h3>Reflection</h3>
                <textarea value={this.state.reflection} onChange={this.handleChangeReflection('reflection')} rows="10" cols="70"/>
                <br/>
                <input type="submit" value="Submit"/>
            </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    state,
})

export default connect(mapStateToProps)(AddReflection);