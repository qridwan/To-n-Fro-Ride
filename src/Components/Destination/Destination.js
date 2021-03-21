import React, { useState } from "react";
import { Row, Col, Card, ListGroup, Image } from "react-bootstrap";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import "./Destination.css";
import group from "../../images/peopleicon.png";
import { data } from "../Home/HomeData";
import HolyMap from "../HolyMap/HolyMap";
import {faPlaneDeparture, faPlaneArrival} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Destination = () => {
  const { vehicle } = useParams();
  const [location, setLocation] = useState({
    valid: false,
    from: "",
    to: "",
  });
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    const state = {
      valid: true,
      from: data.From,
      to: data.To,
    };

    setLocation(state);
  };

  const transportImg = data.find((obj) => vehicle === obj.vehicleName);
  const imageSrc = transportImg.image;

  return (
    <Row className="d-flex justify-content-center my-5">
      <Col xs={8} md={4} className="mb-3">
        {location.valid === false ? (
          <div className="detination-form">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h6>Pickup Point</h6>
              <input
                name="From"
                placeholder="From"
                ref={register({ required: true, maxLength: 20 })}
              />
              <h6>Destination</h6>
              <input
                name="To"
                placeholder="To"
                ref={register({ required: true, maxLength: 20 })}
              />
              <br />
              <input type="submit" value="SEARCH" />
            </form>
          </div>
        ) : (
          <Card className="bg-dark">
            <Card.Header className="m-2 rounded  bg-info text-light">
             <FontAwesomeIcon icon={faPlaneDeparture} /> Departure: <strong>{location.from} </strong> <br />
             <FontAwesomeIcon icon={faPlaneArrival} /> Destination: <strong> {location.to} </strong>{" "}
            </Card.Header>
            <ListGroup className="p-2">
              <ListGroup.Item className="m-1">
                {" "}
                {vehicle} <Image src={group} width="20" height="20"></Image> 1{" "}
                <Image
                  className="ml-2"
                  src={`${imageSrc}`}
                  width="40"
                  height="40"
                />{" "}
                <span className="ml-3 text-success">$134</span>
              </ListGroup.Item>
              <ListGroup.Item className="m-1">
                {vehicle} <Image src={group} width="20" height="20"></Image> 2{" "}
                <Image
                  className="ml-2"
                  src={`${imageSrc}`}
                  width="40"
                  height="40"
                />{" "}
                <span className="ml-3 text-success">$234</span>
              </ListGroup.Item>
              <ListGroup.Item className="m-1">
                {vehicle} <Image src={group} width="20" height="20"></Image> 3{" "}
                <Image
                  className="ml-2"
                  src={`${imageSrc}`}
                  width="40"
                  height="40"
                />{" "}
                <span className="ml-3 text-success">$404</span>
              </ListGroup.Item>
              <ListGroup.Item className="m-1">
                {vehicle} <Image src={group} width="20" height="20"></Image> 4{" "}
                <Image
                  className="ml-2"
                  src={`${imageSrc}`}
                  width="40"
                  height="40"
                />{" "}
                <span className="ml-3 text-success">$550</span>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        )}
      </Col>

      <Col xs={10} md={7}>
        <HolyMap className="mx-5" />
      </Col>
    </Row>
  );
};

export default Destination;
