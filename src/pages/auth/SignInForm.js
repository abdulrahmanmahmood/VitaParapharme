import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setLanguage, selectLanguage, selectTranslations } from '../../rtk/slices/Translate-slice';
import { setAuthData } from '../../rtk/slices/Auth-slice';
import { selectToken } from '../../rtk/slices/Auth-slice';
import { setToken } from '../../rtk/slices/Auth-slice';
import { setEmail } from '../../rtk/slices/Auth-slice';
import { useEffect } from 'react';
import { baseUrl } from '../../rtk/slices/Product-slice';
import './sign.css';

/*const SignInForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const [registrationMessage, setRegistrationMessage] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  }, [language]);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(setLanguage(selectedLanguage));
  };

  const handleInputChange = (field, value) => {
    setErrors({});
    setFormData({ ...formData, [field]: value });
  };

  const bearerToken = useSelector(selectToken);

  const handleUserLogin = () => {
  const isEmail = formData.email.includes('@');
  const requestBody = {
    email: isEmail ? formData.email : '',
    phone: isEmail ? '' : formData.email,
    password: formData.password,
  };

  axios
    .post('https://ecommerce-1-q7jb.onrender.com/api/v1/auth/login', requestBody, {
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': language,
      },
    })
    .then((result) => {
      console.log("Result data:", result.data);
      console.log("Result data:", result.data.message);
      setRegistrationMessage(result.data.message);

      // Dispatch the setToken action to update the Redux store
      dispatch(setToken(result.data.data.token));
      dispatch(setEmail(result.data.data.email));
      // Update localStorage
      localStorage.setItem('token', result.data.data.token);
      localStorage.setItem('email', result.data.data.email);
      // Use the token directly from the response
      console.log("token is : ", result.data.data.token);
      console.log("email is : ", result.data.data.email);
      // Navigate after dispatching the action
      navigate('/home');
    })
    .catch((err) => {
      console.log(err);
    });
};


  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    let validationErrors = {};

    if ((formData.email === '' && formData.phone === '') || (formData.email === null && formData.phone === null)) {
      isValid = false;
      validationErrors.email = 'Email or Phone required; ';
    }

    if (formData.password === '' || formData.password === null) {
      isValid = false;
      validationErrors.password = 'Password required; ';
    }

    setErrors(validationErrors);
    setValid(isValid);

    if (isValid) {
      handleUserLogin();
    }
  };

  return (
    <>
     {registrationMessage && <p className="text-success">{registrationMessage}</p>}
      <form action="#" className="sign-in-form" onSubmit={handleSubmit}>
        <div className="mb-3 col-md-12">
          <label>
            Email or Phone<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="emailOrPhone"
            className="form-control"
            placeholder="Enter Email or Phone"
            autoComplete="off"
            onChange={(event) => handleInputChange('email', event.target.value)}
          />
          {errors.email && <span className="text-danger">{errors.email}</span>}
        </div>
        <div className="mb-3 col-md-12">
          <label>
            Password<span className="text-danger">*</span>
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter Password"
            onChange={(event) => handleInputChange('password', event.target.value)}
          />
          {errors.password && <span className="text-danger">{errors.password}</span>}
        </div>
        {errors.general && <div className="text-danger">{errors.general}</div>}
       
        <input type="submit" className="signbtn" value={translations[language]?.login} />
      </form>
    </>
  );
};*/




