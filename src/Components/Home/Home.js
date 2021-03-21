import React from "react";
import "./Home.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { data } from "./HomeData";

const Home = () => {
  return (
    <div className="home d-flex justify-content-center align-items-center">
      <Row className="p-4 d-flex justify-content-center">
        {data.map((obj) => {
          return (
            <Col xs={7} md={3} className="mb-4">
              <Card>
                <Link to={`/destination/${obj.vehicleName}`}>
                  <Card.Img
                    className="bg-light p-3"
                    variant="top"
                    src={obj.image}
                    width="280"
                    height="250"
                  />
                  <Card.Body className="card-body bg-info text-white bold text-center">
                    <Card.Text>
                      <h4>{obj.vehicleName}</h4>
                    </Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};

export default Home;
