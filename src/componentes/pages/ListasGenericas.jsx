import React from 'react';

const GenericList = ({ items, renderItem }) => {
  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
    </div>
  );
};

export default GenericList;