import React, { useState, useRef } from 'react';
import './Slider.sass'; // Стилізація компонента

const CircleSlider = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const sliderRef = useRef(null);

    const items = [
        { color: 'red', label: 'Block 1' },
        { color: 'green', label: 'Block 2' },
        { color: 'blue', label: 'Block 3' },
    ];

    const handlePrevClick = () => {
        setActiveIndex((activeIndex + items.length - 1) % items.length);
    };

    const handleNextClick = () => {
        setActiveIndex((activeIndex + 1) % items.length);
    };

    const handleSliderScroll = (e) => {
        console.log(sliderRef.current)
        if (sliderRef.current) {
            const newIndex = e.deltaY > 0 ? activeIndex + 1 : activeIndex - 1;
            setActiveIndex((newIndex + items.length) % items.length);
        }
    };

    return (
        <div
            className="circle-slider-container"
            onWheel={handleSliderScroll}
            ref={sliderRef}
        >
            <div className="circle-slider">
                {items.map((item, index) => {
                    const isActive = activeIndex === index;
                    const isNext = (index + 1) % items.length === activeIndex;
                    const isPrev = (index + items.length - 1) % items.length === activeIndex;
                    return (
                        <div
                            key={index}
                            className={`circle-slider-item ${isActive ? 'active' : ''} ${isNext ? 'next' : isPrev ? 'prev' : ''
                                }`}
                            style={{
                                transform: `rotateY(${(index - activeIndex) * (360 / items.length)}deg) translateZ(300px)`,
                                backgroundColor: item.color,
                            }}
                        >
                            <span className="circle-slider-label">{item.label}</span>
                        </div>
                    );
                })}
            </div>
            <div className="pagination">
                {items.map((_, index) => (
                    <button
                        key={index}
                        className={`pagination-dot ${activeIndex === index ? 'active' : ''}`}
                        onClick={() => setActiveIndex(index)}
                    />
                ))}
            </div>
            {/* <button className="circle-slider-button prev" onClick={handlePrevClick}>
                &lt;
            </button>
            <button className="circle-slider-button next" onClick={handleNextClick}>
                &gt;
            </button> */}
        </div>
    );
};

export default CircleSlider;
