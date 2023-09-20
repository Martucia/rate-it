import { Field } from 'formik';

import styles from './index.module.sass';

interface AuthInputProps {
    errors: any,
    name: string,
    touched: any
}

const AuthInput = ({ errors, name, touched }: AuthInputProps) => {
    return (
        <div className={styles.field}>
            <label className={styles.label} htmlFor={name}>{name.charAt(0).toUpperCase() + name.slice(1)}</label>
            <Field className={styles.input} type={name == "password" ? name : "text"} id={name} name={name} placeholder={name} />
            {errors[name] && touched[name] ? (
                <div className={styles.error}>{errors[name]}</div>
            ) : null}
        </div>
    );
}

export default AuthInput;