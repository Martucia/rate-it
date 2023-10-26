import { FC } from 'react'
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

import PopupHoc from "../../hoc/Popup";

interface EmojiProps {
    close: () => void,
    changeValue: any
}

const Emoji: FC<EmojiProps> = ({ close, changeValue }) => {
    return (
        <PopupHoc close={close} style={{ right: "auto", left: 0, top: "calc(100% + 12px)" }}>
            <EmojiPicker
                autoFocusSearch={false}
                lazyLoadEmojis={true}
                searchDisabled={true}
                onEmojiClick={(emojiData: EmojiClickData) => {
                    changeValue(emojiData.emoji)
                }}
            />
        </PopupHoc>
    );
}

export default Emoji;