import React from 'react';
import { DatePicker, TimePicker } from 'antd';
import '../css/editbooking.css';

class EditBooking extends React.Component {
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
        };

        this.getBooking = this.getBooking.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
    }

    dateFormat = "DD/MM/YYYY"

    minimum = new Date()

    handleSubmit(e) {
        e.preventDefault();

        fetch("/api/booking", {
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: this.props.match.params.id, data: this.state})
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
    }

    handleDateChange(value, dateString) {
        this.setState({ ...this.state, date: dateString })
    }

    handleTimeChange(value, timeString) {
        this.setState({ ...this.state, time: timeString })
    }

    handleChange(e) {
        this.setState({ ...this.state, [e.target.name]: e.target.value })
    }

    getBooking(id) {
        fetch("/api/booking", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: id })
        })
            .then((res) => res.json())
            .then(data => {
                this.setState({
                    ...this.state,
                    firstName: data.firstName,
                    lastName: data.lastName,
                    phoneNum: data.phoneNum,
                    date: data.date,
                    time: data.time,
                    requests: data.requests,
                    persons: data.persons
                });
            });
    }

    componentDidMount() {
        this.getBooking(this.props.match.params.id);
    }

    render() {
        return (
            <div className="editContainer">
                <div className="editBooking-form">
                    <div className="editForm">
                        <form>
                            <label>First Name</label>
                            <input type="text" name="firstName" value={this.state.firstName} onChange={this.handleChange} />

                            <label>Last Name</label>
                            <input type="text" name="lastName" value={this.state.lastName} onChange={this.handleChange} />

                            <label>Phone Number</label>
                            <input type="text" name="phoneNum" value={this.state.phoneNum} onChange={this.handleChange} />
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
                            <button className="submit" type="button" onClick={this.handleSubmit}>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default EditBooking;