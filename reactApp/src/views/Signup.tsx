import { useRef } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../Context/ContextProvider";
import axiosClient from "../axios-client";
function Signup() {
    const nameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const passwordConfirmationRef = useRef("");
    const { setUser, setToken } = useStateContext;
    const onSubmit = (ev: { preventDefault: () => void }) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
    };
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Sign up for free</h1>
                    <input ref={nameRef} placeholder="Full Name" />
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        ref={passwordConfirmationRef}
                        type="password"
                        placeholder="Password Confirmation"
                    />
                    <button className="btn btn-block">Sign up</button>
                    <p className="message">
                        already have an account?{" "}
                        <Link to="/login">Login into your account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
