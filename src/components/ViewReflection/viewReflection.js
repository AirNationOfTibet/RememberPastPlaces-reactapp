
import React, { Component } from 'react';
import {connect} from 'react-redux';
// import IconButton from 'material-ui/IconButton';
import ReflectionItem from './ReflectionItem/ReflectionItem.js';



class ViewReflection extends Component{
    
    //componentDidMount will be the function that calls get reflection.
    componentDidMount(){
        this.props.dispatch({
            type: "GET_REFLECTION"
        });
    }
    render(){
        //We can create an instance so we can do a .map on the reflectionList
        let singleReflection = this.props.state.reflectionList.map((reflection)=>{
            return(
                <ReflectionItem key={reflection.id} reflection={reflection} />
            )
        });
        return(
            <div>
                {singleReflection}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    state,
});

export default connect(mapStateToProps)(ViewReflection);
