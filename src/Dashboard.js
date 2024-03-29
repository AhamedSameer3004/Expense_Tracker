import React, { Component } from 'react';
import './App.css';
import Header from './header.js';
import {Link,hashHistory} from 'react-router';

class Dashboard extends Component {
    constructor(props){
        super(props);
        this.myExpenses = [];
        this.allExpenses = JSON.parse(localStorage.getItem('allExpenses'));
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        if(this.allExpenses){
            this.allExpenses.forEach((expense)=>{
                if(expense.userId == this.user.userId){
                    this.myExpenses.push(expense);
                }
            });
        }
        this.state={expenses: this.myExpenses,filterText: ''};
        console.log('user :',this.user);
        console.log('myExpenses :',this.myExpenses);
    }
    handleChange(event){
        this.setState({filterText: event.target.value});
    }
    handleEdit(expense){
        console.log('expense for edit :',expense);
        hashHistory.push('edit/'+expense.Id);
    }
    handleDelete(deleteExpense){
        console.log('expense for Delete :',deleteExpense);
        this.state.expenses.forEach((expense,index)=> {
            if(expense.Id == deleteExpense.Id){
                this.index = index;
            }
        });
        this.state.expenses.splice(this.index,1);
        localStorage.setItem('allExpenses' , JSON.stringify(this.state.expenses));
        this.setState({expenses:JSON.parse(localStorage.getItem('allExpenses'))});
    }
    handleClicks(val,event){
        console.log('value:', val);
        console.log('event:', event);
        val == 'expense' ? hashHistory.push('/add') : hashHistory.push('/allCategories');

    }
    render() {
        let rows= [];
        let printRows = [];
        let reportExpense = [];
        this.state.expenses.forEach((expense)=>{
            if(expense.category.toUpperCase().indexOf(this.state.filterText) === -1 && expense.category.toLowerCase().indexOf(this.state.filterText) === -1){
                return;
            }
            rows.push(<ExpenseTable expense={expense} key={expense.Id}
                                    onEdit={this.handleEdit.bind(this)}
                                    onDelete={this.handleDelete.bind(this)}
            />);
            reportExpense.push(expense);
        });

        function generateReport() {
            let total = 0;
            let printContents = window.document.getElementById('expenses').innerHTML;
            for(var i=0;i<reportExpense.length;i++){
                total += +(reportExpense[i].amount);
            }
            const popupWin = window.open('', '_blank', 'width=600,height=600');
            function check() {
                if(popupWin.document) {
                    popupWin.document.title = "Expense Report";
                }
                else {
                    setTimeout(check, 10);
                }
            }
            check();
            popupWin.document.write('<html><title>Expense Report</title><link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css"><body onload="window.print()"><h3>My Expenses</h3>'+printContents+'</html>');
            popupWin.document.write('<br /> <span><b>Total Expense = '+ total +'</b></span>');
            popupWin.document.close();
        }
        return (
            <div className="App">
                <Header user={this.user}/>
                <div className="App-intro">
                    <div>
                        <h1>All Expenses</h1>
                        <button className="btn btn-danger" onClick={this.handleClicks.bind(this,'expense')}>Add Expense!</button>
                        <button className="btn btn-warning" onClick={this.handleClicks.bind(this,'categories')}>All Categories!</button>
                        <button className="btn btn-success" onClick={generateReport}>Generate Report</button>
                        <div className="row ">
                            <div className="col-md-4"></div>
                            <div className="col-md-4">
                            <input className="form-control" style={{marginTop: 5}}
                                type="text"
                                placeholder="Search By Category..."
                                value={this.state.filterText}
                                onChange={this.handleChange.bind(this)}
                            />
                            </div>
                        </div>
                        <div className="table-responsive" id="expenses">
                        <table className="table table-bordered table-hover table-border">
                            <tbody>
                            <tr>
                                <th className="table-border">Id</th>
                                <th className="table-border">Description</th>
                                <th className="table-border">Amount</th>
                                <th className="table-border">Category</th>
                                <th className="table-border">Created On</th>
                                <th className="table-border">Actions</th>
                            </tr>
                            {rows}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


class ExpenseTable extends Component {
    handleEdit(){
        this.props.onEdit(this.props.expense);
    }

    handleDelete(){
        this.props.onDelete(this.props.expense);
    }
    render() {
        let expense = this.props.expense;
        return (
            <tr>
                <td className="table-border">{expense.Id}</td>
                <td className="table-border">{expense.description}</td>
                <td className="table-border">{expense.amount}</td>
                <td className="table-border">{expense.category}</td>
                <td className="table-border">{expense.date}</td>
                <td className="table-border ButtonToolbar">
                    <button className="btn btn-success" onClick={this.handleEdit.bind(this)}>Edit</button>
                    <button className="btn btn-danger" onClick={this.handleDelete.bind(this)}>Delete</button>
                </td>
            </tr>
        )
    }
}
export default Dashboard;
