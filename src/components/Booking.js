import React from 'react';
import '../css/admin.css';
import { Link } from 'react-router-dom';

const Booking = (props) => {
  return (
    <tr>
      <td>{props.firstName}</td>
      <td>{props.lastName}</td>
      <td>{props.phoneNum}</td>
      <td>{props.location}</td>
      <td>{props.date}, {props.time}</td>
      <td>{props.persons}</td>
      <td>{props.requests}</td>
      <td><Link to={`/booking/${props.id}`} title="Edit"><button className="editButton">Edit</button></Link>
        <button className="deleteButton" onClick={() => props.onDelete(props.id)}>Delete</button></td>

    </tr>


  );
};

export default Booking;