import { NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { useAppDispatch, useAppSelector } from '../../actions/redux';
import { registration } from '../../actions/user';
import { IRegUser } from '../../types/user';

import AuthInput from './AuthInput';

import styles from './index.module.sass';

const SignupSchema = Yup.object().shape({
    firstName: Yup.string()
        .min(3, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
    lastName: Yup.string()
        .min(3, 'Too Short!')
        .max(20, 'Too Long!')
        .required('Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    password: Yup.string()
        .min(6, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
});

const Registration = () => {
    const { error, isAuth, isLoading } = useAppSelector(state => state.userReducer);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const fromPage = location.state?.from || '/tasks';

    const handleSubmit = async (data: IRegUser, setSubmitting: Function) => {
        const result = await dispatch(registration(data));

        if (result) navigate(fromPage);

        setSubmitting(false)
    }

    if (isAuth) {
        return <Navigate to="/tasks/own" />
    }

    return (
        <div className={styles.auth}>
            <div className={`${styles.content} ${isLoading && styles.loading}`}>
                <h3 className={styles.title}>
                    Registation
                </h3>

                <Formik
                    initialValues={{
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        
                    }}
                    onSubmit={(
                        values: IRegUser,
                        { setSubmitting }: FormikHelpers<IRegUser>
                    ) => handleSubmit(values, setSubmitting)}
                    validationSchema={SignupSchema}
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

                            <button className={styles.submit} type="submit">
                                Registration
                            </button>
                        </Form>
                    )}
                </Formik>
                <div className={styles.footer}>
                    <p>Do you have account?</p>
                    <NavLink className={styles.link} to='/login'>
                        Go to Login
                    </NavLink>
                </div>

                {isLoading && <div className={styles.loading_line}></div>}
            </div>
        </div>
    );
}

export default Registration;