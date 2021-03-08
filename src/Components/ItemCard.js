import React from 'react';


export default function ItemCard(props) {
    //destructuring the props object to pass through the component: "Item"
    const { item } = props;
    return (
        <li>
            <div>{item}</div>
        </li>
    )
    
}