/*const SignInForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // State to track loading state
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [valid, setValid] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
  }, [language]);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(setLanguage(selectedLanguage));
  };

  const handleInputChange = (field, value) => {
    setErrors({});
    setFormData({ ...formData, [field]: value });
  };

  const handleUserLogin = () => {
    setLoading(true); // Set loading state to true when login process starts

    const isEmail = formData.email.includes('@');
    const requestBody = {
      email: isEmail ? formData.email : '',
      phone: isEmail ? '' : formData.email,
      password: formData.password,
    };

    axios
      .post('https://ecommerce-1-q7jb.onrender.com/api/v1/auth/login', requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': language,
        },
      })
      .then((result) => {
        setRegistrationMessage(result.data.message);
        dispatch(setToken(result.data.data.token));
        dispatch(setEmail(result.data.data.email));
        localStorage.setItem('token', result.data.data.token);
        localStorage.setItem('email', result.data.data.email);
        navigate('/home');
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false); // Set loading state to false after login process completes
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    let validationErrors = {};

    if ((formData.email === '' && formData.phone === '') || (formData.email === null && formData.phone === null)) {
      isValid = false;
      validationErrors.email = 'Email or Phone required; ';
    }

    if (formData.password === '' || formData.password === null) {
      isValid = false;
      validationErrors.password = 'Password required; ';
    }

    setErrors(validationErrors);
    setValid(isValid);

    if (isValid) {
      handleUserLogin();
    }
  };

  return (
    <>
    <div className='signincont'>
      {registrationMessage && <p className="text-success">{registrationMessage}</p>}
      <form action="#" className="sign-in-form" onSubmit={handleSubmit}>
        <div className="mb-3 col-md-12">
          <label>
            Email or Phone<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="emailOrPhone"
            className="form-control"
            placeholder="Enter Email or Phone"
            autoComplete="off"
            onChange={(event) => handleInputChange('email', event.target.value)}
          />
          {errors.email && <span className="text-danger">{errors.email}</span>}
        </div>
        <div className="mb-3 col-md-12">
          <label>
            Password<span className="text-danger">*</span>
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter Password"
            onChange={(event) => handleInputChange('password', event.target.value)}
          />
          {errors.password && <span className="text-danger">{errors.password}</span>}
        </div>
        {errors.general && <div className="text-danger">{errors.general}</div>}
       
        <input type="submit" className="signbtn" value={translations[language]?.login} />
      </form>

    </div>
    {loading && <div className="loading-spinner" style={{ width: '50px', height: '50px', marginTop: '10px' }}></div>}

    </>
  );
};*/




const SignInForm = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // State to track loading state
  const language = useSelector(selectLanguage);
  const translations = useSelector(selectTranslations);
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
  });
  const [valid, setValid] = useState(true);

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
  }, [language]);

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    dispatch(setLanguage(selectedLanguage));
  };

  const handleInputChange = (field, value) => {
    setErrors({});
    setFormData({ ...formData, [field]: value });
  };

  const handleUserLogin = () => {
    setLoading(true); // Set loading state to true when login process starts

    const isEmail = formData.email.includes('@');
    const requestBody = {
      email: isEmail ? formData.email : '',
      phone: isEmail ? '' : formData.email,
      password: formData.password,
    };

    axios
      .post(`${baseUrl}/auth/login`, requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': language,
        },
      })
      .then((result) => {
        setRegistrationMessage(''); 
        dispatch(setToken(result.data.data.token));
        dispatch(setEmail(result.data.data.email));
        localStorage.setItem('token', result.data.data.token);
        localStorage.setItem('email', result.data.data.email);
        navigate('/home');
      })
      .catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          setRegistrationMessage(err.response.data.message); 
        } else {
          setRegistrationMessage('An error occurred during login.'); 
        }
      })
      .finally(() => {
        setLoading(false); 
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let isValid = true;
    let validationErrors = {};

    if ((formData.email === '' && formData.phone === '') || (formData.email === null && formData.phone === null)) {
      isValid = false;
      validationErrors.email = 'Email or Phone required; ';
    }

    if (formData.password === '' || formData.password === null) {
      isValid = false;
      validationErrors.password = 'Password required; ';
    }

    setErrors(validationErrors);
    setValid(isValid);

    if (isValid) {
      handleUserLogin();
    }
  };

  return (
    <>
    <div className='signincont'>
      {registrationMessage && <p className="text-danger">{registrationMessage}</p>} {/* Display error message */}
      <form action="#" className="sign-in-form" onSubmit={handleSubmit}>
        <div className="mb-3 col-md-12">
          <label>
            Email or Phone<span className="text-danger">*</span>
          </label>
          <input
            type="text"
            name="emailOrPhone"
            className="form-control"
            placeholder="Enter Email or Phone"
            autoComplete="off"
            onChange={(event) => handleInputChange('email', event.target.value)}
          />
          {errors.email && <span className="text-danger">{errors.email}</span>}
        </div>
        <div className="mb-3 col-md-12">
          <label>
            Password<span className="text-danger">*</span>
          </label>
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Enter Password"
            onChange={(event) => handleInputChange('password', event.target.value)}
          />
          {errors.password && <span className="text-danger">{errors.password}</span>}
        </div>
        {errors.general && <div className="text-danger">{errors.general}</div>}
       
        <input type="submit" className="signbtn" value={translations[language]?.login} />
      </form>

    </div>
    {loading && <div className="loading-spinner" style={{ width: '50px', height: '50px', marginTop: '10px' }}></div>} {/* Loader */}

    </>
  );
};




export default SignInForm;