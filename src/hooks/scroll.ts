import { useState, MutableRefObject } from 'react';

type DirectionType = "left" | "right";

export function useScroll(ref: MutableRefObject<HTMLDivElement | null>) {
    const [isScrolledToLeft, setIsScrolledToLeft] = useState(false);
    const [isScrolledToRight, setIsScrolledToRight] = useState(false);

    let scrollInterval: number | null = null;

    const handleScroll = (direction: DirectionType) => {
        const scrollAmount = direction === "right" ? 5 : -5;
        if (ref.current) {
            ref.current.scrollLeft += scrollAmount;


            // console.log(ref.current.scrollLeft, ref.current.clientWidth, ref.current.scrollWidth);

            // const needScrollToLeft = ref.current.scrollLeft === 0;
            // const needScrollToRight = ref.current.scrollLeft + ref.current.clientWidth >= ref.current.scrollWidth;

            // setIsScrolledToRight(needScrollToRight);
            // setIsScrolledToLeft(needScrollToLeft);

            // if (direction === 'right' && needScrollToRight) {
            //     mouseLeave();
            // }

            // if (direction === 'left' && needScrollToLeft) {
            //     mouseLeave();
            // }

        }
    };

    const mouseEnter = (direction: DirectionType) => {
        if (!scrollInterval) {
            scrollInterval = window.setInterval(() => handleScroll(direction), 20);
        }
    };

    const mouseLeave = () => {
        if (scrollInterval) {
            window.clearInterval(scrollInterval);
            scrollInterval = null;
        }
    };

    return {
        mouseEnter,
        mouseLeave,
        isScrolledToLeft,
        isScrolledToRight
    }
}