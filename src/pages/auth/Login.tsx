import { NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { useAppDispatch, useAppSelector } from '../../actions/redux';
import { login } from '../../actions/user';
import { ILogUser } from '../../types/user';

import AuthInput from './AuthInput';

import styles from './index.module.sass';

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
});

const Login = () => {
    const { error, isAuth, isLoading } = useAppSelector(state => state.userReducer);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const fromPage = location.state?.from || '/tasks';

    const handleSubmit = async (data: ILogUser, setSubmitting: Function) => {
        const result = await dispatch(login(data));

        if (result) navigate(fromPage);

        setSubmitting(false);
    }

    if (isAuth) {
        return <Navigate to="/tasks/own" />
    }

    return (
        <div className={styles.auth}>
            <div className={`${styles.content} ${isLoading && styles.loading}`}>
                <h3 className={styles.title}>
                    Login
                </h3>

                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                    }}
                    onSubmit={(
                        values: ILogUser,
                        { setSubmitting }: FormikHelpers<ILogUser>
                    ) => handleSubmit(values, setSubmitting)}
                    validationSchema={LoginSchema}
                >
                    {({ errors, touched, values }) => (
                        <Form className={styles.form}>
                            {Object.keys(values).map(
                                (key) =>
                                    <AuthInput
                                        errors={errors}
                                        touched={touched}
                                        name={key}
                                        key={key}
                                    />
                            )}

                            <div className={styles.error} style={{ fontSize: "16px", marginTop: "20px" }}>
                                {error}
                            </div>

                            <button disabled={isLoading} className={styles.submit} type="submit">
                                Login
                            </button>
                        </Form>
                    )}
                </Formik>
                <div className={styles.footer}>
                    <p>Don't you have account yet?</p>
                    <NavLink className={styles.link} to='/reg'>
                        Registration
                    </NavLink>
                </div>

                {isLoading && <div className={styles.loading_line}></div>}
            </div>
        </div>
    );
}

export default Login;