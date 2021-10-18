import React, { FC, memo, useEffect, useState } from 'react'
import s from './Login.module.scss'
import {
    Formik,
    Form,
    Field
} from 'formik'
import { useAuthMutation } from '../../API/logiAPI'
import { loginSelector, setIsAuth, setUserName } from './loginSlice'
import { useHistory } from 'react-router'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

export const Login: FC<{ }> = memo(({ }) => {

    const dispatch = useAppDispatch(),
            history = useHistory()

    const { isAuth } = useAppSelector(loginSelector)

    const [errorMessage, setErrorMessage] = useState<string>('')

    const initialValues: MyFormValues = { login: '', pass: '' }

    const [auth] = useAuthMutation()

    useEffect(() => {
        isAuth && history.push('/chat')
    }, [isAuth])

    return (
        <section className={s.loginWrapper}>
            <Formik
                initialValues={initialValues}
                validate={values => {
                    const errors = {login: '', pass: ''};
                    if (!values.login.length) {
                      errors.login = "Things won't work without a login..."
                    } else if (!values.pass.length) {
                        errors.pass = "Password is equally important..."
                    } else {
                        return {}
                    }
                    return errors;
                  }}
                onSubmit={(values, actions) => {
                    auth(values)
                        .unwrap()
                        .then(x => {
                            dispatch(setIsAuth(x.data.isAuth))
                            dispatch(setUserName(x.data.userName))
                            setErrorMessage(x.data.errorMessage)
                        })
                    actions.setSubmitting(false);
                }}
            >
                {({
         errors,
         touched
       }) => (
                <Form>
                    <label htmlFor="firstName">Login</label>
                    <Field id="login" name="login" placeholder="Login..." />
                    <label htmlFor="firstName">Password</label>
                    <Field type="pass" id="pass" name="pass" placeholder="Password..." />
                    <div>{errors.login && touched.login && errors.login}</div>
                    <div>{errors.pass && touched.pass && errors.pass}</div>
                    <div>{errorMessage && errorMessage}</div>
                    <button type="submit">Login</button>
                </Form>
                )}
            </Formik>
        </section>
    )
})


interface MyFormValues {
    login: string
    pass: string
}