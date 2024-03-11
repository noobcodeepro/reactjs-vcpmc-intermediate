import React, { useState } from 'react';

const DragAndDropList = () => {
  const [listItems, setListItems] = useState([
    { id: 'item-1', content: 'Item 1' },
    { id: 'item-2', content: 'Item 2' },
    { id: 'item-3', content: 'Item 3' },
    { id: 'item-4', content: 'Item 4' },
  ]);

  const onDragEnd = result => {
    if (!result.destination) return;

    const reorderedItems = Array.from(listItems);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setListItems(reorderedItems);
  };

  return <div></div>;
};

export default DragAndDropList;
