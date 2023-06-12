import React, { useState } from 'react'
import classes from "./ForgetPassword.module.css";
import { Form, Button, Container } from 'react-bootstrap';
import Loader from '../ui/Loader';
import { useNavigate } from 'react-router-dom';

export default function ForgetPassword() {

    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");

    const change_handler = () => {

    }

    const navigate = useNavigate();

    return (
        <div className={`p-3 rounded-5 shadow bg-light ${classes.forgetPassword}`}>
            <h1 className={`fs-2 text-center`}>Forget Password</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control onChange={change_handler} value={email} name="email" type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Button className={`d-block m-auto bg-transparent m-0 fw-bold text-dark ${classes.forgetBtn}`} onClick={() => navigate("/")}>Cancel Password Reset</Button>

                {loading && <Loader />}

                {!loading && <Button variant="primary" type="submit" className={`d-block m-auto fs-5 px-4 py-1 ${classes.submitBtn}`}>
                    Send Verification Link
                </Button>}
            </Form>
        </div>
    )
}
