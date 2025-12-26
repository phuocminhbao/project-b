import React from "react";
import "./Button.css";

export const Button = React.forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ children, ...rest }, ref) => {
    return (
        <div className="button">
            <button ref={ref} {...rest}>
                {children}
            </button>
        </div>
    );
});

Button.displayName = "Button";
