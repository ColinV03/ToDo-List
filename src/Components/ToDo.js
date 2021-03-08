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
      this.inputHandler = this.inputHandler.bind(this);
    }
    //handling input field 
    inputHandler(e) {
      this.setState({
        item: e.target.value
      })
    }
    //handling adding to a list stored in the state. 
    addToList = () => {
        console.log("adding")
        this.setState({
            item: '',
            list: [...this.state.list, this.state.item]
        })
        return;
    }

    render() {

        //  Adding Function for displaying array of items previously added: 
        const { list } = this.state;
        const mappingItems = 
            list.map((item, index) => {
                return (
                    <ItemCard
                    item={item}
                    index={index}
                    />
                )
            }
            
            )
     
        return (
          <div>
            <input
              placeholder={this.state.placeholder}
              onChange={(e) => this.inputHandler(e)}
              value={this.state.item}
            />

            <button onClick={() => this.addToList()}> Add to List</button>
            <button onClick={() => console.log(this.state.list)}>
              Console Log the list:{" "}
            </button>
            <p> To Do List: </p>
            <div>
              <ul>{mappingItems}</ul>
            </div>
          </div>
        );
  }
}
 
export default ToDo;