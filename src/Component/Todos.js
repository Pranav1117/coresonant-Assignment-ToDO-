import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/style.css";
import editIcon from "../media/edit.png";
import deleteIcon from "../media/delete.png";
import markComplete from "../media/done.webp";

const Todos = () => {
  const [todos, setTodos] = useState([]);

  const [upTitle, setUpTitle] = useState(null);

  const [upId, setUpId] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);

  const [markedToggle, setMarkedToggle] = useState(false);

  const [newTodo, setNewTodo] = useState("");

  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users/1/todos"
      );
      setTodos(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTodos();

    console.log(todos);
  }, []);

  const toggleCompleted = () => {
    setMarkedToggle(!markedToggle);
  };

  const handleEdit = (id) => {
    setShowEditModal(true);

    const t = todos.filter((item, index) => {
      return item.id === id;
    });

    setUpTitle(t[0].title);
    setUpId(t[0].id);

    console.log(t);
  };

  const handleComplete = (id) => {
    const updatedTodos = todos.map((item) => {
      if (item.id === id) {
        return { ...item, completed: true };
      }
      return item;
    });

    setTodos(updatedTodos);
  };

  const handleDelete = (id) => {
    const updatedTodos = todos.filter((item, index) => {
      return item.id !== id;
    });

    setTodos(updatedTodos);
  };

  const handleOnChange = (e, up) => {
    setUpTitle(e.target.value);
  };

  const handleEditDone = (e, id) => {
    e.preventDefault();

    const updatedArray = todos.map((item) =>
      item.id === id ? { ...item, title: upTitle } : item
    );
    setTodos(updatedArray);
    setShowEditModal(false);
  };

  const newTodoOnChnage = (e) => {
    const n = {
      completed: false,
      id: Date.now(),
      title: e.target.value,
      userId: 1,
    };
    setNewTodo(n);
  };

  const handleAddNewTodo = (e) => {
    if (newTodo.title && newTodo.title.trim() !== "") {
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setNewTodo("");
    } else {
      alert("Empty Task cannot be added");
    }
  };

  return (
    <>
      <header className="header">
        <h1>Todos</h1>
      </header>

      <div className={`main ${showEditModal ? "blur-back" : ""}`}>
        <div className="heading">Add New Task</div>
        <div className="new-task-wrapper">
          <input
            type="text"
            placeholder="add new task here..."
            className="new-task-input"
            onChange={newTodoOnChnage}
          />
          <button className="new-task-btn" onClick={handleAddNewTodo}>
            Add
          </button>
        </div>
        <hr className="hr" />

        <div className="toggle" onClick={toggleCompleted}>
          <button>
            {" "}
            {markedToggle ? `Show All Task` : "Show Completed Task"}
          </button>
        </div>

        {todos.length > 0 && markedToggle
          ? todos
              .filter((item) => item.completed)
              .map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`list-wrapper ${
                      todos[index].completed ? "mark-done" : ""
                    } ${markedToggle ? "line" : ""}`}
                  >
                    <p className="list-item">{item.title}</p>
                    <div className="btn-wrapper">
                      <button
                        onClick={() => {
                          handleEdit(item.id);
                        }}
                      >
                        <img src={editIcon} alt="logo" />
                      </button>

                      <button
                        onClick={() => {
                          handleComplete(item.id);
                        }}
                      >
                        <img src={markComplete} alt="logo" />
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                      >
                        <img src={deleteIcon} alt="logo" />
                      </button>
                    </div>
                  </div>
                );
              })
          : ""}

        {todos.length > 0 && !markedToggle
          ? todos.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`list-wrapper ${
                    todos[index].completed ? "mark-done" : ""
                  }`}
                >
                  <p className="list-item">{item.title}</p>
                  <div className="btn-wrapper">
                    <button
                      onClick={() => {
                        handleEdit(item.id);
                      }}
                    >
                      <img src={editIcon} alt="logo" />
                    </button>

                    <button
                      onClick={() => {
                        handleComplete(item.id);
                      }}
                    >
                      <img src={markComplete} alt="logo" />
                    </button>
                    <button
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                    >
                      <img src={deleteIcon} alt="logo" />
                    </button>
                  </div>
                </div>
              );
            })
          : ""}
      </div>

      {showEditModal ? (
        <div className="edit-modal">
          <div className="edit-modal-title">
            <p>Edit</p>
            <p
              onClick={() => {
                setShowEditModal(false);
              }}
              className="close-edit"
            >
              +
            </p>
          </div>
          <hr className="edit-hr" />
          <div className="edit-input-wrapper">
            <input
              type="text"
              placeholder={upTitle}
              onChange={(e) => {
                handleOnChange(e, upTitle);
              }}
            />
            <button
              onClick={(e) => {
                handleEditDone(e, upId);
              }}
            >
              Done
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Todos;
