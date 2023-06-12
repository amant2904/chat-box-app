import React, { useState, useEffect } from 'react';
import classes from "./AuthForm.module.css";
import { Form, Button } from 'react-bootstrap';
import NotificationBox from '../ui/NotificationBox';
import Loader from '../ui/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../store/auth-slice';

export default function AuthForm() {

    // common states and handlers
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // sign up and login choice
    const [isLogin, setIsLogin] = useState(true);

    const authChoice_handler = () => {
        setIsLogin(prv => !prv);
    }

    const auth_apiKey = useSelector(state => state.auth.apiKey);

    // userform handling
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    })

    const change_handler = (e) => {
        setUserData(prv => {
            return {
                ...prv,
                [e.target.name]: e.target.value
            }
        })
    }

    // notification box

    const [notification, setNotification] = useState({
        isTrue: false,
        message: ""
    })

    const notificationClose_handler = () => {
        setNotification({
            isTrue: false,
            message: ""
        })
    }

    // login and sign up functionality

    const auth_handler = async (e) => {
        e.preventDefault();
        if (!userData.email.includes("@")) {
            setNotification({
                isTrue: true,
                message: "Enter Valid Email Address"
            })
            return;
        }
        else if (userData.password.length < 7) {
            setNotification({
                isTrue: true,
                message: "Password Can Not be Less than 7 Characters"
            })
            return;
        }
        if (isLogin) {
            setIsLoading(true);
            try {
                let res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${auth_apiKey}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({
                        email: userData.email,
                        password: userData.password,
                        returnSecureToken: true
                    })
                })
                let data = await res.json();
                // console.log(data);
                if (!res.ok) {
                    throw new Error(data.error.message);
                }
                localStorage.setItem("idToken", data.idToken);
                localStorage.setItem("email", data.email);
                dispatch(authActions.updateOnLogin(data));
                setIsLoading(false);
            }
            catch (err) {
                setNotification({
                    isTrue: true,
                    message: err.message
                })
                setIsLoading(false);
            }
        }
        else {
            if (userData.password !== userData.confirmPassword) {
                setNotification({
                    isTrue: true,
                    message: "Password and Confirm Password must be same."
                })
                return;
            }
            setIsLoading(true);
            try {
                let res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${auth_apiKey}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({
                        email: userData.email,
                        password: userData.password,
                        returnSecureToken: true
                    })
                })
                let data = await res.json();
                if (!res.ok) {
                    throw new Error(data.error.message)
                }
                setIsLoading(false);
                localStorage.setItem("idToken", data.idToken);
                localStorage.setItem("email", data.email);
                dispatch(authActions.updateOnSignup(data));
            }
            catch (err) {
                setNotification({
                    isTrue: true,
                    message: err.message
                })
                setIsLoading(false);
            }
        }
    }

    // checking login status

    useEffect(() => {
        let idToken = localStorage.getItem("idToken");
        if (idToken) {
            dispatch(authActions.updateOnLogin({
                email: localStorage.getItem("email"),
                idToken
            }))
        }
    }, [])


    return (
        <React.Fragment>
            {notification.isTrue && <NotificationBox message={notification.message} close_handler={notificationClose_handler} />}
            <div className={`p-3 rounded-5 shadow ${classes.authForm}`}>
                <h1 className={`fs-1 text-center`}>{(isLogin) ? "Login" : "Sign Up"}</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control onChange={change_handler} value={userData.email} name="email" type="email" placeholder="Enter email" />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control onChange={change_handler} value={userData.password} name="password" type="password" placeholder="Password" />
                    </Form.Group>

                    {!isLogin && <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control onChange={change_handler} value={userData.confirmPassword} name="confirmPassword" type="password" placeholder="Password" />
                    </Form.Group>}

                    {isLogin && <Button className={`bg-transparent text-dark border-white d-block m-auto fw-bold`} onClick={() => navigate('/forget-password')} >Forget Password ?</Button>}

                    {isLoading && <Loader />}
                    {!isLoading && <Button onClick={auth_handler} variant="primary" type="submit" className={`d-block m-auto fs-5 px-4 py-1 ${classes.submitBtn}`}>
                        {(isLogin) ? "Login" : "Sign Up"}
                    </Button>}

                    <Button onClick={authChoice_handler} className={`d-block mx-auto my-2 border border-1 border-dark bg-transparent text-dark px-2 py-1 ${classes.switchBtn}`}>{(isLogin) ? "Don't Have Account ? Sign Up" : "Already Have Account ? Login"}</Button>
                </Form>
            </div>
        </React.Fragment>
    )
}
