import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Components/Home";
import NavbarPage from "./Components/NavbarPage";
import About from "./Components/About";
import Contact from "./Components/Contact";
import db from "./firebaseConfig";
import "./App.css";
import AddForm from "./Components/AddForm";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

function App() {
  const [boards, setBoards] = useState([]);
  const [boardItem, setBoardItem] = useState([]);
  const fetchData = async () => {
    const boardsRes = await db.collection("boards").get();
    console.log(boardsRes);
    // TODO: Get the board ID. I think board.data() does not have the id, but board.id is there.
    //map board => {
    //    id: board.id,

    //       ...board.data(),
    // }
    const boardsData = boardsRes.docs.map((board) => board.data());
    // console.log(boardsData);
    setBoards(boardsData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MDBContainer size="lg">
      <Router>
        <Route path="/" component={NavbarPage} />
        <Route
          exact
          path="/"
          render={(props) => (
            <Home
              boards={boards}
              boardItem={boardItem}
              setBoardItem={setBoardItem}
            />
          )}
        />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
      </Router>
    </MDBContainer>
  );
}

export default App;

/* function App() {
  // const [boardName, setBoardName] = useState("");
  const [boardItem, setBoardItem] = useState([]);
  // const [board, setBoard] = useState([]);

  const fetchData = async () => {
    const boardsRes = await db.collection("boards").get();
    console.log(boardsRes);
    const boardsData = boardsRes.docs.map((board) => board.data());
    // console.log(boardsData);
    setBoards(boardsData);
  };

  const addBoardItem = (e) => {
    e.preventDefault();
    db.collection('boards')
      // .doc(bucketItem)
      .set({
        bucketItem: bucketItem,
        array: [bucketItem],
      });
    setBoardItem("");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1>Travel Bucket</h1>
      <h2>Your travel wishes...</h2>
      <form onSubmit={addBoardItem}>
        <h4>Boards</h4>
        {boards.map((board) => (
          <div>
            <li>{board.items}</li>
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
}

export default App; */
