import React, { Component } from 'react';
import './App.css';
import Header from './header.js';
import {Link,hashHistory} from 'react-router';

class AddCategory extends Component {
    constructor(props){
        super(props);
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.categories = JSON.parse(localStorage.getItem('allCategories')) || [];
        this.state = { Id: '', userId: this.user.userId, categoryName: '' , date: ''};
    }
    handleSubmit(event) {
            this.state.date= new Date().toLocaleString();
            this.state.Id=Math.floor(Math.random(1)*100000);
            this.categories.push(this.state);
            this.setState({categoryName: ''});
            localStorage.setItem('allCategories' , JSON.stringify(this.categories));
            alert('Category Is Added !');
            event.preventDefault();
    }
    handleChange(event) {
        this.setState({categoryName : event.target.value, date: new Date()});
    }

    render() {
        return (
            <div className="App">
                <Header backPage='categories' user={this.user}/>
                <div className="App-intro">
                    <h1>Add Category</h1>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div className="form-group">
                        <label className="control-label" htmlFor="name">Category Name:</label>
                        <input type="text" className="form-control" id="name" placeholder="Category Name"
                               value={this.state.categoryName}
                               onChange={this.handleChange.bind(this)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Add</button>

                    </form>
                </div>
            </div>
        );
    }
}


export default AddCategory;
