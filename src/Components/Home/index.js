import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddForm from "../AddForm";

const Home = ({ boards, boardItem, setBoardItem }) => {
  return (
    <>
      <h1>Home</h1>
      <form>
        <h4>Boards</h4>
        {boards.map((board) => (
          <div>
            <AddForm boardId="FOO"></AddForm>

            <h2>{board.boardName}</h2>
            <li>{board.items[0].itemName}</li>
            <li>{board.items[0].itemDescription}</li>
            <li>
              <img
                width="200"
                height="auto"
                alt="the image"
                src={board.items[0].itemImage}
              />
            </li>
          </div>
        ))}

        <input
          type="text"
          name="boardItem"
          placeholder="Add A Board Item"
          onChange={(e) => setBoardItem(e.target.value)}
          value={boardItem}
        />
        <button type="submit">Add a item</button>
      </form>
    </>
  );
};

export default Home;
