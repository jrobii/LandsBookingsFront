import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    this.setState({...this.state, [e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch("/api/login", {
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
      username: "",
      password: ""
    });

  }

    render() {
      return (
        <form>
          <label>Username</label>
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
  
          <label>Password</label>
          <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
          <button type="button" onClick={this.handleSubmit}>Submit</button>
        </form>
        
      )
    }
  }

export default Login;