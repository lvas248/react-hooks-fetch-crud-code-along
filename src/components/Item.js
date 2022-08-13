import React from "react";

function Item({ item, handleUpdateItem, handleDeletedItem }) {

  function handleAddToCartClick() {
    // add fetch request
    fetch(`http://localhost:4000/items/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isInCart: !item.isInCart,
      }),
    })
      .then((r) => r.json())
      .then((updatedItem) => handleUpdateItem(updatedItem));
  }

  function handleDeleteClick(deletedItem){
    fetch(`http://localhost:4000/items/${deletedItem.id}`, {
      method: "DELETE"
    })
    .then(res=> res.json())
    .then(data=> handleDeletedItem(item))
  }

  return (
    <li className={item.isInCart ? "in-cart" : ""}>
      <span>{item.name}</span>
      <span className="category">{item.category}</span>
      <button onClick={handleAddToCartClick} className={item.isInCart ? "remove" : "add"}>
        {item.isInCart ? "Remove From" : "Add to"} Cart
      </button>
      <button onClick={()=>handleDeleteClick(item)} className="remove">Delete</button>
    </li>
  );
}

export default Item;
