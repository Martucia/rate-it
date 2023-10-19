import styles from './SearchInput.module.sass';

interface SearchInputProps {
    paddingY: number,
    maxWidth?: number,
    maxContent?: boolean
}

const SearchInput = ({ paddingY, maxWidth = 320, maxContent }: SearchInputProps) => {
    return (
        <div className={styles.search} style={{ width: maxContent ? "max-content" : "100%" }}>
            <input
                placeholder='Seach'
                type="text"
                className={styles.input}
                style={{
                    padding: `${paddingY}px 16px ${paddingY}px 55px`,
                    maxWidth: maxWidth + "px"
                }}
            />
        </div>
    );
}

export default SearchInput;