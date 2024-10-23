import { useState } from "react";

/* const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Charger", quantity: 1, packed: true },
]; */

export default function App() {
  const [items, setItems] = useState([]);

  const addItem = (newItems) => {
    setItems((prevItems) => [...prevItems, newItems]);
  };

  const removeItem = (id) => {
    setItems((currItems) => currItems.filter((item) => item.id !== id));
  };

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={addItem} />
      <PackingList onRemoveItem={removeItem} items={items} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>;
}

function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(ev) {
    ev.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItem(newItem);

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip? 🤩</h3>
      <select
        value={quantity}
        onChange={(ev) => setQuantity(Number(ev.target.value))}
      >
        {Array.from({ length: 20 }, (_, index) => (
          <option key={index} value={index + 1}>
            {index + 1}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Input your items..."
        value={description}
        onChange={(ev) => setDescription(ev.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({ onRemoveItem, items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item, i) => {
          return <Item onRemoveItem={onRemoveItem} item={item} key={item.id} />;
        })}
      </ul>
    </div>
  );
}

function Item({ onRemoveItem, item }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {" "}
        {item.quantity} {item.description}
      </span>
      <button onClick={(ev) => onRemoveItem(item.id)}>❌</button>
    </li>
  );
}

function Stats() {
  return (
    <footer className="stats">
      <em>🧳 You have X items on your list, and you already packed x (x%)</em>
    </footer>
  );
}
