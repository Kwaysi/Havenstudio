import React from "react";
import "./css/Footer.css"
const Footer = (props) => {
    const {background, icn} = props;
    return (
        <div className={`icons ${background}`}>
            <div className="socials">
                <span className={`icon ${icn}`}>
                    <a href="www.com"><i className="fab fa-facebook" aria-hidden="true"></i>
                    </a>
                </span>
                <span className={`icon ${icn}`}>
                    <a href="www.com" target="_blank"><i className="fab fa-twitter" aria-hidden="true"></i>
                    </a>
                </span>
                <span className={`icon ${icn}`}>
                    <a href="www.com" target="_blank"><i className="fab fa-instagram" aria-hidden="true"></i>
                    </a>
                </span>
            </div>
            <div className="right">
            <span className={`icon ${icn}`}><p>All rights reserved</p></span>
            </div>
        </div>
    )
}

export default Footer;