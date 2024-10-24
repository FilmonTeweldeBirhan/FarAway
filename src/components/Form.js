import { useState } from "react";

export default function Form({ onAddItem }) {
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
