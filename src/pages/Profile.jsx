import React from 'react'
import Card from '../ui/Card'

const Profile = ({ userDetails }) => {
     return (
          <>
               <Card title={ "Logged User Profile" }>
                    <table className="table">
                         <thead>
                              <tr>
                                   <th>Name</th>
                                   <th>Age</th>
                                   <th>Gender</th>
                                   <th>Hobbies</th>
                                   <th>Country</th>
                                   <th>State</th>
                                   <th>City</th>
                              </tr>
                         </thead>
                         <tbody>
                              { userDetails && (
                                   <tr>
                                        <td>{ userDetails.firstname + " " + userDetails.lastname }</td>
                                        <td>{ userDetails.age }</td>
                                        <td>{ userDetails.gender }</td>
                                        <td>{ userDetails.hobbies }</td>
                                        <td>{ userDetails.country }</td>
                                        <td>{ userDetails.state }</td>
                                        <td>{ userDetails.city }</td>
                                   </tr>
                              ) }
                         </tbody>
                    </table>
               </Card>
          </>
     )
}

export default Profile