import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";

const ToDoApp = (props) => {
  const [toDoList, setToDoList] = useState(["one", "two"]);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayList, setDisplayList] = useState([]);

  // Populate from localstoarge if it exists
  useEffect(() => {
    if (window.localStorage && localStorage.getItem("rapptr_to_do_list")) {
      // local stoarge only takes strings
      // converting strings back to array
      const storedList = localStorage.getItem("rapptr_to_do_list").split(",");

      setToDoList(storedList);
    }
  }, []);

  const addLineItem = () => {
    const currentList = toDoList.slice();
    currentList.push("sample");
    updateLocalStorage(currentList);
    setToDoList(currentList);
  };

  useEffect(() => {
    setDisplayList(
      toDoList.filter((listItem) => listItem.indexOf(searchTerm) !== -1)
    );
  }, [searchTerm, toDoList]);

  const updateListItems = (listIndex, name) => {
    const updatedList = toDoList.map((listItem, index) => {
      if (index === listIndex) {
        return name;
      }
      return listItem;
    });
    // save it to lcoal stoarge
    updateLocalStorage(updatedList);
    setToDoList(updatedList);
  };

  const updateLocalStorage = (list) => {
    localStorage.setItem("rapptr_to_do_list", list);
  };

  const searchItems = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRemoveItem = (itemName) => {
    setToDoList(toDoList.filter((list) => list.indexOf(itemName) !== -1));
  };

  const handleLogOut = () => {
    console.log("logout");
    props.handleLogOut();
  };

  return (
    <div id="toDoList">
      <button id="logOutBtn" onClick={handleLogOut}>
        Log Out
      </button>
      <h3>My To-Do List</h3>
      <table>
        <tbody>
          <tr>
            <div className="listItems">
              <input type="text" placeholder="search" onChange={searchItems} />
              <button onClick={addLineItem}> New </button>
            </div>
          </tr>
          {displayList.map((item, index) => (
            <tr key={index}>
              <ListItem
                name={item}
                index={index}
                updateListItems={updateListItems}
                removeItem={handleRemoveItem}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ToDoApp;
