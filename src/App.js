import React, { useState, useEffect } from "react";
import db from "./firebaseConfig";
import "./App.css";

function App() {
  const [bucketItem, setBucketItem] = useState("");
  const [buckets, setBuckets] = useState([]);

  const fetchData = async () => {
    const bucketsRes = await db.collection("buckets").get();
    console.log(bucketsRes);
    const bucketsData = bucketsRes.docs.map((bucket) => bucket.data());
    console.log(bucketsData);
    setBuckets(bucketsData);
  };

  const addBucket = (e) => {
    e.preventDefault();
    db.collection("buckets")
      .doc(bucketItem)
      .set({
        bucketItem: bucketItem,
        array: [bucketItem],
      });
    setBucketItem("");
  };

  useEffect(() => {
    fetchData();
  }, [bucketItem]);

  return (
    <>
      <h1>Travel Bucket</h1>
      <h2>Your travel wishes...</h2>
      <form onSubmit={addBucket}>
        <h4>Buckets</h4>
        {buckets.map((bucket) => (
          <div>
            <li>{bucket.bucketItem}</li>
          </div>
        ))}

        <input
          type="text"
          name="bucketItem"
          placeholder="Add a bucket"
          onChange={(e) => setBucketItem(e.target.value)}
          value={bucketItem}
        />
        <button type="submit">Add a card</button>
      </form>
    </>
  );
}

export default App;
