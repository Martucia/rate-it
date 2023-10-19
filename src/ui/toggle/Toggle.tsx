import styles from './Toggle.module.sass';

interface TogglekProps {
    isActive: boolean,
    setActive: Function
}

const Toggle = ({ isActive, setActive }: TogglekProps) => {
    return (
        <label className={styles.switch} onClick={() => setActive(!isActive)}>
            <input type="checkbox" checked={isActive} />
            <span className={styles.slider}></span>
        </label>
    );
}

export default Toggle;  