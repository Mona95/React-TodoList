import React , {Component} from 'react';
import {TodoBanner} from './TodoBanner';
import {TodoRow} from './TodoRow';
import {TodoCreator} from './TodoCreator';
import {VisibilityControl} from './VisibilityControl';
import { directive } from '@babel/types';
//import logo from './logo.svg';
//import './App.css';

export default class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      userName : "Mona",
      todoItems : [{action:"Buy Flowers", done : true},
                  {action: "Registering", done: false},
                  {action: "Go to Airport", done: false},
                  {action: "Reading a book", done: true}],
      showCompleted : true
    }
  }

  updateNewTextValue = (event) => {
          this.setState({newItemText : event.target.value});
  }

  createNewTodo = (task) => {
    if(!this.state.todoItems.find(item => item.action === task)){
      this.setState({
        todoItems : [...this.state.todoItems , {action : task , done: false}],
      }, () => localStorage.setItem("todos", JSON.stringify(this.state)));
    }
  }

  changeStateData = () => {
    this.setState({
      userName : this.state.userName === "Mona" ? "Mostafa" : "Mona"
    })
  }

  toggleTodo = (todo) => 
    this.setState({
      todoItems : this.state.todoItems.map(item => item.action === todo.action ? { ...item, done: !item.done} : item)
    })

    todoTableRow = (doneValue) => this.state.todoItems.filter(
      item => item.done === doneValue).map( item => 
        <TodoRow key={item.action} item={item} callback={this.toggleTodo} deleteItem={
          this.deleteItem}/>
      );

    componentDidMount = () => {
      let data = localStorage.getItem("todos");
      this.setState( data != null ? JSON.parse(data) : {
        userName : "Mona",
      todoItems : [{action:"Buy Flowers", done : true},
                  {action: "Registering", done: false},
                  {action: "Go to Airport", done: false},
                  {action: "Reading a book", done: true}],
      showCompleted : true
      });
    }

    
    deleteItem = (deletedItem) => {
      let newItems = this.state.todoItems.filter( (item) => {
        return item !== deletedItem
      });
      this.setState({
        todoItems : newItems
      }, () => localStorage.setItem("todos", JSON.stringify(newItems)))
  }

  render = () => {
   return (
     <div className="container">
       <TodoBanner name={this.state.userName} tasks={this.state.todoItems}/>
        <div className="container">
          <TodoCreator callback={this.createNewTodo}/>
          <table className="table table-striped table-bordered">
            <thead>
              <tr><th>Description</th><th>Done</th><th>Options</th></tr>
            </thead>
            <tbody>{this.todoTableRow(false)}</tbody>
          </table>
          <div className="bg-secondary text-white text-center p-2">
            <VisibilityControl description="Completed Tasks"
             isChecked = {this.state.showCompleted}
             callback={ (checked) => this.setState({showCompleted : checked})}/>
          </div>
          {this.state.showCompleted && 
           <table className="table table-striped table-bordered">
           <thead>
             <tr><th>Description</th><th>Done</th><th>Options</th></tr>
           </thead>
           <tbody>{this.todoTableRow(true)}</tbody>
         </table>
          }
        </div>
       <button className="btn btn-primary m-2 center"
                onClick={this.changeStateData}>
         Change 
       </button>
     </div>
   )
  };
}
