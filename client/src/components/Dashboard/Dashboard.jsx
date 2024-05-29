import React from "react";
import Accordion from "react-bootstrap/Accordion";
import "./Dashboard.css";

const Dashboard = ({ activeMenuItem, setActiveMenuItem }) => {
  return (
    <div className="sidebar_dash">
      <Accordion defaultActiveKey="0">
        {/* Profile Accordion */}
        <div className="accordion-row">
          <Accordion.Item eventKey="0" className="accordion-item_dash">
            <Accordion.Header
              className="accordion-header_dash"
              onClick={() => setActiveMenuItem("profile")}
            >
              Profile
            </Accordion.Header>
          </Accordion.Item>

          <Accordion.Item eventKey="1" className="accordion-item_dash">
            <Accordion.Header
              className="accordion-header_dash"
              onClick={() => setActiveMenuItem("new-post")}
            >
              New Post
            </Accordion.Header>
          </Accordion.Item>

          <Accordion.Item eventKey="2" className="accordion-item_dash">
            <Accordion.Header
              className="accordion-header_dash"
              onClick={() => setActiveMenuItem("posts")}
            >
              Posts
            </Accordion.Header>
          </Accordion.Item>
        </div>
      </Accordion>
    </div>
  );
};

export default Dashboard;
