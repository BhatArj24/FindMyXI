import React, { useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom';
import NavBar from '../NavBar';
// import styles from './styles.module.css';
import axios from 'axios';
import "./Loader.css";
import styles from './styles.module.css';
import toast, {Toaster} from 'react-hot-toast';


const PasswordReset = () => {
    const {id} = useParams();
    const [error, setError] = useState("");
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState({
        _id: id,
        password: "",
        confirm: "",
    });
    const navigate = useNavigate();
    const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

    const handleSubmit = async (e) => {
		e.preventDefault();
        setLoader(true);
		try {
      if(data.password === "" || data.confirm === "" ){
        toast.error("Please fill in all fields");
        
      } 
      else if(data.password !== data.confirm){
        toast.error("Passwords do not match");
        }
      
      else {
        const url = "https://findmyxi.onrender.com/api/resetSetup";
			const { data: res } = await axios.post(url, data);
			navigate("/login");
      }
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
    return (
      <section>
        <Toaster/>
        <div className='mb-48'>
        </div>
        <form
          action=""
          className="space-y-4 rounded-lg p-4 w-2/3 m-auto mt-2 shadow-lg sm:p-6 lg:p-8"
            onSubmit={handleSubmit}
        >
          <p className="text-center text-lg font-medium">Reset Password</p>

          <div>
            <label for="password" className="sr-only">
              Password
            </label>

            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter Password"
                name="password"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label for="confirm" className="sr-only">
              Confirm Password
            </label>

            <div className="relative">
              <input
                type="password"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Confirm password"
                name="confirm"
                onChange={handleChange}
              />
            </div>
          </div>
          {error && <div className={styles.error_msg}>{error}</div>}
          <button
            type="submit"
            className="block w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white"
          >
            Reset
          </button>
          {loader && (
                <svg viewBox="25 25 50 50">
                  <circle r="20" cy="50" cx="50"></circle>
                </svg>
              )}
        
        </form>
      </section>
    );
}

export default PasswordReset;