import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function MuseumDepartmentNav(props) {

  const [departments, setDepartments] = useState([])

  const fetchDepartments = async () =>{
    const departmentsRespose = await fetch('http://localhost:3000/departments')
    const departments = await departmentsRespose.json()
    setDepartments(departments)
  }

  useEffect(()=>{
    fetchDepartments()
  },[])
  

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">MET Paintings</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" >Home</Nav.Link>
            <NavDropdown title="Departments" id="basic-nav-dropdown">
              {departments.map(department => 
                <Nav.Link key={department.departmentId} as={Link} to={`/department/${department.departmentId}`}>
                  <NavDropdown.Item as={'div'}>{department.displayName}</NavDropdown.Item>
                </Nav.Link>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );

}

export default MuseumDepartmentNav

