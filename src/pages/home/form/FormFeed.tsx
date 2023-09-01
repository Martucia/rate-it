import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import styles from './FormFeed.module.sass';

// const fields = [
//     {
//         name: "firstName",
//         type: "text"
//     }
// ]

interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    phone: string,
    message: string
}

interface MyInputProps {
    field: any;
    form: any;
}

const FormFeed = () => {
    const handleOnSubmit = async (values: FormValues) => {
        // await new Promise((resolve) => setTimeout(resolve, 500));
        console.log(JSON.stringify(values, null, 2));
    }

    const SignupSchema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Too Short!')
            .required('Required'),
        lastName: Yup.string()
            .min(2, 'Too Short!')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
        phone: Yup.string()
            .required('Required'),
        message: Yup.string()
            .min(20, 'Too Short!')
            .required('Required'),
    });

    const MyInput: React.FC<MyInputProps> = ({ field, form, ...props }) => {
        return <input className={styles.input} {...field} {...props} />;
    };

    const MyTextArea: React.FC<MyInputProps> = ({ field, form, ...props }) => {
        return <textarea rows={3} className={styles.input} {...field} {...props} />;
    };

    return (
        <section className={styles.section}>
            <div className={styles.slogan}>
                We all know that time is money...
                so stop wasting time, and save money with Rate It!
            </div>

            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    message: ""
                }}
                validationSchema={SignupSchema}
                onSubmit={handleOnSubmit}
            >
                <Form className={styles.form}>
                    <div className={styles.input_row}>
                        <div className={styles.input_block}>
                            <label htmlFor="firstName">First Name</label>
                            <Field placeholder="John" name="firstName" component={MyInput} />
                            <ErrorMessage component="div" className={styles.error} name="firstName" />
                        </div>
                        <div className={styles.input_block}>
                            <label htmlFor="lastName">Last Name</label>
                            <Field placeholder="Gordon" name="lastName" component={MyInput} />
                            <ErrorMessage component="div" className={styles.error} name="lastName" />
                        </div>
                    </div>
                    <div className={styles.input_row}>
                        <div className={styles.input_block}>
                            <label htmlFor="email">Mail</label>
                            <Field placeholder="john@acme.com" name="email" component={MyInput} />
                            <ErrorMessage component="div" className={styles.error} name="email" />
                        </div>
                        <div className={styles.input_block}>
                            <label htmlFor="phone">Phone</label>
                            <Field placeholder="+4803435833" name="phone" component={MyInput} />
                            <ErrorMessage component="div" className={styles.error} name="phone" />
                        </div>
                    </div>

                    <div className={styles.input_block}>
                        <label htmlFor="message">Message</label>
                        <Field as="textarea" placeholder="Hello! I am interesting ab..." name="message" component={MyTextArea} />
                        <ErrorMessage component="div" className={styles.error} name="message" />
                    </div>

                    <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <button className={`button-blue ${styles.btn}`} type="submit">Send Message</button>
                    </div>
                </Form>
            </Formik>

        </section >
    );
}

export default FormFeed;