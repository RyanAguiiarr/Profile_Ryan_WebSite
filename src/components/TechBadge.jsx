import React from "react";

const TechBadge = ({ name }) => {
  return (
    <span className="px-3 py-1 text-xs font-bold text-gray-200 bg-white/5 border border-white/10 rounded-lg backdrop-blur-md shadow-lg hover:bg-white/10 hover:border-white/20 transition-all cursor-default">
      {name}
    </span>
  );
};

export default TechBadge;
