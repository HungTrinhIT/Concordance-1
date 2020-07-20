import React, { Component } from "react";
import "./aboutus.css";
import CardInfo from "./CardInfo";


const infoDevs = [
  {
    name: "Trịnh Vũ Minh Hùng",
    image: "/images/hung_dev.jpg",
    jobTitle: "Computer Science",
    github: "https://github.com/HungTrinh99",
    facebook: "https://www.facebook.com/minhhung.it.99",
  },
  {
    name: "Lê Hoài Bảo",
    image: "/images/bao_dev.jpg",
    jobTitle: "Computer Science",
    github: "https://github.com/lhoaibao",
    facebook: "https://www.facebook.com/profile.php?id=100009318796476",
  },
];
export default class Aboutus extends Component {
  render() {
    let cardInfos = infoDevs.map((item, index) => {
      return (
        <div className="col-6" key={index}>
          <CardInfo item={item} />
        </div>
      );
    });
    return (
      <div className="container-fuild">
        {/* CardInfos */}
        <div class="row">{cardInfos}</div>
      </div>
    );
  }
}
