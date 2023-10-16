import { useEffect, useState } from 'react';

import styles from './Comments.module.sass';

import Comment from './comment/Comment';
import { IComment, ICommentCreate } from '../../types/comment';
import CommentInput from './commentInput.tsx/CommentInput';
import io, { Socket } from 'socket.io-client';
import { SOCKET_URL } from '../../utils/constants';
import { getSocketConfig } from '../../utils/functions';
import { useConnectSocket } from '../../hooks/useConnectSocket';

interface CommentsProps {
    id: number,
    taskComments: IComment[]
}

const Comments = ({ id, taskComments }: CommentsProps) => {
    const [socket, setSocket] = useState<Socket>();
    const [editingComment, setEditingComment] = useState<number | null>(null);

    // const [comments, setComments] = useState<IComment[]>(taskComments);

    const send = (comment: ICommentCreate) => {
        socket?.emit("comment", comment)
    }

    // useConnectSocket();



    // useEffect(() => {
    //     const options = getSocketConfig();

    //     const newSocket = io(SOCKET_URL, options);
    //     setSocket(newSocket);
    // }, [setSocket]);

    // const commentListener = (comment: IComment) => {
    //     setComments([comment, ...comments])
    // }

    // useEffect(() => {
    //     socket?.on('comment', commentListener);

    //     return () => {
    //         socket?.off('comment', commentListener);
    //     }
    // }, [commentListener])

    return (
        <div className={styles.comments}>
            <div className={styles.header}>
                <div className={styles.title}>
                    Activity
                </div>
                <div className={styles.sort}>
                    Newest
                </div>
            </div>

            <CommentInput taskId={id} send={send} />

            <div className={styles.list}>
                {taskComments.map(comment =>
                    <Comment
                        key={comment.id}
                        comment={comment}
                        isEditing={editingComment === comment.id}
                        setEditing={setEditingComment}
                    />
                )}

            </div>
        </div>
    );
}

export default Comments;