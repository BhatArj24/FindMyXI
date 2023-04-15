import React, { useState, useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import NavBar from '../NavBar';
import styles from './styles.module.css';
import axios from 'axios';
import "./Loader.css";

const Register = () => {
    const [data, setData] = useState({
		name: "",
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();
    const [loader, setLoader] = useState(false);
	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
        setLoader(true);
		try {
			const url = "https://findmyxi.onrender.com/api/users";
			const { data: res } = await axios.post(url, data);
            sessionStorage.setItem("userId", res.data);
            navigate("/profile-setup-choose");
            setLoader(false);
            
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
            setLoader(false);
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
                                placeholder="Player/Captain Name"
                                name="name"
                                onChange={handleChange}
                                value={data.name}
                                required
                                className={styles.input}
                                style={{marginBottom:"5%"}}
                            />
                            <input
                                type="email"
                                placeholder="Player/Captain Email"
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
                            {loader && (
                <svg viewBox="25 25 50 50">
                  <circle r="20" cy="50" cx="50"></circle>
                </svg>
              )}
                        </form>
                    </div>
                </div>
            </div>
            
        </section>
    )
}

export default Register;