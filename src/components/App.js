import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {
  const [items, setItems] = useState([]);

  const addItem = (newItems) => {
    setItems((prevItems) => [...prevItems, newItems]);
  };

  const removeItem = (id) => {
    setItems((currItems) => currItems.filter((item) => item.id !== id));
  };

  const toggleItem = (id) => {
    setItems((currItems) =>
      currItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const clearItems = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure you want to delete all your items.")) {
      setItems([]);
    }
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={addItem} />
      <PackingList
        onRemoveItem={removeItem}
        onToggleItem={toggleItem}
        onClearItems={clearItems}
        items={items}
      />
      <Stats items={items} />
    </div>
  );
}
