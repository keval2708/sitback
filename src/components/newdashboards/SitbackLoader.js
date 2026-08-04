import React from 'react';
import { Col, Row } from 'react-bootstrap';

const SitbackLoader = ({ color = "text-info" }) => (
  <div className="appointment-submit-main-div">
    <Row>
      <Col md={12}>
        <div className="sitback-main-loader-wrapper">
          <div className={`spinner-border ${color}`} role="status" />
        </div>
      </Col>
    </Row>
  </div>
);

export default SitbackLoader;
