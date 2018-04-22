import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './Navbar.css';
import AddReflection from '../../AddNewReflection/addNewReflection.js';
import ViewReflection from '../../ViewReflection/viewReflection.js';


//Below is my Nav bar with my Routes, you will need to install react-router-dom.
class Navbar extends Component {
    render(){
        return(
            <div>
            <table className='navBar'>
                <tbody>
                    <tr>
                        <th>
                        <Link to ="/addnewreflection"> Add New Reflection </Link>
                        </th>
                        <th>
                        <Link to ="/viewreflectionpage"> View Reflections </Link>
                        </th>
                    </tr>
                </tbody>
            </table>
            <Route exact path="/addnewreflection" component={AddReflection}/>
            <Route exact path="/viewreflectionpage" component={ViewReflection}/>
            </div>
        )
    }
}

export default Navbar;

