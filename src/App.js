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
import { v4 as uuidv4 } from "uuid";

function App() {
  const [boards, setBoards] = useState([]);
  const [boardItem, setBoardItem] = useState([]);
  const [boardName, setBoardName] = useState([]);
  const [loading, setLoading] = useState(false);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemImage, setItemImage] = useState("");
  const boardRef = db.collection("boards");

  //GET BOARDS
  function GetBoards() {
    setLoading(true);
    boardRef.onSnapshot((querySnapshot) => {
      const boardsList = [];
      querySnapshot.forEach((doc) => {
        boardsList.push(doc.data());
      });
      setBoards(boardsList);
      setLoading(false);
    });
  }






  useEffect(() => {
    GetBoards();
  }, [GetBoards]);

  // ADD BOARD

  function AddBoards(newBoard) {
    boardRef
      .doc(newBoard.id)
      .set(newBoard)
      .catch((err) => {
        console.error(err);
      });
  }

  // ADD A BOARD ITEM
  /* function AddBoardItem(newBoardItem){
    boardRef
      .doc(board.id)
      .set(newBoardItem))
  }  */

  //DELETE BOARD
  function DeleteBoard(board) {
    boardRef
      .doc(board.id)
      .delete()
      .catch((err) => {
        console.error(err);
      });
  }

  // EDIT BOARD
  function EditBoard(updatedBoard) {
    setLoading();
    boardRef
      .doc(updatedBoard.id)
      .update(updatedBoard)
      .catch((err) => {
        console.error(err);
      });
  }

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
              boardName={boardName}
              setBoardName={setBoardName}
              itemName={itemName}
              setItemName={setItemName}
              itemImage={itemImage}
              setItemImage={setItemImage}
              itemDescription={itemDescription}
              setItemDescription={setItemDescription}
              loading={loading}
              setLoading={setLoading}
              AddBoards={AddBoards}
              EditBoard={EditBoard}
              DeleteBoard={DeleteBoard}
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
