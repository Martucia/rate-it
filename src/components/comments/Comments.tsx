

import styles from './Comments.module.sass';

import Comment from './comment/Comment';
import { IComment } from '../../types/comment';
import CommentInput from './commentInput.tsx/CommentInput';

interface CommentsProps {
    id: number,
    comments: IComment[]
}

const Comments = ({ id, comments }: CommentsProps) => {

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
            <CommentInput taskId={id} />

            <div className={styles.list}>
                {comments.map(comment =>
                    <Comment
                        id={comment.id}
                        key={comment.id}
                        avatar={comment.user.avatar}
                        firstName={comment.user.firstName}
                        text={comment.text}
                        createdAt={comment.createdAt}
                    />
                )}

            </div>
        </div>
    );
}

export default Comments;