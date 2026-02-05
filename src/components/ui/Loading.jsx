import React from 'react';

const Loading = () => {
    return (
        <div className="flex items-center justify-center w-full py-20">
            <div className="w-10 h-10 border-4 border-white/10 border-t-primary rounded-full animate-spin" />
        </div>
    );
};

export default Loading;
