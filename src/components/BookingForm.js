import React from 'react';

class BookingForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: "",
        lastName: "",
        date: "",
        time: "",
        requests: "",
        persons: ""
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(e) {
      this.setState({ [e.target.name]: e.target.value})
    }
  
    handleSubmit(e) {
      e.preventDefault();
  
      fetch("http://localhost:8000/api/booking", {
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
        date: "",
        time: "",
        requests: "",
        persons: ""
      });
    }
  
    
    render() {
      return (
        <form>
  
          <label>First Name</label>
          <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} />
  
          <label>Last Name</label>
          <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} />
  
          <label>Date</label>
          <input type="date" name="date" value={this.state.date} onChange={this.handleChange} />
  
          <label>Time</label>
          <input type="time" name="time" value={this.state.time} onChange={this.handleChange} />
  
          <label>Number of Persons</label>
          <input type="number" name="persons" value={this.state.persons} onChange={this.handleChange} />
  
          <label>Special Requests</label>
          <textarea name="requests" value={this.state.requests} onChange={this.handleChange} />
          <button type="button" onClick={this.handleSubmit}>Submit</button>
        </form>
        
      );
    }
  }

  export default BookingForm;