import React, { useState, useEffect } from "react";
import "./style.css";

//Get the local storage data back
const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  }
  else {
    return [];
  }
}

const Todo = () => {
  const [inputData, setInputData] = React.useState("");
  const [items, setitems] = React.useState(getLocalData());
  const [isEditItem, setIsEditItem] = React.useState("");
  const [toggleButton, settoggleButton] = React.useState(false);

  //Add the items

  const addItems = () => {
    if (!inputData) {
      alert("please fill the data");
    }
    else if (inputData && toggleButton) {
      setitems(items.map((curElem) => {
        if (curElem.id == isEditItem) {
          return { ...curElem, name: inputData }
        }
        return curElem;
      }))

      setInputData([]);
      setIsEditItem(null);
      settoggleButton(false);
    }
    else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      }
      setitems([...items, myNewInputData]);
      setInputData("");
    }
  }

  //Editing the items

  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id == index;
    })
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    settoggleButton(true);
  }

  //Delete the items

  const deleteItems = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    })
    setitems(updatedItems);
  }

  //Remove all the items

  const removeAll = () => {
    setitems([]);
  }

  //Adding localStorage

  React.useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items)) //localstorage ma hami le key ra value dinu parcha ani value chai jaela pani string ko form ma hunu parcha hamro items chai array ko form ma bhayera hami le string ma convert gareko ho.
  }, [items])




  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.svg" alt="image not found" />
            <figcaption>Add Your List Here </figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="Add Item"
              className="form-control"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
            />
            {toggleButton ? (<i className="far fa-edit add-btn" onClick={addItems}></i>) :
              (<i className="fa fa-plus add-btn" onClick={addItems}></i>)}
          </div>

          {/* show our items  */}

          <div className="showItems">
            {
              items.map((curElem) => {
                return (
                  <div className="eachItem" key={curElem.id}>
                    <h3>{curElem.name}</h3>
                    <div className="todo-btn">
                      <i className="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                      <i className="far fa-trash-alt add-btn" onClick={() => deleteItems(curElem.id)}></i>
                    </div>
                  </div>
                )
              })
            }
          </div>

          {/* remove all button  */}

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}>
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;