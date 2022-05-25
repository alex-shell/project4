import React, { useState } from "react";
import uuid from "react-uuid";
import Item from "./Item.js";

export default function Shop() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [showError, setShowError] = useState(false);

  const addItem = (event) => {
    event.preventDefault();
    if (!title || !description) {
      setShowError(true);
      return;
    }
    setItems([...items, { name: title, desc: description, id: uuid() }]);
    setTitle("");
    setDescription("");
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const onTitleChange = (event) => {
    setShowError(false);
    setTitle(event.target.value);
  };

  const onDescriptionChange = (event) => {
    setShowError(false);
    setDescription(event.target.value);
  };

  return (
    <>
      <form onSubmit={addItem}>
        <div>
          <input
            value={title}
            onChange={onTitleChange}
            type="text"
            placeholder="Название товара"
            className="ui-textfield"
          />
        </div>
        <div>
          <input
            value={description}
            onChange={onDescriptionChange}
            type="text"
            placeholder="Описание товара"
            className="ui-textfield"
          />
        </div>
        <div className="form-footer">
          <div className="validation">
            {showError && "Заполнены не все обязательные поля"}
          </div>
          <input type="submit" className="ui-button" value="Добавить" />
        </div>
      </form>

      <div>
        {items.length === 0 && (
          <p className="ui-title">Добавьте первый товар</p>
        )}
      </div>

      <ul className="ui-list">
        {items.map((item) => (
          <li className="ui-item-list" key={item.id}>
            <Item info={item} />
            <button onClick={() => deleteItem(item.id)} className="item-button">
              Удалить
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
