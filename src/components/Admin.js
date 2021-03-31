import React from 'react';
import Booking from './Boooking';

class Admin extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    bookings: []
  }
}

componentDidMount() {
  fetch("/api/admin", {
    method: 'GET'
  }).then((res) => res.json())
  .then(data => {
    this.setState({...this.state, bookings: data})
  })
  .catch((err) => console.log(err))
}
  render() {
    const bookings = this.state.bookings.map(booking => <Booking key={booking.id} firstName={booking.firstName} lastName={booking.lastName} phoneNum={booking.phoneNum} 
      date={booking.date} time={booking.time} persons={booking.persons} requests={booking.requests} />);
    return (
      <table id="bookings">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Date</th>
            <th>Time</th>
            <th>Persons Attending</th>
            <th>Requests</th>
          </tr>
        </thead>
        <tbody>{bookings}</tbody>
        
      </table>
    )
  }
}

export default Admin;