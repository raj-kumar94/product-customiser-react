import React from 'react';

export const SlickPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#9a9697", left: "18px", width: "52px", height: "43px", padding: "12px", zIndex: "99999999" }}
            onClick={onClick}
        />
    );
}

export const SlickNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "#9a9697", right: "18px", width: "52px", height: "43px", padding: "12px", zIndex: "99999999" }}
            onClick={onClick}
        />
    );
}


