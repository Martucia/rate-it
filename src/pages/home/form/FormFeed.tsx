import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

import styles from './FormFeed.module.sass';

// const fields = [
//     {
//         name: "firstName",
//         type: "text"
//     }
// ]

const FormFeed = () => {
    const handleOnSubmit = async (values: object) => {
        // await new Promise((resolve) => setTimeout(resolve, 500));
        console.log(JSON.stringify(values, null, 2));
    }

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, 'Too Short!')
            .max(7, 'Too Long!')
            .required('Required'),
        email: Yup.string()
            .email('Invalid email')
            .required('Required'),
    });

    const MyInput = ({ field, form, ...props }) => {
        return <input {...field} {...props} />;
    };

    return (
        <section className={styles.section}>
            <div className={styles.slogan}>
                We all know that time is money...
                so stop wasting time, and save money with Rate It!
            </div>

            <Formik
                initialValues={{ name: "", email: "" }}
                validationSchema={SignupSchema}
                onSubmit={handleOnSubmit}
            >
                <Form className={styles.form}>
                    <Field name="name" component={MyInput} />
                    <ErrorMessage name="name" />
                    {/* <Field name="email" type="email" />
                    <ErrorMessage name="email" /> */}
                    <button type="submit">Submit</button>
                </Form>
            </Formik>

        </section >
    );
}

export default FormFeed;