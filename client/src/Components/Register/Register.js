import React, { useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import NavBar from '../NavBar';
import styles from './styles.module.css';
import axios from 'axios';

const Register = () => {
    const [data, setData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/users";
			const { data: res } = await axios.post(url, data);
            sessionStorage.setItem("userId", res.data);
            navigate("/profile-setup-choose");
            
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};
    useEffect(() => {
        if (sessionStorage.getItem("userId")) {
            navigate("/browse");
        }
    }, []);
    return (
        <section>
            <NavBar/>
            <div className={styles.signup_container}>
                <div className={styles.signup_form_container}>
                    <div className={styles.left}>
                        <h1 style={{marginBottom:"10%",fontWeight:"bold"}}>Registered?</h1>
                        <Link to="/login">
                            <button type="button" className={styles.green_btn} style={{backgroundColor:"white",color:"black"}}>
                                Sign in
                            </button>
                        </Link>
                    </div>
                    <div className={styles.right}>
                        <form className={styles.form_container} onSubmit={handleSubmit}>
                            <h1 style={{marginBottom:"10%", fontWeight:"bolder"}}>Register Account</h1>
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                onChange={handleChange}
                                value={data.name}
                                required
                                className={styles.input}
                                style={{marginBottom:"5%"}}
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                onChange={handleChange}
                                value={data.email}
                                required
                                className={styles.input}
                                style={{marginBottom:"5%"}}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                onChange={handleChange}
                                value={data.password}
                                required
                                className={styles.input}
                                style={{marginBottom:"5%"}}
                            />
                            {error && <div className={styles.error_msg}>{error}</div>}
                            <button type="submit" className={styles.green_btn} style={{backgroundColor:"#355cdc"}}>
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            
        </section>
    )
}

export default Register;