import React from 'react'
import classes from "./Authentication.module.css";
import { Container } from 'react-bootstrap';
import AuthForm from './AuthForm';
import ForgetPassword from './ForgetPassword';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Authentication() {
    const login = useSelector(state => state.auth.login);

    return (
        <Container className={`${classes.authentication} d-flex flex-column align-items-center justify-content-center`} fluid>
            <i className={`fa-brands fa-rocketchat fs-1 my-1`}></i>
            <h1 className={`fs-1 m-0`}>CHAT BOX</h1>
            <p className={`fs-4`}>A Realtime Chat Application</p>
            {!login && <Routes>
                <Route path='/' element={<AuthForm />} />
                <Route path='/forget-password' element={<ForgetPassword />} />
            </Routes>}
        </Container>
    )
}
