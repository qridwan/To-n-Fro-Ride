import React from 'react';
import './Home.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import { Card } from 'react-bootstrap';
import Bus from '../../images/Frame-1.png'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home d-flex justify-content-center align-items-center p-5">
<Row className="">
    <Col xs={8} md={3}>
<Link to="/destination/bus">
<Card>
    <Card.Img className="p-3" variant="top" src={Bus} />
    <Card.Body>
      <Card.Text>
        BUS
      </Card.Text>
    </Card.Body>
  </Card> 
  </Link>   
    </Col>

    <Col xs={8} md={3}>

    <Link to="/destination/car">
    <Card>
    <Card.Img className="p-3" variant="top" src={Bus} />
    <Card.Body>
      <Card.Text>
        CAR
      </Card.Text>
    </Card.Body>
  </Card> 
    </Link>

    </Col>
    <Col xs={8} md={3}>
    <Link to="/destination/train">
    <Card>
    <Card.Img className="p-3" variant="top" src={Bus} />
    <Card.Body>
      <Card.Text>
        TRAIN
      </Card.Text>
    </Card.Body>
  </Card>  
    </Link>
  
    </Col>
    <Col xs={8} md={3}>
<Link to="/destination/bike">
<Card>
    <Card.Img className="p-3" variant="top" src={Bus} />
    <Card.Body>
      <Card.Text>
        BIKE
      </Card.Text>
    </Card.Body>
  </Card>
</Link>  
    </Col>
  </Row>
        </div>
    );
};

export default Home;