import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AddForm from "../AddForm";
import { v4 as uuidv4 } from "uuid";

const Home = ({
  boards,
  boardItem,
  setBoardItem,
  boardName,
  setBoardName,
  itemName,
  setItemName,
  itemImage,
  setItemImage,
  itemDescription,
  setItemDescription,
  loading,
  setLoading,
  AddBoards,
  EditBoard,
  DeleteBoard,
}) => {
  return (
    <>
      <h3>Add A New Travel Bucket</h3>
      <div className="boardInputBox">
        <input
          type="text"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          placeholder="New Travel Bucket"
        />
        <br />
        <br />
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Your Travel Wish"
        />
        <br />
        <br />
        <input
          type="text"
          value={itemImage}
          onChange={(e) => setItemImage(e.target.value)}
          placeholder="Visualize your wish"
        />
        <br />
        <br />
        <textarea
          value={itemDescription}
          onChange={(e) => setItemDescription(e.target.value)}
          placeholder="Describe your wish"
        />
        <br />
        <br />
        <button
          onClick={() =>
            AddBoards({
              boardName: boardName,
              id: uuidv4(),
              itemName: itemName,
              itemDescription: itemDescription,
              itemImage: itemImage,
            })
          }
        >
          Add Your Bucket
        </button>
      </div>
      <hr />
      {loading ? <h1>Loading...</h1> : null}
      {boards.map((board) => (
        <div className="board" key={board.id}>
          <h2>{board.boardName}</h2>
          {board.items && board.items.map((k) => JSON.stringify(k))}
          <h3>{board.itemName}</h3>
          <img
            src={board.itemImage}
            alt="Travel wish visual"
            title="Travel wish visual"
          />
          <p>{board.itemDescription}</p>

<AddForm board={board}/>
          <div>
            <button
              onClick={() =>
                EditBoard({
                  boardName,
                  itemDescription,
                  itemImage,
                  itemName,
                  id: board.id,
                })
              }
            >
              Edit
            </button>
            <button onClick={() => DeleteBoard(board)}>Delete</button>
            <hr />
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
