import React, { Component } from 'react';
import ItemCard from "./ItemCard"
import Completed from "./Completed"
import firebase from 'firebase';



class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: "",
      list: [],
      placeholder: "Add New Item",
      completed: [],
    };
  }

  componentDidMount() {
    const itemsRef = firebase.database().ref("items");
    itemsRef.on('value', (snapshot) => {
      let items = snapshot.val();
      let newState = [];
      for (let item in items) {
        newState.push(items[item].title);
      }
      this.setState({
        list: newState
      })
    })

  }

  consoleDBValues = () => {
    const itemsRef = firebase.database().ref("items");
    itemsRef.on('value', (snapshot) => {
      console.log(snapshot.val());
    })
  }

  //handling input field
  inputHandler = (e) => {
    this.setState({
      item: e.target.value,
    });
  };
  //handling adding to a list stored in the state.
  addToList = (e) => {
    e.preventDefault();
    const itemsRef = firebase.database().ref("items");
    const item = {
      title: this.state.item,
      list: this.state.list,
    };
    //added blank field stopper. space char overrides the check.
    if (this.state.item !== "") {
      itemsRef.push(item);
      this.setState({
        item: "",
        list: [...this.state.list, this.state.item],
      });
      return;
    }
  };

  removeItemFromDB(itemID) {
    const itemRef = firebase.database().ref(`/items/${itemID}`);
    itemRef.remove();
  }

  /**
   *
   * @param {number} index the index allows the user to be able to select the individual item from referenced array.
   * @param {array} list the array is imported with the list of todos, combine with index for deleteItem.
   */
  deleteItem = (index, list) => {
    let copiedList = [...list];
    let completedItem = copiedList.splice(index, 1);
    this.setState({
      list: [...copiedList],
      completed: [...this.state.completed, completedItem],
    });
    console.log(
      `Delete pressed on ${index} + ${list} and the new list is: ${copiedList} the completed item is `
    );
  };

  // clear the list:
  clearAllEntries = () => {
    this.setState({
      list: [],
    });
    return;
  };

  //enter key functionality:
  // enterPressed = (e) => {
  //     if (e.key === "Enter") {
  //         this.addToList();
  //     }

  // }

  render() {
    //  Adding Function for displaying array of items previously added:
    const { list, completed } = this.state;
    // const databaseItems = snapshot.val().map(item => { return <ItemCard item={item} /> })
    const mappingItems = list.map((item, index) => {
      return (
        <ItemCard
          item={item}
          index={index}
          key={index}
          deleteItem={this.deleteItem}
          list={list}
        />
      );
    });
    const mapCompleted = completed.map((item, index) => {
      return <Completed item={item} index={index} key={index} />;
    });

    return (
      <div>
        <h1> To Do List: </h1>
        <form onSubmit={this.addToList}>
          <input
            placeholder={this.state.placeholder}
            onChange={(e) => this.inputHandler(e)}
            value={this.state.item}
          />
          <button>Add to List</button>
          {/* <button onClick={this.clearAllEntries}>Clear List</button>

                    <button onClick={() => console.log(this.state.list)}>
                      Console Log the list:
                    </button> */}
        </form>
        <div>
          <h4> Here's your list:</h4>
          <ul>
            {list.length == 0 && completed.length >= 1
              ? "YOURE DOING GREAT, NOTHING HERE!"
              : mappingItems}
          </ul>
        </div>
        <div> <button onClick={this.consoleDBValues}>Log Items</button></div>
        <div>
          <h5> Look at you go!</h5>
          <ul>{mapCompleted}</ul>
          {/* <ul>{databaseItems}</ul> */}
        </div>
      </div>
    );
  }
}
 
export default ToDo;