import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { toast } from 'react-toastify';
import { countries } from '../utils/data';
import Charts from './Charts';
import Profile from './Profile';
import Card from '../ui/Card';

const initialProfileData = { firstName: "", lastName: "", email: "", age: "", gender: "", hobbies: "", country: "", state: "", city: "", profileImage: null };

const Dashboard = ({ userDetails }) => {
     const [modalOpen, setModalOpen] = useState(false);
     const [showAddProfile, setShowAddProfileModal] = useState(false);
     const [selectedData, setSelectedData] = useState(null);
     const [profileUser, setProfileUser] = useState(initialProfileData);
     const [error, setError] = useState(initialProfileData);

     const openModal = (data) => {
          setSelectedData(data);
          setModalOpen(true);
     };

     const closeModal = () => {
          setSelectedData(null);
          setModalOpen(false);
     };

     const handleShowAddProfileModal = () => setShowAddProfileModal(true);
     const handleCloseAddProfileModal = () => {
          setShowAddProfileModal(false);
          setError('');
          setProfileUser(initialProfileData);
     };

     const userCount = userDetails.profiles.length;
     const totalHobbies = userDetails.profiles.reduce((acc, user) => acc + user.hobbies.length, 0);
     const genderDistribution = userDetails.profiles.reduce((acc, user) => {
          acc[user.gender] = (acc[user.gender] || 0) + 1;
          return acc;
     }, {});

     const handleProfileChange = (e) => {
          const { name, value } = e.target;
          setProfileUser({ ...profileUser, [name]: value });
          setError({
               ...error,
               [name]: ""
          });
     };

     const handleCountryChange = (e) => {
          const { value } = e.target;
          setProfileUser({ ...profileUser, country: value, state: "", city: "" });
     };

     const handleStateChange = (e) => {
          const { value } = e.target;
          setProfileUser({ ...profileUser, state: value, city: "" });
     };

     const handleImageChange = (e) => {
          const file = e.target.files[0];
          setProfileUser({ ...profileUser, profileImage: file });
     };

     const handleAddProfile = (e) => {
          e.preventDefault();
          let errors = {};

          if (!profileUser.firstName) {
               errors.firstName = "Please enter First Name";
          }
          if (!profileUser.lastName) {
               errors.lastName = "Please enter Last Name";
          }
          if (!profileUser.email) {
               errors.email = "Please enter email address";
          }
          if (!profileUser.age) {
               errors.age = "Please enter age";
          } else if (profileUser.age > 100) {
               errors.age = "Please enter a valid age";
          }
          if (!profileUser.gender) {
               errors.gender = "Please select any gender";
          }
          if (!profileUser.hobbies) {
               errors.hobbies = "Please enter any hobbies";
          }
          if (!profileUser.country) {
               errors.country = "Please select Country";
          }
          if (!profileUser.state) {
               errors.state = "Please select State";
          }
          if (!profileUser.city) {
               errors.city = "Please select City";
          }
          setError(errors);

          if (Object.keys(errors).length === 0) {
               const newUser = {
                    email: profileUser.email,
                    firstName: profileUser.firstName,
                    lastName: profileUser.lastName,
                    age: profileUser.age,
                    gender: profileUser.gender,
                    hobbies: profileUser.hobbies.split(',').map(hobby => hobby.trim()),
                    country: profileUser.country,
                    state: profileUser.state,
                    city: profileUser.city
               };
               // console.log("New User Data: ", newUser);
               userDetails.profiles.push(newUser);
               setProfileUser({
                    ...userDetails,
                    profiles: [...userDetails.profiles, newUser]
               });
               handleCloseAddProfileModal();
               toast.success("User Added successfully");
          }
     };
     return (
          <>
               <div className="container mt-4">
                    <div className="row">
                         <div className="col-lg-4">
                              <Card title={ "Total User" }>
                                   <p className="card-text">{ userCount }</p>
                              </Card>
                         </div>

                         <div className="col-lg-4">
                              <Card title={ "Total Hobbies" }>
                                   <p className="card-text">{ totalHobbies }</p>
                              </Card>
                         </div>

                         <div className="col-lg-4">
                              <Card title={ "Gender Distribution" }>
                                   <p className="card-text d-flex justify-content-between">
                                        <span>Male: <b>{ genderDistribution.Male || 0 }</b></span>
                                        <span>Female: <b>{ genderDistribution.Female || 0 }</b></span>
                                        <span>Other: <b>{ genderDistribution.Other || 0 }</b></span>
                                   </p>
                              </Card>
                         </div>
                    </div>

                    <div className='row mt-4'>
                         <div className="col-lg-12 mt-4">
                              <Profile userDetails={ userDetails } />
                         </div>
                    </div>

                    <div className="row mt-4">
                         <div className="col-lg-12">
                              <Charts />
                         </div>
                         <div className="col-lg-12 my-4">
                              <Card>
                                   <div className='d-flex justify-content-between'>
                                        <h4 className="card-title">Table (Profiles)</h4>
                                        <button className="btn btn-primary float-right mb-4 ml-3" style={ { width: "10%" } } onClick={ handleShowAddProfileModal }>Create Profile</button>
                                   </div>
                                   <table className="table">
                                        <thead>
                                             <tr>
                                                  <th>Image</th>
                                                  <th>First Name</th>
                                                  <th>Last Name</th>
                                                  <th>Age</th>
                                                  <th>Gender</th>
                                                  <th>Hobbies</th>
                                                  <th>Country</th>
                                                  <th>State</th>
                                                  <th>City</th>
                                                  <th>Action</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             { userDetails.profiles.map((data, index) => (
                                                  <tr key={ index }>
                                                       <td><img src={ "https://via.placeholder.com/150" || profileUser.profileImage } alt={ `${data.firstName} ${data.lastName}` } style={ { width: '50px', borderRadius: '50%' } } /></td>
                                                       {/* <td>
                                                                      { profileUser.profileImage ? (
                                                                           profileUser.profileImage instanceof File ? (
                                                                                <img src={ URL.createObjectURL(profileUser.profileImage) } alt={ `${data.firstName} ${data.lastName}` } style={ { width: '50px', borderRadius: '50%' } } />
                                                                           ) : (
                                                                                <img src={ profileUser.profileImage } alt={ `${data.firstName} ${data.lastName}` } style={ { width: '50px', borderRadius: '50%' } } />
                                                                           )
                                                                      ) : (
                                                                           <span>No Image</span>
                                                                      ) }
                                                                 </td> */}
                                                       <td>{ data.firstName }</td>
                                                       <td>{ data.lastName }</td>
                                                       <td>{ data.age }</td>
                                                       <td>{ data.gender }</td>
                                                       <td className="hobbies-cell">{ data.hobbies.join(', ') }</td>
                                                       <td>{ data.country }</td>
                                                       <td>{ data.state }</td>
                                                       <td>{ data.city }</td>
                                                       <td><i className="bi bi-eye" data-toggle="modal" data-target="#exampleModal" onClick={ () => openModal(data) } style={ { fontSize: "1.5rem", cursor: "pointer" } }></i></td>
                                                  </tr>
                                             )) }
                                        </tbody>
                                   </table>
                              </Card>
                         </div>
                    </div>
               </div>

               {/* View Modal for the selected user  */ }
               { selectedData && (
                    <Modal handleCloseModal={ closeModal } show={ modalOpen } title={ "View User's Profile" }>
                         <div className='d-flex justify-content-between'>
                              <div>
                                   <p>Name: <b>{ selectedData.firstName + " " + selectedData.lastName }</b></p>
                                   <p>Age: <b>{ selectedData.age }</b></p>
                                   <p>Gender:<b> { selectedData.gender }</b></p>
                                   <p>Hobbies: <b>{ selectedData.hobbies.join(', ') }</b></p>
                                   <p>Country: <b>{ selectedData.country }</b></p>
                                   <p>State:<b> { selectedData.state }</b></p>
                                   <p>City: <b>{ selectedData.city }</b></p>
                              </div>
                              <div>
                                   <img src={ selectedData.profileImage } alt="" style={ { width: "100%", borderRadius: "50%" } } />
                              </div>
                         </div>
                    </Modal>
               ) }

               {/* Modal for the user to be added */ }
               <Modal handleCloseModal={ handleCloseAddProfileModal } show={ showAddProfile } title={ "Create New Profile" }>
                    <form onSubmit={ handleAddProfile }>
                         <div className="row">
                              <div className="col-md-6">
                                   <div className="form-group">
                                        <label>First Name*</label>
                                        <input type="text" placeholder='Please Enter Firstname' className="form-control" name="firstName" value={ profileUser.firstName }
                                             onChange={ handleProfileChange } />
                                        { error.firstName && <span className="text-danger">{ error.firstName }</span> }
                                   </div>
                              </div>
                              <div className="col-md-6">
                                   <div className="form-group">
                                        <label>Last Name*</label>
                                        <input type="text" placeholder='Please Enter Lastname' className="form-control" name="lastName" value={ profileUser.lastName }
                                             onChange={ handleProfileChange } />
                                        { error.lastName && <span className="text-danger">{ error.lastName }</span> }
                                   </div>
                              </div>
                         </div>


                         <div className="form-group">
                              <label>Email*</label>
                              <input type="email" placeholder='Please Enter Email' className="form-control" name="email" value={ profileUser.email }
                                   onChange={ handleProfileChange } />
                         </div>

                         <div className="row">
                              <div className="col-md-6">
                                   <div className="form-group">
                                        <label>Age*</label>
                                        <input type="number" placeholder='Please Enter Age' className="form-control" name="age" value={ profileUser.age }
                                             onChange={ handleProfileChange } />
                                   </div>
                              </div>
                              <div className="col-md-6">
                                   <div className="form-group">
                                        <label>Gender*</label>
                                        <select className="form-control" name="gender" value={ profileUser.gender } onChange={ handleProfileChange }>
                                             <option value="">Select Gender</option>
                                             <option value="Male">Male</option>
                                             <option value="Female">Female</option>
                                             <option value="Other">Other</option>
                                        </select>
                                   </div>
                              </div>
                         </div>

                         <div className="form-group">
                              <label>Hobbies*</label>
                              <input type="text" placeholder='Please Enter Hobbies' className="form-control" name="hobbies" value={ profileUser.hobbies }
                                   onChange={ handleProfileChange } />
                         </div>


                         <div className="form-group">
                              <label>Country*</label>
                              <select className="form-control" name="country" value={ profileUser.country }
                                   onChange={ handleCountryChange }>
                                   <option value="">Select Country</option>
                                   { countries.map((country, index) => (
                                        <option key={ index } value={ country.name }>{ country.name }</option>
                                   )) }
                              </select>
                              { error.country && <span className="text-danger">{ error.country }</span> }
                         </div>

                         { profileUser.country && (
                              <>
                                   <div className="form-group">
                                        <label>State*</label>
                                        <select className="form-control" name="state" value={ profileUser.state } onChange={ handleStateChange }>
                                             <option value="">Select State</option>
                                             { countries.find(country => country.name === profileUser.country).states.map((state, index) => (
                                                  <option key={ index } value={ state.name }>{ state.name }</option>
                                             )) }
                                        </select>
                                        { error.state && <span className="text-danger">{ error.state }</span> }
                                   </div>
                              </>
                         ) }
                         { profileUser.state && (
                              <>
                                   <div className="form-group">
                                        <label>City*</label>
                                        <select className="form-control" name="city" value={ profileUser.city } onChange={ handleProfileChange }>
                                             <option value="">Select City</option>
                                             { countries.find(country => country.name === profileUser.country).states.find(state => state.name === profileUser.state).cities.map((city, index) => (
                                                  <option key={ index } value={ city }>{ city }</option>
                                             )) }
                                        </select>
                                        { error.city && <span className="text-danger">{ error.city }</span> }
                                   </div>
                              </>
                         ) }

                         <div className="form-group">
                              <label>Profile Image*</label>
                              <input type="file" className="form-control-file" name="profileImage" onChange={ handleImageChange } />
                         </div>

                         <button type="submit" className="btn btn-primary mt-2">Submit</button>
                    </form>
               </Modal>

          </>
     );
};

export default Dashboard;
