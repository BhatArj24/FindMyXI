import React, { useState, useEffect} from 'react'
import {Link, useNavigate, useParams} from 'react-router-dom';
import NavBar from '../NavBar';
// import styles from './styles.module.css';
import axios from 'axios';
import "./Loader.css";
import styles from './styles.module.css';
import toast, {Toaster} from 'react-hot-toast';


const ResetEmail = () => {
    const [error, setError] = useState("");
    const [loader, setLoader] = useState(false);
    const [data, setData] = useState({
        email:""
    });
    const navigate = useNavigate();
    const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

    const handleSubmit = async (e) => {
		e.preventDefault();
        setLoader(true);
		try {
      if(data.email === "" ){
        toast.error("Please fill in all fields");
        
        }
      else {
        const url = `http://findmyxi.onrender.com/api/reset/${data.email}`;
			const res = await axios.get(url);
      
      const uid = res.data.data[0]._id;

			navigate(`/password-reset/${uid}`);
      // send email with link to this page
      }
        setLoader(false);
		} catch (error) {
            console.log(error);
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
            <label for="email" className="sr-only">
              Email
            </label>

            <div className="relative">
              <input
                type="email"
                className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                placeholder="Enter Email"
                name="email"
                onChange={handleChange}
              />
            </div>
          </div>
          {error && <div className={styles.error_msg}>{error}</div>}
          <button
            type="submit"
            className="block w-full rounded-lg bg-blue-600 px-5 py-3 text-sm font-medium text-white"
          >
            Next
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

export default ResetEmail;