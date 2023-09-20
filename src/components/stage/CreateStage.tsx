import { useState, useRef, useEffect } from 'react';
import { SketchPicker } from 'react-color';

import { ClickOutside } from '../../utils/functions';

import styles from './Stage.module.sass';

const CreateStage = ({ create }: { create: (data: any) => void }) => {
    const [background, setBackground] = useState('#6fb0e7');
    const [color, setColor] = useState('#000');
    const [name, setName] = useState('Stage name');
    const [isBackgroundPickerOpen, setBackgroundPickerOpen] = useState(false);
    const [isColorPickerOpen, setColorPickerOpen] = useState(false);
    const [error, setError] = useState(false);

    const bgPicker = useRef<HTMLDivElement | null>(null);
    const colorPicker = useRef<HTMLDivElement | null>(null);

    const handleChangeBackground = (hex: string) => {
        setBackground(hex);
    };

    const handleChangeColor = (hex: string) => {
        setColor(hex);
    };

    const handleCreate = (e: any) => {
        if (e.key === "Enter" && e._reactName === "onKeyDown" || e._reactName !== "onKeyDown") {
            if (name.length === 0) return setError(true);

            create({ name, color, background });
        }
    } 

    const handleChangeValue = (e: any) => {
        setName(e.target.value);
        setError(false);
    }

    useEffect(() => ClickOutside({ element: bgPicker, close: setBackgroundPickerOpen }), [])
    useEffect(() => ClickOutside({ element: colorPicker, close: setColorPickerOpen }), [])

    return (
        <div className={styles.stage}>
            <div className={styles.name} style={{ background, justifyContent: "space-between" }}>
                <input
                    className={`${styles.input} ${error && styles.error}`}
                    type="text"
                    value={name}
                    onChange={handleChangeValue}
                    style={{ color }}
                    onKeyDown={handleCreate}
                />

                <div className={styles.btns}>
                    <button className={styles.btn} onClick={() => setBackgroundPickerOpen(true)}>
                        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect fill="white" fillOpacity="0.01" />
                            <path fillRule="evenodd" clipRule="evenodd" d="M37 37C39.2091 37 41 35.2091 41 33C41 31.5272 39.6667 29.5272 37 27C34.3333 29.5272 33 31.5272 33 33C33 35.2091 34.7909 37 37 37Z" fill={color} />
                            <path d="M20.8535 5.50439L24.389 9.03993" stroke={color} strokeWidth="4" strokeLinecap="round" />
                            <path d="M23.6818 8.33281L8.12549 23.8892L19.4392 35.2029L34.9955 19.6465L23.6818 8.33281Z" stroke={color} strokeWidth="4" strokeLinejoin="round" />
                            <path d="M12 20.0732L28.961 25.6496" stroke={color} strokeWidth="4" strokeLinecap="round" />
                            <path d="M4 43H44" stroke={color} strokeWidth="4" strokeLinecap="round" />
                        </svg>
                    </button>

                    <button style={{ color }} className={styles.btn} onClick={() => setColorPickerOpen(true)}>
                        Aa
                    </button>

                    <button className={styles.btn} onClick={handleCreate}>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 14L8.23309 16.4248C8.66178 16.7463 9.26772 16.6728 9.60705 16.2581L18 6" stroke={color} strokeWidth="2" strokeLinecap="round" />
                        </svg>

                    </button>
                </div>


                {isBackgroundPickerOpen &&
                    <div ref={bgPicker} className={styles.color_picker}>
                        <SketchPicker
                            color={background}
                            onChange={(color: any) => handleChangeBackground(color.hex)}
                        />
                    </div>}

                {isColorPickerOpen &&
                    <div ref={colorPicker} className={styles.color_picker}>
                        <SketchPicker
                            color={color}
                            onChange={(color: any) => handleChangeColor(color.hex)}
                        />
                    </div>}

            </div>
            <div className={styles.wrapper}>

            </div>
        </div>
    );
}

export default CreateStage;