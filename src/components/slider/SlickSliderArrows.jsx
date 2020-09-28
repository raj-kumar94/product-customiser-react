import React from 'react';

export const SlickPrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", left: "18px", width: "52px", height: "43px", padding: "12px", zIndex: "99999999" }}
            onClick={onClick}
        />
    );
}

export const SlickNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", right: "0px", width: "52px", height: "43px", padding: "12px", zIndex: "99999999" }}
            onClick={onClick}
        />
    );
}


