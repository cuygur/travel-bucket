import React from "react";
import db from "../firebaseConfig";
import "../App.css";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

const AddForm = ({ boards, boardItems }) => {
  const [isShown, setIsShown] = React.useState(false);
  const [itemName, setItemName] = React.useState("");
  const [itemDescription, setItemDescription] = React.useState("");
  const [itemImage, setItemImage] = React.useState("");
  // TODO: image url also needs a state.

  const addBoardItem = (e) => {
    e.preventDefault();
    db.collection("boards")
      // .doc(bucketItem)
      .set({
        // itemName: bucketItem,
        // array: [bucketItem],
      });
  };

  const handleShowClick = () => {
    setIsShown(true);
  };
  // TODO: handle click of save button to set into Firebase.
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
          <button>Save</button>
        </>
      )}
    </div>
  );
};

export default AddForm;
