import React from 'react';

export default ({ pageContext: { name } }) => {
  return (
    <div>{name}</div>
  );
};
