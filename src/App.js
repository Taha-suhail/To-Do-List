import React, { useState, useEffect } from "react";
import "./App.css";
import ToDoList from "./component/TODOLIST/ToDoList";
import DateTimeDisplay from "./component/DATETIME/DateTimeDisplay";
import { MdLightMode, MdDarkMode } from "react-icons/md";
function App() {
  const [input, setInput] = useState("");
  const [item, setItem] = useState([]);
  const [theme, SetTheme] = useState("light");
  // getting items from local Storage
  useEffect(() => {
    try {
      // Load items from local storage when the component mounts
      const storedItems = JSON.parse(localStorage.getItem("todoItems"));

      if (storedItems) {
        setItem(storedItems);
      }
    } catch (error) {
      console.error("Error loading items from local storage:", error); // Log any errors
    }
  }, []);

  // setting items to local storage
  useEffect(() => {
    try {
      // Save items to local storage whenever the items state changes
      if (item.length === 0) {
        localStorage.clear();
      }
      if (item.length !== 0) {
        localStorage.setItem("todoItems", JSON.stringify(item));
      }
      // Log saved items
    } catch (error) {
      console.error("Error saving items to local storage:", error); // Log any errors
    }
  }, [item]);


  // insert new task
  const insertItem = () => {
    if (input === "") {
      return null;
    }
    setItem((prevItem) => {
      return [...prevItem, input]; // spread operator
    });
    setInput("");
  };

  // delete a task
  const deleteItem = (index) => {
    setItem((prevItem) => {
      const updatedItems = prevItem.filter((item, i) => i !== index);
      console.log("Updated items after deletion:", updatedItems);
      return updatedItems;
    });
  };

  //use for updating the value pass as a prop to the todolist component
  const handleEdit = (id, newValue) => {
    // logic to update the task with the new value
    setItem((prevItem) => {
      return prevItem.map((item, index) => {
        if (index === id) {
          return newValue;
        }
        return item;
      });
    });
  };

  // change the theme of the app 
  const changeTheme = () => {
    SetTheme(theme === "light" ? "dark" : "light");
    if (theme === "light") {
      document.body.style.backgroundImage =
        "linear-gradient(to right top, #ffffff, #dddaff, #b4b7ff, #7f97ff, #007aff)";
    } else {
      document.body.style.backgroundImage =
        "linear-gradient(to right top, #000000, #100c0b, #1a1512, #201c16, #23251c)";
    }
  };

  return (
    <div className="container">
      <div className="theme-container">
        {theme === "light" ? (
          <MdLightMode className="light_theme" onClick={changeTheme} />
        ) : (
          <MdDarkMode className="dark_theme" onClick={changeTheme} />
        )}
      </div>

      <div className="center">
        <h1>To-Do List</h1>

        <div className="inputs">
          <input
            type="text"
            placeholder="Add a task."
            onChange={(e)=>setInput(e.target.value)}
            value={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                insertItem();
              }
            }}
          />

          <button onClick={insertItem}>I Got This!</button>
        </div>
        <DateTimeDisplay />
        {item.length === 0 ? (
          <h3>Lets complete our goals.</h3>
        ) : (
          <div className="whole_items">
            <ol>
              {item.map((item, index) => {
                return (
                  <ToDoList
                    key={index}
                    item={item}
                    id={index}
                    onSelect={deleteItem}
                    onEdit={handleEdit}
                  />
                );
              })}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
