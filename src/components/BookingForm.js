import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { DatePicker, TimePicker } from 'antd';
import '../css/bookingform.css';

class BookingForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phoneNum: "",
      location: "",
      date: "",
      time: "",
      requests: "",
      persons: "",
      recaptchaResponse: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleRecaptchaChange = this.handleRecaptchaChange.bind(this);
  }

  dateFormat = "DD/MM/YYYY"

  minimum = new Date()

  handleDateChange(value, dateString) {
    this.setState({ ...this.state, date: dateString })
  }

  handleTimeChange(value, timeString) {
    this.setState({ ...this.state, time: timeString })
  }

  handleChange(e) {
    this.setState({ ...this.state, [e.target.name]: e.target.value })
  }

  handleRecaptchaChange(value) {
    this.setState({ ...this.state, recaptchaResponse: value });
  }


  handleSubmit(e) {
    if (this.recaptcha.getValue() === "" || null) {
      alert('Error, before submitting please check the ReCAPCTHA box.');
      return;
    }

    e.preventDefault();

    fetch("/api/createBooking", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err))

    this.setState({
      firstName: "",
      lastName: "",
      phoneNum: "",
      location: "",
      date: "",
      time: "",
      requests: "",
      persons: ""
    });

    this.recaptcha.reset();
  }


  render() {
    return (
      <div className="container">
        <div className="booking-form">
          <div className="form">
            <form>
              <label>First Name</label>
              <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} />

              <label>Last Name</label>
              <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} />

              <label>Phone Number</label>
              <input type="text" name="phoneNum" value={this.state.phoneNum} onChange={this.handleChange} />

              <label>Where would you like to sit?</label>
              <select value={this.state.location} name="location" onChange={this.handleChange}>
                <option value="Dining Room">Dining Room</option>
                <option value="Pool Room">Pool Room</option>
                <option value="Deck">Deck</option>
                <option value="Outdoor Dining">Outdoor Dining</option>
              </select>

              <div>
                <label>Date</label>
                <DatePicker disabledDate={d => !d || d.isBefore(this.minimum)} onChange={this.handleDateChange} format={this.dateFormat} />
              </div>
              <div>
                <label>Time</label>
                <TimePicker minuteStep={15} use12Hours format="h:mm a" onChange={this.handleTimeChange} />
              </div>
              <label>Number of Persons</label>
              <input type="number" name="persons" value={this.state.persons} onChange={this.handleChange} />

              <label>Special Requests</label>
              <textarea name="requests" value={this.state.requests} onChange={this.handleChange} />
              <div className="recaptcha">
                <ReCAPTCHA ref={(el) => { this.recaptcha = el; }} sitekey="6LcheZMaAAAAAJk1CCMMGwI4Wfq4WtD7Zmdh8tNe" onChange={this.handleRecaptchaChange} />
              </div>
              <button className="submit" type="button" onClick={this.handleSubmit}>Submit</button>
            </form>
          </div>
        </div>
      </div>

    );
  }
}

export default BookingForm;