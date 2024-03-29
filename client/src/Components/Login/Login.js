import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import NavBar from "../NavBar";
import "./Loader.css";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const url = "https://findmyxi.onrender.com/api/auth";
      const { data: res } = await axios.post(url, data);
      sessionStorage.setItem("userId", res.data);
      window.location = "/profile";
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
      <NavBar />
      <div className={styles.login_container}>
        <div className={styles.login_form_container}>
          <div className={styles.left}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
              <h1 style={{ marginBottom: "10%", fontWeight: "bold" }}>
                Sign In
              </h1>
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className={styles.input}
                style={{ marginBottom: "5%" }}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className={styles.input}
                style={{ marginBottom: "5%" }}
              />
              {error && <div className={styles.error_msg}>{error}</div>}

              <button
                type="submit"
                className={styles.green_btn}
                style={{ backgroundColor: "#355cdc" }}
              >
                Sign In
              </button>
              <Link to="/password-reset">
                <p className="text-blue-400 ">
                  Forgot Password?
                </p>
              </Link>

              {loader && (
                <svg viewBox="25 25 50 50">
                  <circle r="20" cy="50" cx="50"></circle>
                </svg>
              )}
            </form>
          </div>
          <div className={styles.right}>
            <h1 style={{ marginBottom: "10%", fontWeight: "bold" }}>
              New Here?
            </h1>
            <Link to="/register">
              <button
                type="button"
                className={styles.green_btn}
                style={{ backgroundColor: "white", color: "black" }}
              >
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Login;
