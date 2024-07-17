import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import emailjs from "@emailjs/browser";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isStudent: false,
    isWorker: false,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleCheckboxChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data); // Debugging line
    try {
      const url = `http://localhost:3001/api/users`;
      const { data: res } = await axios.post(url, data);

      emailjs.send("service_061uyjc", "template_qejy7ja", {
        to_email: data.email,
      }, "Ac1RL4TgJZVZgpMSY")
        .then((result) => {
          console.log(result.text);
        }, (error) => {
          console.log(error.text);
        });

      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (error.response && error.response.status >= 400 && error.response.status <= 500) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h1 style={{ color: ' #a7cab1' }}>Welcome Back</h1>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1 style={{ color: ' #a7cab1' }}>Create Account</h1>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            <label>
              <input
                type="checkbox"
                name="isStudent"
                checked={data.isStudent}
                onChange={handleCheckboxChange}
              />
              Student
            </label>
            <label>
              <input
                type="checkbox"
                name="isWorker"
                checked={data.isWorker}
                onChange={handleCheckboxChange}
              />
              Worker
            </label>
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
