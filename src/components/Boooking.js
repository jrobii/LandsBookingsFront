import React from 'react';
import '../App.css';
const Booking = props => {
    return (
        <tr>
            <td>{props.firstName}</td>
            <td>{props.lastName}</td>
            <td>{props.phoneNum}</td>
            <td>{props.date}</td>
            <td>{props.time}</td>
            <td>{props.persons}</td>
            <td>{props.requests}</td>
      </tr>
      
    );
  };

  export default Booking;