import React from 'react';
import Booking from './Booking';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import '../css/admin.css';

class Admin extends React.Component {
constructor(props) {
  super(props);
  this.state = {
    bookings: [],
    selectedDate: ""
  }

  this.handleDateChange = this.handleDateChange.bind(this);
  this.handleGetBookings = this.handleGetBookings.bind(this);
  this.handleDelete = this.handleDelete.bind(this);
}

dateFormat = 'DD/MM/YYYY';

handleGetBookings(e) {
  e.preventDefault();
  fetch("/api/admin", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(this.state)
  }).then((res) => res.json())
  .then(data => {
    this.setState({...this.state, bookings: data})
  })
  .catch((err) => console.log(err))
}

handleDateChange(value, dateString) {
  this.setState({...this.state, selectedDate: dateString})
}

async handleDelete(id) {
  await fetch("/api/admin", {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: id})
  }).then(() => {
    console.log("I got here!");
    let updatedBookings = [...this.state.bookings].filter(i => i.id !== id);
    this.setState({...this.state, bookings: updatedBookings})
  })
}

  render() {
    const bookings = this.state.bookings.map(booking => <Booking key={booking.id} id={booking.id} firstName={booking.firstName} lastName={booking.lastName} phoneNum={booking.phoneNum} 
      date={booking.date} time={booking.time} persons={booking.persons} requests={booking.requests} onDelete={this.handleDelete} />);
    return (
      <div className="bookingTable">
        <DatePicker style={{marginBottom: 10, marginRight: 10}} onChange={this.handleDateChange} format={this.dateFormat}/>
        <button type="button" onClick={this.handleGetBookings}>Find Bookings</button>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{bookings}</tbody>
        </table>
      </div>
    )
  }
}

export default Admin;