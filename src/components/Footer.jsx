import React from 'react';

const Footer = () => (
     <footer className="py-4 footer">
          <div className="container text-center">
               <div className="row">
                    <div className="col-lg-4 mb-4 mb-lg-0">
                         <h5 className="text-uppercase">Company</h5>
                         <p className="">About Us</p>
                         <p className="">Careers</p>
                         <p className="">Contact</p>
                    </div>
                    <div className="col-lg-4 mb-4 mb-lg-0">
                         <h5 className="text-uppercase">Products</h5>
                         <p className="">Our Services</p>
                         <p className="">Plans</p>
                    </div>
                    <div className="col-lg-4">
                         <h5 className="text-uppercase">Follow Us</h5>
                         <div className="social-icons">
                              <div href="#" className="text-white me-2"><i className="fab fa-facebook-f"></i></div>
                              <div href="#" className="text-white me-2"><i className="fab fa-twitter"></i></div>
                              <div href="#" className="text-white me-2"><i className="fab fa-instagram"></i></div>
                              <div href="#" className="text-white me-2"><i className="fab fa-linkedin"></i></div>
                         </div>
                    </div>
               </div>
          </div>
          <div className="text-center  mt-3">
               <p>&copy; { new Date().getFullYear() } gor.mitanshu3@gmail.com. All Rights Reserved.</p>
          </div>
     </footer>
);

export default Footer;
