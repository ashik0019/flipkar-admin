import React from 'react'
import { Container, Jumbotron, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, } from 'react-router-dom';
import { signout } from '../../actions/auth.actions';
/**
* @author
* @function Header
**/

const Header = (props) => {
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()


    const logout = () => {
        dispatch(signout())
    }

    const renderLoggedInLings = () => {
        return (
            <Nav>
                <li>
                    <span className="nav-link" onClick={logout}>Singout</span>
                </li>
            </Nav>

        )
    }

    const nonLoggedInLinks = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <NavLink to="/signin" className="nav-link">Signin</NavLink>
                </li>
                <li>
                    <NavLink to="/signup" className="nav-link">Signup</NavLink>
                </li>
            </Nav>
        )
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ zIndex: 1, }}>
                <Container fluid>
                    {/* <Navbar.Brand href="#">Admin Dashboard</Navbar.Brand> */}
                    <Link to="/" className="navbar-brand">Admin Dashboard</Link>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                        </Nav>
                        {auth.authenticate ? renderLoggedInLings() : nonLoggedInLinks()}

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}


export default Header