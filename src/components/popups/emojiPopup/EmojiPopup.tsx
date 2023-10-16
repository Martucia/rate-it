import { FC, useEffect, useRef } from 'react';
import s from '../index.module.sass';
import { ClickOutside } from '../../../utils/functions';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface EmojiPopupProps {
    close: () => void,
    changeValue: any
}

const EmojiPopup: FC<EmojiPopupProps> = ({ close, changeValue }) => {
    const popupRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => ClickOutside({ element: popupRef, close }), []);

    return (
        <div ref={popupRef} className={s.popup} style={{ right: "auto", left: 0, top: "calc(100% + 12px)" }}>
            <EmojiPicker
                autoFocusSearch={false}
                lazyLoadEmojis={true}
                searchDisabled={true}
                onEmojiClick={(emojiData: EmojiClickData) => {
                    changeValue(emojiData.emoji)
                }}
            />
        </div>

    );
}

export default EmojiPopup;