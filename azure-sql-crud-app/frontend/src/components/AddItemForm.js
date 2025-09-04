import React, { useState } from "react";

export default function AddItemForm({ onSave }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSave({ name, description });
    setName(""); setDescription("");
  };

  return (
    <form className="card" onSubmit={submit}>
      <h2>Add Item</h2>
      <div className="row" style={{flexDirection: "column"}}>
        <input placeholder="Name *" value={name} onChange={e => setName(e.target.value)} />
        <textarea placeholder="Description" rows={3} value={description} onChange={e => setDescription(e.target.value)} />
        <div className="row">
          <button type="submit">Create</button>
        </div>
      </div>
    </form>
  );
}
