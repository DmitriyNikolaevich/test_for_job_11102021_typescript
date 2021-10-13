import React, { FC, memo } from 'react'
import s from './Login.module.scss'
import {
    Formik,
    FormikHelpers,
    FormikProps,
    Form,
    Field,
    FieldProps,
} from 'formik'

export const Login: FC<{}> = memo(({ }) => {

    const initialValues: MyFormValues = { login: '', password: '' }

    return (
        <section className={s.loginWrapper}>
            <Formik
                initialValues={initialValues}
                validate={values => {
                    const errors = {login: '', password: ''};
                    if (!values.login) {
                      errors.login = 'Required';
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.login)
                    ) {
                      errors.login = 'Invalid email address';
                    }
                    return errors;
                  }}
                onSubmit={(values, actions) => {
                    console.log({ values, actions });
                    alert(JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }}
            >
                {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting
       }) => (
                <Form>
                    <label htmlFor="firstName">Login</label>
                    <Field id="login" name="login" placeholder="Login..." />
                    {errors.login && touched.login && errors.login}
                    <label htmlFor="firstName">Password</label>
                    <Field type="password" id="password" name="password" placeholder="Password..." />
                    {errors.password && touched.password && errors.password}
                    <button type="submit">Login</button>
                </Form>
                )}
            </Formik>
        </section>
    )
})


interface MyFormValues {
    login: string
    password: string
}