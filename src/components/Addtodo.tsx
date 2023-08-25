'use client'

import { FormEvent, useState, useEffect } from "react";
import { useTodos, Todo } from "@/store/todos";

interface TodoItem {
  id: string;
  completed: boolean;
  task: string;
}

export function AddTodo() {
  const [todo, setTodo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { todos, handleAddTodo, toggleTodoAsCompleted, handleDeleteTodo, searchTodos } = useTodos();
  const [search, setSearch] = useState(false);
  const [searchResults, setSearchResults] = useState<TodoItem[]>([]);

  useEffect(() => {
    if (searchQuery) {
      const results = searchTodos(searchQuery);
      setSearchResults(results);
      setSearch(true);
    } else {
      setSearchResults([]);
      setSearch(false);
    }
  }, [searchQuery, searchTodos]);

  function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleAddTodo(todo);
    setTodo("");
  }

  function handleSearchFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (searchQuery) {
      setSearch(true);
    } else {
      setSearch(false);
    }
    setSearchQuery("");
  }

  return (
    <div>
      <h3 style={{"textAlign":"center"}}>Add Todos</h3>
      <form onSubmit={handleFormSubmit} style={{ background: "grey", textAlign:"center"}}>
        <input
          type="text"
          placeholder="Write your todo"
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        /><br/>
        <button type="submit">ADD</button>
      </form>

      <h3 style={{"textAlign":"center"}}>Search Todos</h3>
      <form onSubmit={handleSearchFormSubmit} style={{ background: "grey" , textAlign:"center"}}>
        <input
          type="text"
          placeholder="Search for todos"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
      </form>

      {search && (
        <>
          <p style={{ justifyContent: "center", alignItems : "center" , textAlign:"center"}}>Search results:</p>
          <ul className="main-task">
            {searchResults.length > 0 ? (searchResults.map((todo: TodoItem) => (
              <li key={todo.id}>
                <input
                  type="checkbox"
                  id={`todo-${todo.id}`}
                  checked={todo.completed}
                  onChange={() => {
                    console.log(todo.completed);
                    toggleTodoAsCompleted(todo.id);
                  }}
                />
                <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>
                {todo.completed && (
                  <button type="button" onClick={() => handleDeleteTodo(todo.id)}>
                    Delete
                  </button>
                )}
              </li>
            ))
            ) :(<li>No match found</li>)
        }
          </ul>
        </>
      )}
    </div>
  );
}

export default AddTodo;
