import React from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

class BookingForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: "",
        lastName: "",
        phoneNum: "",
        date: "",
        time: "",
        requests: "",
        persons: "",
        recaptchaResponse: ""
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleRecaptchaChange = this.handleRecaptchaChange.bind(this);
    }
  
    handleChange(e) {
      this.setState({...this.state, [e.target.name]: e.target.value})
    }

    handleRecaptchaChange(value) {
      this.setState({...this.state, recaptchaResponse: value,
      });
    }
  
    handleSubmit(e) {
      e.preventDefault();
  
      fetch("/api/booking", {
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
        date: "",
        time: "",
        requests: "",
        persons: ""
      });

      this.recaptcha.reset();
    }
  
    
    render() {
      return (
        <form>
  
          <label>First Name</label>
          <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
  
          <label>Last Name</label>
          <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} />

          <label>Phone Number</label>
          <input type="text" name="phoneNum" value={this.state.phoneNum} onChange={this.handleChange} />
  
          <label>Date</label>
          <input type="date" name="date" value={this.state.date} onChange={this.handleChange} />
  
          <label>Time</label>
          <input type="time" name="time" value={this.state.time} onChange={this.handleChange} />
  
          <label>Number of Persons</label>
          <input type="number" name="persons" value={this.state.persons} onChange={this.handleChange} />
  
          <label>Special Requests</label>
          <textarea name="requests" value={this.state.requests} onChange={this.handleChange} />
          <ReCAPTCHA ref={(el) => { this.recaptcha = el; }} sitekey="6LcheZMaAAAAAJk1CCMMGwI4Wfq4WtD7Zmdh8tNe" onChange={this.handleRecaptchaChange} />
          <button type="button" onClick={this.handleSubmit}>Submit</button>
        </form>
        
      );
    }
  }

  export default BookingForm;