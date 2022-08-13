import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((items) => setItems(items));
  }, []);

  function handleUpdateItem(updatedItem){
      const updatedItems = items.map( item =>{
        if(item.name === updatedItem.name){
          return updatedItem
        }else{
          return item
        }
    })
    setItems(updatedItems)
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }
  function handleAddItem(obj){
    setItems([...items, obj])
  }
  function handleDeletedItem(deletedItem){
    const updatedItems = items.filter( item =>{
      return item.id !== deletedItem.id
    })
    setItems(updatedItems)
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm handleAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} handleDeletedItem={handleDeletedItem} handleUpdateItem={handleUpdateItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
