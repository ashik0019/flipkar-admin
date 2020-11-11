import React from 'react';
import { Col, Container, Jumbotron, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Layout from '../../components/Layout';
import './style.css';

/**
* @author
* @function Home
**/

const Home = (props) => {
  return (
    <Layout sidebar>
      dashboard
      {/* <Jumbotron style={{margin: '5rem', background: '#fff'}} className="text-center">
            <h1>Admin Dashboard</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, expedita dolorum fugiat quo saepe tempore accusamus modi consequuntur quibusdam error temporibus id magnam aspernatur labore illum nostrum facilis sit deleniti.</p>
        </Jumbotron> */}
    </Layout>
  )
}


export default Home