import React from "react";
import "./css/Footer.css"
const Footer = (props) => {
  const { background, icn } = props;
  return (
    <div className={`icons ${background}`}>
      <div className="socials">
        <span className="icon">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook" aria-hidden="true"></i>
          </a>
        </span>
        <span className="icon">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter" aria-hidden="true"></i>
          </a>
        </span>
        <span className="icon">

          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram" aria-hidden="true"></i>
          </a>
        </span>
      </div>
      <div className="right">
        <span className="icon">All rights reserved</span>
      </div>
    </div>
  )
}

export default Footer;
