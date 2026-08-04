import React from 'react';
import { Col, Row } from 'react-bootstrap';

const SitbackVideoLoader = () => (
  <div className="appointment-submit-main-div">
    <Row>
      <Col md={12}>
        <div className="sitback-main-loader-wrapper video-upload-loader">
          <div className="spinner-border text-info" role="status" />
        </div>
      </Col>
    </Row>
  </div>
);

export default SitbackVideoLoader;
