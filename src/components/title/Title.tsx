import styles from './Title.module.sass';

interface TitleProps {
    title: String;
}

const Title = ({ title }: TitleProps) => {
    return (
        <h3 className={styles.title}>
            {title}
        </h3>
    );
}

export default Title;