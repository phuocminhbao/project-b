import { useEffect, useLayoutEffect, useState } from "react";

export function useCollision(ref1, ref2, open) {
    const [isColliding, setIsColliding] = useState(false);

    useLayoutEffect(() => {
        if (!ref1.current || !ref2.current) return;

        const check = () => {
            const r1 = ref1.current.getBoundingClientRect();
            const r2 = ref2.current.getBoundingClientRect();

            setIsColliding(
                !(
                    r1.right < r2.left ||
                    r1.left > r2.right ||
                    r1.bottom < r2.top ||
                    r1.top > r2.bottom
                ),
            );
        };

        check();
        window.addEventListener("resize", check);
        window.addEventListener("scroll", check, true);

        return () => {
            window.removeEventListener("resize", check);
            window.removeEventListener("scroll", check, true);
        };
    }, [ref1, ref2, open]);

    return isColliding;
}
