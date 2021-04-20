import React from 'react';


export default function ItemCard(props) {
    //destructuring the props object to pass through the component: "Item"
    const { item, index, deleteItem, list} = props;
    let deleteFunction = () => {
       deleteItem(index, list)
   }

    return (
        <li>
           
           {item} <button onClick={deleteFunction}>X</button>
        </li>
    )
    
}
