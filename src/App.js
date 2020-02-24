import React, { Component } from "react";
import "./index.css";
import todosList from "./todos.json";
import { Route, NavLink } from "react-router-dom";
import TodoList from "./TodoList.js"
import { connect } from "react-redux";
import { addTodo, clearCompletedTodos } from "./actions";

class App extends Component {
  state = {
    todos: todosList
  };
  
  handleCreateTodo = event => {
    if (event.key === "Enter") {
      this.props.addTodo(event.target.value);
      event.target.value = "";
    }
  };

  handleClearCompletedTodos = event => {
    this.props.clearCompletedTodos();
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
          render={() => <TodoList todos={this.props.todos} />}
        />

        <Route
          path="/active"
          render={() => (
            <TodoList
              todos={this.props.todos.filter(todo => todo.completed === false)}
            />
          )}
        />

        <Route
          path="/completed"
          render={() => (
            <TodoList
              todos={this.props.todos.filter(todo => todo.completed === true)}
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
            </strong>{" "}
            item(s) left
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
          <button
            onClick={this.handleClearCompletedTodos}
            className="clear-completed"
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}
// ask connect to read certain values from the redux state
const mapStateToProps = state => {
  return {
    todos: state.todos  // array of todo objects
  };
};

const mapDispatchToProps = {
  addTodo,
  clearCompletedTodos
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
