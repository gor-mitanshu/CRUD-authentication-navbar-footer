import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import Video from '../assets/video.mp4';

const LandingPage = ({ isLoggedIn, onLogout, onLogin }) => {
     return (
          <>
               <Navbar isLoggedIn={ isLoggedIn } onLogout={ onLogout } onLogin={ onLogin } />
               { isLoggedIn ? (
                    <div className='outlet'>
                         <Outlet />
                    </div>
               ) : (
                    <>
                         <div className="video-container">
                              <video autoPlay loop muted>
                                   <source src={ Video } type="video/mp4" />
                                   Your browser does not support the video tag.
                              </video>
                              <div className="video-text">Welcome to Landing Page</div>
                         </div>
                    </>
               ) }
               <Footer />
          </>
     );
}

export default LandingPage;