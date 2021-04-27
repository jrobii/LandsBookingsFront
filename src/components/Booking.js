import React from 'react';
import '../css/admin.css';

const Booking = (props) => {

    return (
        <tr>
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>{props.phoneNum}</td>
            <td>{props.date}</td>
            <td>{props.time}</td>
            <td>{props.persons}</td>
            <td>{props.requests}</td>
            <td><button className="editButton">Edit</button>
            <button className="deleteButton" onClick={() => props.onDelete(props.id)}>Delete</button></td>
            
      </tr>

      
    );
  };

  export default Booking;