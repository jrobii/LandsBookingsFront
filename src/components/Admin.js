import React from 'react';
import Booking from './Booking';
import { DatePicker } from 'antd';
import '../css/admin.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { NotificationManager } from 'react-notifications';

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

  exportPDF = () => {
    const doc = new jsPDF("landscape", "pt", "A4");
    doc.setFontSize(15);
    const title = "Booking Report";
    const headers = [["First Name", "Last Name", "Phone #", "Location", "Date", "Time", "Persons", "Requests"]]

    const data = this.state.bookings.map(booking => [booking.firstName, booking.lastName, booking.phoneNum, 
    booking.location, booking.date, booking.time, booking.persons, booking.requests]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };

    doc.text(title, 40, 40);
    doc.autoTable(content);
    doc.save("report.pdf");

  }

  handleGetBookings(e) {
    e.preventDefault();
    fetch(`https://api.landshotelbookings.com/api/admin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then((res) => res.json())
      .then(data => {
        this.setState({ ...this.state, bookings: data });
      })
      .catch((err) => console.log(err));
  }

  handleDateChange(value, dateString) {
    this.setState({ ...this.state, selectedDate: dateString });
  }

  async handleDelete(id) {
    await fetch(`https://api.landshotelbookings.com/api/admin`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: id })
    }).then(() => {
      let updatedBookings = [...this.state.bookings].filter(i => i.id !== id);
      this.setState({ ...this.state, bookings: updatedBookings })
      NotificationManager.success('The booking was deleted successfully.', 'Success!', 5000);
    }).catch(() =>{
      NotificationManager.error('An unknown error has occurred.', 'Error!', 5000);
    });
  }

  render() {
    const bookings = this.state.bookings.map(booking => <Booking key={booking.id} id={booking.id} firstName={booking.firstName} lastName={booking.lastName} phoneNum={booking.phoneNum}
      location={booking.location} date={booking.date} time={booking.time} persons={booking.persons} requests={booking.requests} onDelete={this.handleDelete} />);
      
    const deckBookings = bookings.filter(location => location.props.location === "Deck");
    const tvBookings = bookings.filter(location => location.props.location === "Pool Room");
    const diningBookings = bookings.filter(location => location.props.location === "Dining Room");

    return (
      <div className="bookingTable">
        <DatePicker style={{ marginBottom: 10, marginRight: 10 }} onChange={this.handleDateChange} format={this.dateFormat} />
        <button className="findButton" type="button" onClick={this.handleGetBookings}>Find Bookings</button>

        <h1 className="heading">Deck Bookings</h1>
        <table id="bookings">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Date & Time</th>
              <th>Persons Attending</th>
              <th>Requests</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{deckBookings.length ? deckBookings : <tr><td>There are currently no bookings for this date.</td></tr>}</tbody>
        </table>

        <h1 className="heading">TV Room Bookings</h1>
        <table id="bookings">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Date & Time</th>
              <th>Persons Attending</th>
              <th>Requests</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{tvBookings.length ? tvBookings : <tr><td>There are currently no bookings for this date.</td></tr>}</tbody>
        </table>

        <h1 className="heading">Dining Room Bookings</h1>
        <table id="bookings">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Phone Number</th>
              <th>Date & Time</th>
              <th>Persons Attending</th>
              <th>Requests</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{diningBookings.length ? diningBookings : <tr><td>There are currently no bookings for this date.</td></tr>}</tbody>
        </table>
        <button className="reportButton" onClick={() => this.exportPDF()}>Generate Report</button>
      </div>
    )
  }
}

export default Admin;