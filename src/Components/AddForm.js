import React from "react";
import db from "../firebaseConfig";
import "../App.css";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

const AddForm = ({ board }) => {
  const [isShown, setIsShown] = React.useState(false);
  const [itemName, setItemName] = React.useState("");
  const [itemDescription, setItemDescription] = React.useState("");
  const [itemImage, setItemImage] = React.useState("");
  const [isCompleted,setIsCompleted]= React.useState(false);

  function addBoardItem(oldBoard, newBoardItem) {
    const newBoard = {
      ...oldBoard
    }
    newBoard.items.push(newBoardItem)
    db.collection("boards")
      .doc(oldBoard.id)
      .set(newBoard)
      .catch((err) => {
        console.error(err);
      });
  }
 
  const handleShowClick = () => {
    setIsShown(true);
  };

  // TODO: handle click of save button to set into Firebase.
   const handleClick = () => {
    addBoardItem(board, {
      name: itemName,
      description: itemDescription,
      image:itemImage
    })
  }
  return (
    <div>
      {!isShown && <button onClick={handleShowClick}>Show add form</button>}
      {isShown && (
        <>
          {
            /* Add three inputs using MDB, and onChange you will update the state */
            <>
              <input
                type="text"
                value={itemName}
                placeholder="Your travel wish"
                onChange={(e) => setItemName(e.target.value)}
              />
              <input
                type="text"
                value={itemDescription}
                placeholder="Describe your wish"
                onChange={(e) => setItemDescription(e.target.value)}
              />
              <input
                type="text"
                value={itemImage}
                placeholder="Add a photo"
                onChange={(e) => setItemImage(e.target.value)}
              />
            </>
          }
          <button onClick={handleClick}>Save your wish</button>
        </>
      )}
    </div>
  );
};

export default AddForm;
