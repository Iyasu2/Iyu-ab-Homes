import React from "react";
import "./Contact.css";
import msg_icon from "../../../assets/msg-icon.png";
import mail_icon from "../../../assets/mail-icon.png";
import phone_icon from "../../../assets/phone-icon.png";
import location_icon from "../../../assets/location-icon.png";
import white_arrow from "../../../assets/white-arrow.png";

const Contact = () => {
  return (
    <div className="contact" id="contact">
      <div className="contact-col">
        <h3>
          Send us a message <img src={msg_icon} />
        </h3>
        <p>
          We value your feedback, questions, and suggestions. Get in touch with
          us through the contact form or find our contact information below.
        </p>
        <ul>
          <li>
            {" "}
            <img src={mail_icon} />
            iyu-ab@gmail.com
          </li>
          <li>
            {" "}
            <img src={phone_icon} />
            +251-955389564
          </li>
          <li>
            {" "}
            <img src={location_icon} />
            Addis Ababa, Ethiopia
            <br /> Kolfe keranio subcity Woreda 06
          </li>
        </ul>
      </div>
      <div className="contact-col">
        <form>
          <label>Your name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            required
          />
          <label>Phone number</label>
          <input
            type="tel"
            name="phone"
            placeholder="Enter your mobile number"
            required
          />
          <label>Write your messages here</label>
          <textarea
            name="message"
            rows="6"
            placeholder="Enter your message"
            required
          ></textarea>
          <button type="submit" className="btn dark-btn">
            Submit now <img src={white_arrow} />
          </button>
        </form>
        <span></span>
      </div>
    </div>
  );
};

export default Contact;
