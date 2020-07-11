import React from "react";
import "./CardInfo.css";
export default function CardInfo(props) {
  return (
    <div className="card-info">
      <div className="our-team">
        <div className="picture">
          <img className="img-fluid" src={props.item.image} alt="dev" />
        </div>
        <div className="team-content">
          <h3 className="name">{props.item.name}</h3>
          <h4 className="title">{props.item.jobTitle}</h4>
        </div>
        <ul className="social">
          <li>
            <a
              href={props.item.facebook}
              className="fa fa-facebook"
              aria-hidden="true"
              target="_blank"
            />
          </li>
          <li>
            <a
              href="https://codepen.io/collection/XdWJOQ/"
              className="fa fa-twitter"
              aria-hidden="true"
              target="_blank"
            />
          </li>
          <li>
            <a
              href="https://codepen.io/collection/XdWJOQ/"
              className="fa fa-google-plus"
              aria-hidden="true"
            />
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/h%C3%B9ng-tr%E1%BB%8Bnh-76b128173/"
              className="fa fa-linkedin"
              aria-hidden="true"
            />
          </li>
        </ul>
      </div>
    </div>
  );
}
