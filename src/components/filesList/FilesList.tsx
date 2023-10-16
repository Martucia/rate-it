import { FC } from 'react';

import styles from './FilesList.module.sass';

import x from '@images/x.svg'
import { BASE_URL } from '../../utils/constants';

interface FilesListProps {
    updatedFiles?: string[],
    files?: File[], // string[] | 
    remove: Function
}

const FilesList: FC<FilesListProps> = ({ files, remove, updatedFiles }) => {
    return (
        <div className={styles.files}>
            {files?.map(file =>
                <div className={styles.file} key={file.name}>
                    <div className={styles.file_image}>
                        <img src={URL.createObjectURL(file)} alt="" />
                    </div>
                    <span className={styles.file_name}>{file.name}</span>
                    <button onClick={() => remove(file)} className={styles.file_remove}>
                        <img src={x} alt="" />
                    </button>
                </div>
            )}
            {updatedFiles?.map(file =>
                <div className={styles.file} key={file}>
                    <div className={styles.file_image}>
                        <img src={`${BASE_URL}/file/${file}`} alt="" />
                    </div>
                    <span className={styles.file_name}>{file}</span>
                    <button onClick={() => remove(file)} className={styles.file_remove}>
                        <img src={x} alt="" />
                    </button>
                </div>
            )}
        </div>
    );
}

export default FilesList;