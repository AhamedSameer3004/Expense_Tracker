import React, { Component } from 'react';
import './App.css';
import Header from './header.js';
import {Link,hashHistory} from 'react-router';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {userId: '', userName: '', email: '', password: ''};
        this.users = JSON.parse(localStorage.getItem('allUsers')) || [];
    }
    handleChange(event){
        this.setState({
            [event.target.dataset.field]: event.target.value
        });
    }
    handleSubmit(event){
        this.state.userId=Math.floor(Math.random(1)*100000);
        this.users.push(this.state);
        localStorage.setItem('allUsers' , JSON.stringify(this.users));
        localStorage.setItem('currentUser', JSON.stringify(this.state));
        this.setState({userName: '', email: '' , password: ''});
        alert('Your Account Is Created Successfully !');
        hashHistory.push('dashboard');
    }

    handleSignIn(event){
        console.log('sign In');
        hashHistory.push('/signIn');
    }
    render() {
        return (
            <div className="App">
                <Header />

                    <div class="row image-intro container">
                        <div className="col-lg-6">
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVZb7Sh8moZi0TL2ko0bRJQ88-bZCl6CUfig&usqp=CAU' width="500"></img>
                   </div>
                <div className="col-lg-6 app-modify container">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group inputContainer">
                            <label className="control-label" htmlFor="name">User Name:</label>
                            <input type="text" className="form-control  form-control-sm" id="name" placeholder="Enter Name"
                                   value={this.state.userName}
                                   data-field="userName" required
                                   onChange={this.handleChange.bind(this)}/>
                        </div>
                        <div className="form-group inputContainer">
                            <label className="control-label" htmlFor="email">Email:</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter Email"
                                   value={this.state.email}
                                   data-field="email" required
                                   onChange={this.handleChange.bind(this)}/>
                        </div>
                        <div className="form-group inputContainer">
                            <label htmlFor="password">Password</label>
                            <input type="text" className="form-control" id="password" placeholder="Password"
                                   value={this.state.password}
                                   data-field="password" required
                                   onChange={this.handleChange.bind(this)}/>
                        </div>
                        <div className="form-group inputContainer">
                        <button type="submit" className="btn btn-primary">Sign Up</button>
                        </div>
                        <div className="form-group inputContainer">
                        <span>_______or_______</span><br /><br />
                        <button className="btn btn-info" onClick={this.handleSignIn.bind(this)}>Sign In</button><br /><br />
                        </div>
                    </form>
               </div>
               </div>
               </div>
        );
    }
}


export default App;
