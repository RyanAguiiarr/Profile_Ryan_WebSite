import React from "react";

const TechBadge = ({ name }) => {
  return (
    <span className="px-3 py-1 text-xs font-medium text-gray-300 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/20 transition-colors cursor-default">
      {name}
    </span>
  );
};

export default TechBadge;
