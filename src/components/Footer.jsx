import React from "react";

const Footer = () => {
    return (
        <footer className="py-8 border-t border-white/10">
            <div className="container mx-auto px-6 text-center text-gray-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Ryan.Dev. All rights reserved.</p>
                <p className="mt-2">Built with React, Tailwind & Framer Motion.</p>
            </div>
        </footer>
    );
};

export default Footer;
