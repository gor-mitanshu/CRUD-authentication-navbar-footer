import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from '../ui/Modal';
import userData from '../userData.json';
import { toast } from 'react-toastify';

const initialData = { email: "", password: "" };
const initialSignupData = { firstName: "", lastName: "", email: "", password: "", confirmPassword: "", age: "", gender: "", hobbies: "", country: "", state: "", city: "" };

const Navbar = ({ isLoggedIn, onLogout, onLogin }) => {
     const [showLoginModal, setShowLoginModal] = useState(false);
     const [showSignupModal, setShowSignupModal] = useState(false);
     const [showPassword, setShowPassword] = useState(false);
     const [loginUser, setLoginUser] = useState(initialData);
     const [signupUser, setSignupUser] = useState(initialSignupData);
     const [error, setError] = useState(initialData);

     const handleClickShowPassword = () => setShowPassword((prev) => !prev);
     const handleShowLoginModal = () => setShowLoginModal(true);
     const handleCloseLoginModal = () => {
          setShowLoginModal(false);
          setError('');
          setLoginUser(initialData);
     };
     const handleChange = (e) => {
          const { name, value } = e.target;
          setLoginUser({ ...loginUser, [name]: value });
          setError({
               ...error,
               [name]: ""
          })
     };

     const handleShowSignupModal = () => setShowSignupModal(true);
     const handleCloseSignupModal = () => {
          setShowSignupModal(false);
          setError('');
          setSignupUser(initialSignupData);
     };
     const handleSignupChange = (e) => {
          const { name, value } = e.target;
          setSignupUser({ ...signupUser, [name]: value });
          setError({
               ...error,
               [name]: ""
          });
     };

     const handleLogin = (e) => {
          e.preventDefault();
          const users = userData.user;
          let errors = {};
          if (!loginUser.email || loginUser.email === "") {
               errors.email = "Please Enter an email address";
          }

          if (!loginUser.password || loginUser.password === "") {
               errors.password = "Please Enter a password";
          }

          setError(errors);

          if (Object.keys(errors).length === 0) {
               const user = users.find((u) => u.email === loginUser.email);

               if (user) {
                    if (user.password === loginUser.password) {
                         onLogin(user);
                         handleCloseLoginModal();
                    } else {
                         setError({ password: "Password does not match" });
                    }
               } else {
                    setError({ email: "User not found" });
               }
          }
     };

     const handleSignup = (e) => {
          e.preventDefault();
          let errors = {};

          if (!signupUser.firstName || signupUser.firstName === "") {
               errors.firstName = "Please Enter an Firstname";
          }
          if (!signupUser.lastName || signupUser.lastName === "") {
               errors.lastName = "Please Enter an Lastname";
          }
          if (!signupUser.email || signupUser.email === "") {
               errors.email = "Please Enter an email address";
          } else if (userData.user.email === signupUser.email) {
               errors.email = "Email already exists";
          }

          if (!signupUser.password || signupUser.password === "") {
               errors.password = "Please Enter a password";
          }

          setError(errors);

          if (Object.keys(errors).length === 0) {
               const newUser = {
                    email: signupUser.email,
                    password: signupUser.password,
                    firstname: signupUser.firstName,
                    lastname: signupUser.lastName,
                    image: "https://example.com/profile.jpg",
                    age: signupUser.age,
                    gender: signupUser.gender,
                    hobbies: signupUser.hobbies,
                    country: signupUser.country,
                    state: signupUser.state,
                    city: signupUser.city
               };
               console.log("New User Data: ", newUser);
               handleCloseSignupModal();
               toast.success("User registered successfully")
               alert("Please direct login. no functionality added here")
          }
     };

     return (
          <>
               <nav className="navbar navbar-expand-lg custom-navbar navbar-light px-md-4">
                    <Link className="navbar-brand" to="/">Brand</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                         <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                         <ul className="navbar-nav ml-auto">
                              { isLoggedIn ? (
                                   <li className="nav-item pe-4">
                                        <button className="btn btn-outline-danger nav-btn-logout" onClick={ onLogout }>Logout</button>
                                   </li>
                              ) : (
                                   <li className="nav-item pe-3">
                                        <div className="ml-auto">
                                             <button className='btn btn-outline-primary' onClick={ handleShowLoginModal }>Login</button>
                                             <button className='btn btn-outline-primary ml-2' onClick={ handleShowSignupModal }>Signup</button>
                                        </div>
                                   </li>
                              ) }
                         </ul>
                    </div>
               </nav>

               {/* Login Modal */ }
               <Modal show={ showLoginModal } handleCloseModal={ handleCloseLoginModal } title={ "Login" } >
                    <form onSubmit={ handleLogin }>
                         <div className="text-start">
                              <div
                                   className={ `form-input-wrapper` }
                              >
                                   <i className="bi bi-person-fill prefix-icon"></i>
                                   <input
                                        type="text"
                                        className="form-input"
                                        id="email"
                                        placeholder="Enter Your Email"
                                        name="email"
                                        value={ loginUser.email }
                                        onChange={ (e) => handleChange(e, "email") }
                                   />
                              </div>
                              <div className="input-error">{ error.email }</div>
                         </div>
                         <div className="text-start">
                              <div
                                   className={ `form-input-wrapper` }
                              >
                                   <i className="bi bi-lock-fill prefix-icon"></i>
                                   <input
                                        type={ showPassword ? "text" : "password" }
                                        className="form-input"
                                        id="password"
                                        placeholder="Enter Your Password"
                                        name="password"
                                        value={ loginUser.password }
                                        onChange={ (e) => handleChange(e, "password") }
                                   />
                                   { !showPassword ? (
                                        <i
                                             onClick={ handleClickShowPassword }
                                             className="bi bi-eye-fill postfix-icon"
                                        ></i>
                                   ) : (
                                        <i
                                             onClick={ handleClickShowPassword }
                                             className="bi bi-eye-slash-fill postfix-icon"
                                        ></i>
                                   ) }
                              </div>
                              <div className="input-error">{ error.password }</div>
                         </div>

                         <div>
                              <Link to="/" className="text-decoration-none">
                                   Forgot Password?
                              </Link>
                         </div>

                         <div className="mt-4">
                              <button type="submit" className="btn btn-primary px-4">
                                   Login
                              </button>
                              <Link to={ "/" } className="btn btn-light px-4 ms-3">
                                   Create Account
                              </Link>
                         </div>
                    </form>
               </Modal>

               {/* Signup Modal */ }
               <Modal show={ showSignupModal } handleCloseModal={ handleCloseSignupModal } title={ "Signup" } >
                    <form onSubmit={ handleSignup }>
                         <div className="text-start">
                              <div className={ `form-input-wrapper` }>
                                   <i className="bi bi-person-fill prefix-icon"></i>
                                   <input
                                        type="text"
                                        className="form-input"
                                        id="firstName"
                                        placeholder="Enter Your First Name"
                                        name="firstName"
                                        value={ signupUser.firstName }
                                        onChange={ handleSignupChange }
                                   />
                              </div>
                              <div className="input-error">{ error.firstName }</div>
                         </div>
                         <div className="text-start">
                              <div className={ `form-input-wrapper` }>
                                   <i className="bi bi-person-fill prefix-icon"></i>
                                   <input
                                        type="text"
                                        className="form-input"
                                        id="lastName"
                                        placeholder="Enter Your Last Name"
                                        name="lastName"
                                        value={ signupUser.lastName }
                                        onChange={ handleSignupChange }
                                   />
                              </div>
                              <div className="input-error">{ error.lastName }</div>
                         </div>
                         <div className="text-start">
                              <div className={ `form-input-wrapper` }>
                                   <i className="bi bi-envelope-fill prefix-icon"></i>
                                   <input
                                        type="email"
                                        className="form-input"
                                        id="email"
                                        placeholder="Enter Your Email"
                                        name="email"
                                        value={ signupUser.email }
                                        onChange={ handleSignupChange }
                                   />
                              </div>
                              <div className="input-error">{ error.email }</div>
                         </div>
                         <div className="text-start">
                              <div className={ `form-input-wrapper` }>
                                   <i className="bi bi-lock-fill prefix-icon"></i>
                                   <input
                                        type={ showPassword ? "text" : "password" }
                                        className="form-input"
                                        id="password"
                                        placeholder="Enter Your Password"
                                        name="password"
                                        value={ signupUser.password }
                                        onChange={ handleSignupChange }
                                   />
                                   { !showPassword ? (
                                        <i
                                             onClick={ handleClickShowPassword }
                                             className="bi bi-eye-fill postfix-icon"
                                        ></i>
                                   ) : (
                                        <i
                                             onClick={ handleClickShowPassword }
                                             className="bi bi-eye-slash-fill postfix-icon"
                                        ></i>
                                   ) }
                              </div>
                              <div className="input-error">{ error.password }</div>
                         </div>

                         <div className="mt-4">
                              <button type="submit" className="btn btn-primary px-4">
                                   Signup
                              </button>
                              <button className="btn btn-danger px-4 ms-3" onClick={ handleCloseSignupModal } type='button'>
                                   Cancel
                              </button>
                         </div>
                    </form>
               </Modal>
          </>
     );
};

export default Navbar;
