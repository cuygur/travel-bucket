import React from 'react';
import db from '../firebaseConfig';

const AddForm = () => {
  const [isShown, setIsShown] = React.useState(false);
    const [itemName, setItemName] = React.useState("")
    const [itemDescription, setItemDescription] = React.useState("");
    // TODO: image url also needs a state.
  const addBoardItem = (e) => {
    e.preventDefault();
    db.collection('boards')
      // .doc(bucketItem)
      .set({
        // bucketItem: bucketItem,
        // array: [bucketItem],
      });
  };

  const handleShowClick = () => {
    setIsShown(true);
  }
    // TODO: handle click of save button to set into Firebase.
    return (
<div>
{!isShown && <button onClick={handleShowClick}>Show add form</button>}
{isShown && 
<>
{/* Add three inputs using MDB, and onChange you will update the state */}
    <button>Save</button>
    </>}
</div>
    );
}

export default AddForm;