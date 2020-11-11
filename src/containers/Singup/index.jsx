import React from 'react'
import { useState } from 'react'
import { Button, Card, Col, Container, Form, Row, Spinner, Toast } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Layout from '../../components/Layout'
import Input from '../../components/UI/input'
import { signup } from '../../actions'


/**
* @author
* @function Signup
**/

const Signup = (props) => {
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');
  const auth = useSelector(state => state.auth)
  const user = useSelector(state => state.user)
  const dispath = useDispatch();

  const userSingup = (e) => {
    e.preventDefault();
    const user = {
      firstname, lastname, email, password
    }
    dispath(signup(user))
  }

  if (auth.authenticate) {
    return <Redirect to={`/`} />
  }

  if (user.loading) {
    return (
      <Spinner size="lg" variant="success" animation="border" role="status" style={{ marginLeft: '50%', marginTop: '20%' }}>
        <span className="sr-only">Loading...</span>
      </Spinner>
    )
  }

  

  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: '15%' }}>
          <Col md={{ span: 6, offset: 3 }}>
            <div className="text-center">
              {user.message}
              <h3>Admin Signup</h3>
            </div>
            <Card style={{ margin: '30px' }}>
              <Card.Body>
                <Form onSubmit={userSingup}>
                  <Row>
                    <Col md={6}>
                      <Input
                        label="First Name"
                        type="text"
                        placeholder="Enter your first name"
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </Col>
                    <Col md={6}>
                      <Input
                        label="Last Name"
                        type="text"
                        value={lastname}
                        placeholder="Enter your last name"
                        onChange={(e) => setLastName(e.target.value)}

                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <Input
                        label="Email Address"
                        type="email"
                        value={email}
                        placeholder="Enter your email address"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12}>
                      <Input
                        label="Password"
                        type="password"
                        value={password}
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Col>
                  </Row>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}


export default Signup