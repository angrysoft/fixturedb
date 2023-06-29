import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div
        className="animate-spin inline-block
                   w-8 h-8 border-[1rem] rounded-full
                   border-primary border-t-secondary"
        role="status"
      >
      </div>
    </div>
  );
};

export default Loader;