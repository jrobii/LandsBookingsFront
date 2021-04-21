import React from 'react'
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
    state = {
        current: 'booking'
    }
    handleClick = e => {
        this.setState({ current: e.key });
    };
    render() {
        const { current } = this.state;
        return (
            <Menu theme="light" onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
                <Menu.Item disabled>
                    <h2 style={{margin: 0}}>Landsborough Hotel</h2>
                </Menu.Item>
                <Menu.Item key="booking">
                    <Link to="/">Booking</Link>
                </Menu.Item>
                <Menu.Item key="login">
                    <Link to="/login">Login</Link>
                </Menu.Item>
                <Menu.Item key="admin">
                    <Link to="/admin">Admin</Link>
                </Menu.Item>
            </Menu>
        )
    }
}

export default Nav