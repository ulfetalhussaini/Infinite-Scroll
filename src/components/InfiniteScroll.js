import React, { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const style = {
  height: 50,
  border: "1px solid green",
  margin: 6,
  padding: 8,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const buttonStyle = {
    padding: "10px 20px",
    backgroundColor: "lightgray",
    border: '1px solid gray',
    borderRadius: '5px',
}

const InfiniteScrollList = () => {
  const [items, setItems] = useState(
    Array.from({ length: 20 }, (_, index) => index + 1)
  );
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (items?.length >= 500) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItems(
        items.concat(
          Array.from({ length: 20 }, (_, index) => items.length + index + 1)
        )
      );
    }, 500);
  };

  const handleDeleteItem = (index) => {
    const deletedItem = items[index];
    window.alert(`Item ${deletedItem} deleted`);
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  return (
    <div>
      <h1>Infinite Scroll</h1>
      <hr />
      <InfiniteScroll
        dataLength={items?.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        height={400}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>You have seen it all!</b>
          </p>
        }
      >
        {items?.map((item, index) => (
          <div style={style} key={item}>
            <div>Item - #{item}</div>
            <button style={buttonStyle} onClick={() => handleDeleteItem(index)}>Delete</button>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default InfiniteScrollList;
