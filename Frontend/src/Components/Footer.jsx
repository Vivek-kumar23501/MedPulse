import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <style>
        {`
          .footer {
            background: #00796b; /* teal */
            color: #ffffff;
            padding: 40px 0;
            font-family: 'Poppins', sans-serif;
          }

          .footer a {
            color: #b2dfdb; /* light teal */
            text-decoration: none;
          }

          .footer a:hover {
            color: #ffffff;
            text-decoration: underline;
          }

          .footer h5 {
            font-weight: 600;
            margin-bottom: 20px;
            color: #ffffff;
          }

          .footer p, .footer li {
            font-size: 14px;
            margin-bottom: 10px;
          }

          .footer .footer-bottom {
            border-top: 1px solid #004d40;
            margin-top: 20px;
            padding-top: 20px;
            text-align: center;
            font-size: 13px;
            color: #b2dfdb;
          }

          .footer-logo {
            height: 50px;
            margin-bottom: 10px;
          }
        `}
      </style>

      <div className="footer">
        <Container>
          <Row>
            {/* About Section */}
            <Col md="4" sm="12" className="mb-4">
              <img src="/MedPulse logo.jpg" alt="MedPulse Logo" className="footer-logo" />
              <p>
                MedPulse is a multilingual AI chatbot designed to educate rural and semi-urban populations about preventive healthcare, disease symptoms, and vaccination schedules. Integrated with government health databases for real-time alerts.
              </p>
            </Col>

            {/* Quick Links */}
            <Col md="2" sm="6" className="mb-4">
              <h5>Quick Links</h5>
              <ul className="list-unstyled">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/health-awareness">Health Awareness</Link></li>
                <li><Link to="/symptom-checker">Symptom Checker</Link></li>
                <li><Link to="/vaccinations">Vaccinations</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </Col>

            {/* Resources */}
            <Col md="3" sm="6" className="mb-4">
              <h5>Resources</h5>
              <ul className="list-unstyled">
                <li><Link to="/govt-programs">Govt Health Programs</Link></li>
                <li><Link to="/dashboards">Govt Dashboards</Link></li>
                <li><Link to="/ai-assistant">AI Tools</Link></li>
                <li><Link to="/whatsapp-bot">WhatsApp Chatbot</Link></li>
              </ul>
            </Col>

            {/* Contact Info */}
            <Col md="3" sm="12" className="mb-4">
              <h5>Contact</h5>
              <p>Government of Odisha</p>
              <p>Electronics & IT Department</p>
              <p>Email: info@medpulse.gov.in</p>
              <p>Phone: +91 12345 67890</p>
            </Col>
          </Row>

          <div className="footer-bottom">
            &copy; 2025-26 Smart India Hackathon. All rights reserved. | SIH Project: SIH25049
          </div>
        </Container>
      </div>
    </>
  );
};

export default Footer;
