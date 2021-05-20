import React from 'react';
import { connect } from 'react-redux';
import { signIn } from '../actions';
import { push } from 'connected-react-router';
import '../css/login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    fetch('https://api.landshotelbookings.com/api/checkAuth', {
      credentials: 'include',
    }).then(res => res.json())
      .then(data => {
        if (data.authenticated && !this.props.isLogged) { 
          this.props.signIn()
          this.props.push('/admin');
        }
    });
  }

  handleChange(e) {
    this.setState({...this.state, [e.target.name]: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();

    fetch("https://api.landshotelbookings.com/api/login", {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then((res) => res.json())
    .then((data) => {
      if (data.status === "success" && data.hasOwnProperty('token')) {
          this.props.signIn()
          this.props.push('/admin');
      }
    })
    .catch((err) => console.log(err))
    
    this.setState({
      username: "",
      password: ""
    });

  }

    render() {
      return (
        <form className="loginForm">
          <label>Username</label>
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange} required/>
  
          <label>Password</label>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required/>
          <button type="button" onClick={this.handleSubmit}>Submit</button>
        </form>
        
      )
    }

    
  }

  const mapStateToProps = (state) => {
    return {
      isLogged: state.isLogged
    }
  }

  const mapDispatchToProps = () => {
    return {
      signIn,
      push
    }
    
  }


export default connect(mapStateToProps, mapDispatchToProps())(Login);