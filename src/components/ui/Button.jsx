import React from "react";

const Button = ({ children, href, onClick, className = "", ...props }) => {
  const Component = href ? "a" : "button";

  return (
    <Component
      href={href}
      onClick={onClick}
      className={`relative group inline-flex items-center justify-center px-8 py-3 overflow-hidden rounded-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(234,88,12,0.5)] ${className}`}
      {...props}
    >
      {/* Serpentine Border Effect */}
      <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] aspect-square bg-[conic-gradient(#c2410c_0%,#c2410c_35%,#0000_50%,#0000_100%)] animate-[spin_3s_linear_infinite] -z-10" />

      {/* Inner Background to cover the center of the conic gradient */}
      <span className="absolute inset-[2px] rounded-lg bg-black z-0" />

      {/* Text Roll Effect */}
      <span className="relative z-10 overflow-hidden block h-5 leading-5 w-full text-center">
        <span className="block transition-transform duration-300 ease-in-out group-hover:-translate-y-full">
            {children}
        </span>
        <span className="absolute top-0 left-0 w-full block transition-transform duration-300 ease-in-out translate-y-full group-hover:translate-y-0 text-primary">
            {children}
        </span>
      </span>
    </Component>
  );
};

export default Button;
