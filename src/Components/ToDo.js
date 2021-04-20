import React, { Component } from 'react';
import ItemCard from "./ItemCard"

class ToDo extends Component {
  constructor(props) {
    super(props);
    this.state = {
        item: "",
        list: [],
        placeholder: "Add New Item",
      };
   
    }
    //handling input field 
    inputHandler = (e) =>{
      this.setState({
        item: e.target.value
      })
    }
    //handling adding to a list stored in the state. 
    addToList = (e) => {
        e.preventDefault();
        //added blank field stopper. space char overrides the check. 
        if (this.state.item !== '') {
            this.setState({
                item: '',
                list: [...this.state.list, this.state.item]
            })
            return;
        }
    }


    deleteItem =(index, list) =>{
        let copiedList = [...list]   
        copiedList.splice(index, 1)
        this.setState({
            list: [...copiedList]
        })
        console.log(`Delete pressed on ${index} + ${list} and the new list is: ${copiedList}`);
            
        }


    // clear the list: 
    clearAllEntries = () => {
        this.setState({
            list: []
        })
        return; 
    }

    //enter key functionality: 
    // enterPressed = (e) => {
    //     if (e.key === "Enter") {
    //         this.addToList(); 
    //     }
        
    // }

    render() {

        //  Adding Function for displaying array of items previously added: 
        const { list } = this.state;
        const mappingItems = 
            list.map((item, index) => {
                return (
                    <ItemCard
                        item={item}
                        index={index}
                        key={index}
                        deleteItem={this.deleteItem}
                        list={list}
                    />
                )
            }
            
            )
     
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
              <ul>{mappingItems}</ul>
            </div>
          </div>
        );
  }
}
 
export default ToDo;