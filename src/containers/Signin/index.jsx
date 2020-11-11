import React, {useEffect, useState} from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import Layout from '../../components/Layout';
import Input from '../../components/UI/input';
import{login} from '../../actions'
import {useDispatch, useSelector} from 'react-redux'
import { Redirect } from 'react-router-dom';
/**
* @author
* @function Signin
**/

const Signin = (props) => {
  const [email, setEmail] =  useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState('');
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  //input data
  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email,password
    }
      dispatch( login(user))
  }

  if(auth.authenticate){
    return <Redirect to={`/`} />
  }

  return (
    <Layout>
      <Container>
        <Row style={{ marginTop: '15%' }}>
          <Col md={{ span: 6, offset: 3 }}>
            <div className="text-center">
              <h3>Admin Login</h3>
            </div>
            <Card style={{ margin: '30px' }}>
              <Card.Body>
                <Form onSubmit={userLogin}>
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

                  <Button variant="primary" type="submit" >
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


export default Signin