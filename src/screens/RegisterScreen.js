import React, { useState } from 'react';
import axios from 'axios';
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from '../components/Success';

function RegisterScreen() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    // Validate First Name and Last Name (not null and string)
    if (!firstName.trim()) {
      errors.firstName = 'First Name is required.';
    }
    if (!lastName.trim()) {
      errors.lastName = 'Last Name is required.';
    }

    // Validate Phone Number (numbers with a length of 10)
    if (!/^\d{10}$/.test(phoneNumber)) {
      errors.phoneNumber = 'Phone Number must be 10 digits.';
    }

    // Validate Email (not null)
    if (!email) {
      errors.email = 'Email is required.';
    }

    // Validate Password and Confirm Password (matching and meeting criteria)
    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 6 || !/[A-Z]/.test(password) || !/\d/.test(password) || !/[^A-Za-z\d]/.test(password)) {
      errors.password = 'Password must be at least 6 characters and contain an uppercase letter, a number, and a special character.';
    }
    if (password !== confirmPass) {
      errors.confirmPass = 'Passwords do not match.';
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const register = async () => {
    if (validateForm()) {
      const user = {
        firstName,
        lastName,
        phoneNumber,
        email,
        password,
        confirmPass,
      };

      try {
        setLoading(true); // set loading
        const result = await axios.post('/api/users/register', user).data;
        setLoading(false); // loading is set to false
        setSuccess(true); // and display success

        // set input fields empty after registration
        setFirstName('');
        setLastName('');
        setPhoneNumber('');
        setEmail('');
        setPassword('');
        setConfirmPass('');
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    } else {
      alert('Please correct the validation errors.');
    }
  };

  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}
      <div className="row justify-content-center mt-5">
        <div className="col-md-5 mt-5">
          {success && <Success message="Registration success." />}
          <div className="bs">
            <h2>Register</h2>
            <input
              type="text"
              className={`form-control ${validationErrors.firstName ? 'is-invalid' : ''}`}
              placeholder="First Name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
            {validationErrors.firstName && <div className="invalid-feedback">{validationErrors.firstName}</div>}

            <input
              type="text"
              className={`form-control ${validationErrors.lastName ? 'is-invalid' : ''}`}
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
            {validationErrors.lastName && <div className="invalid-feedback">{validationErrors.lastName}</div>}

            <input
              type="text"
              className={`form-control ${validationErrors.phoneNumber ? 'is-invalid' : ''}`}
              placeholder="Phone number"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
            {validationErrors.phoneNumber && <div className="invalid-feedback">{validationErrors.phoneNumber}</div>}

            <input
              type="text"
              className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`}
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            {validationErrors.email && <div className="invalid-feedback">{validationErrors.email}</div>}

            <input
              type="password"
              className={`form-control ${validationErrors.password ? 'is-invalid' : ''}`}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            {validationErrors.password && <div className="invalid-feedback">{validationErrors.password}</div>}

            <input
              type="password"
              className={`form-control ${validationErrors.confirmPass ? 'is-invalid' : ''}`}
              placeholder="Confirm Password"
              value={confirmPass}
              onChange={(e) => {
                setConfirmPass(e.target.value);
              }}
            />
            {validationErrors.confirmPass && <div className="invalid-feedback">{validationErrors.confirmPass}</div>}

            <button className="btn mt-3" onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterScreen;
