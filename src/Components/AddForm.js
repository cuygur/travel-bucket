import React from "react";
import db from "../firebaseConfig";
import "../App.css";
import {
  MDBBtn,
  MDBCardGroup,
  MDBCardBody,
  MDBCard,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBInput,
} from "mdbreact";


//REMAINDER:This file has;
//Add Board Items function and Add Board Items Button (shows add items for regarding user clicks button or not)

const AddForm = ({ board }) => {
  const [isShown, setIsShown] = React.useState(false);
  const [itemName, setItemName] = React.useState("");
  const [itemDescription, setItemDescription] = React.useState("");
  const [itemImage, setItemImage] = React.useState("");
  const [isCompleted, setIsCompleted] = React.useState(false);

  function addBoardItem(oldBoard, newBoardItem) {
    const newBoard = {
      ...oldBoard,
    };
    newBoard.items.push(newBoardItem);
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

  const handleClick = () => {
    addBoardItem(board, {
      name: itemName,
      description: itemDescription,
      image: itemImage,
    });
  };
  return (
    <MDBCardGroup>
      <MDBCard>
        <div>
          {!isShown && (
            <MDBBtn size="md" onClick={handleShowClick}>
              Add More Wishes
            </MDBBtn>
          )}

          {isShown && (
            <MDBCardBody>
              <>
                {
                  <>
                    <MDBInput
                      type="text"
                      value={itemName}
                      label="Your travel wish"
                      onChange={(e) => setItemName(e.target.value)}
                    />
                    <MDBInput
                      type="text"
                      value={itemDescription}
                      label="Describe your wish"
                      onChange={(e) => setItemDescription(e.target.value)}
                    />
                    <MDBInput
                      type="text"
                      value={itemImage}
                      label="Add a photo"
                      onChange={(e) => setItemImage(e.target.value)}
                    />
                  </>
                }
                <MDBBtn size="md" onClick={handleClick}>
                  Save your wish
                </MDBBtn>
              </>
            </MDBCardBody>
          )}
        </div>
      </MDBCard>
    </MDBCardGroup>
  );
};

export default AddForm;
