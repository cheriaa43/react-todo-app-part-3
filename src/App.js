import React, { Component } from "react";
import "./index.css";
import todosList from "./todos.json";
import { Route, NavLink } from "react-router-dom";
import TodoList from "./TodoList.js"

class App extends Component {
  state = {
    todos: todosList
  };

  handleClearCompletedTodos = event => {
    const newTodoList = this.state.todos.filter(todo => {
      if (todo.completed === true) {
        return false;
      }
      return true;
    });
    this.setState({ todos: newTodoList });
  };

  handleDeleteTodo = (event, todoIdToDelete) => {
    const newTodoList = this.state.todos.filter(todo => {
      if (todo.id === todoIdToDelete) {
        return false;
      }
      return true;
    });
    this.setState({ todos: newTodoList });
  };

  handleToggleTodo = (event, todoIdToToggle) => {
    const newTodoList = this.state.todos.map(todo => {
      if (todo.id === todoIdToToggle) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    this.setState({ todos: newTodoList });
  };

  handleCreateTodo = event => {
    if (event.key === "Enter") {
      const newTodo = {
        userId: 1,
        id: Math.floor(Math.random() * 1000000),
        title: event.target.value,
        completed: false
      };
      const newTodoList = this.state.todos.slice();
      newTodoList.push(newTodo);
      this.setState({ todos: newTodoList });
      event.target.value = "";
    }
  };
  
  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autoFocus
            onKeyDown={this.handleCreateTodo}
          />
        </header>

        <Route
          exact
          path="/"
          render={() => (
            <TodoList
              todos={this.state.todos}
              handleToggleTodo={this.handleToggleTodo}
              handleDeleteTodo={this.handleDeleteTodo}
              
            />
          )}
        />

        <Route
          path="/active"
          render={() => (
            <TodoList
              todos={this.state.todos.filter(todo => todo.completed === false)}
              handleToggleTodo={this.handleToggleTodo}
              handleDeleteTodo={this.handleDeleteTodo}
            />
          )}
        />

        <Route
          path="/completed"
          render={() => (
            <TodoList
              todos={this.state.todos.filter(todo => todo.completed === true)}
              handleToggleTodo={this.handleToggleTodo}
              handleDeleteTodo={this.handleDeleteTodo}
            />
          )}
        />

        <footer className="footer">
          {/* <!-- This should be `0 items left` by default --> */}
          <span className="todo-count">
            <strong>
              {
                this.state.todos.filter(todo => {
                  if (todo.completed === false) {
                    return true;
                  }
                  return false;
                }).length
            }
            </strong>
            {" "} item(s) left
          </span>
          <ul className="filters">
            <li>
              <NavLink exact to="/" activeClassName="selected">
                All
                </NavLink>
            </li>
            <li>
              <NavLink exact to="/active" activeClassName="selected">
                Active
                </NavLink>
            </li>
            <li>
              <NavLink exact to="/completed" activeClassName="selected">
                Completed
                </NavLink>
            </li>
          </ul>
          <button onClick={this.handleClearCompletedTodos} className="clear-completed">
            Clear completed
            </button>
        </footer>
      </section>
    );
  }
}

export default App;
