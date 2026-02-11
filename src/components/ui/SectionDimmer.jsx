import React from "react";

const SectionDimmer = ({ children, className = "" }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};



export default SectionDimmer;
