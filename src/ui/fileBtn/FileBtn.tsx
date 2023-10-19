import { ChangeEvent, LegacyRef } from 'react';

import styles from './Files.module.sass';

import clip from '@images/clip.svg'

interface FileBtnProps {
    setFiles: React.Dispatch<React.SetStateAction<File[]>>,
    style: any,
    fileInputRef: LegacyRef<HTMLInputElement> | undefined
}

const FileBtn: React.FC<FileBtnProps> = ({ setFiles, style, fileInputRef }) => {
    const handleFileInputAdd = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setFiles((prev) => [...prev, files[0]]);
        }
    };

    return (
        <div className={`${styles.block} ${style}`}>
            <img
                src={clip}
                alt="Add file"
                className={styles.image}
            />
            <input
                accept="image/*,.png,.jpg,.gif,.web,"
                ref={fileInputRef}
                type="file"
                onChange={handleFileInputAdd}
                className={styles.input}
            />
        </div>
    );
}

export default FileBtn;