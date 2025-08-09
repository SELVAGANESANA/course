import React from "react";
import Carousel from "react-bootstrap/Carousel";
import slide1 from "../assets/slide/Flutter.png";
import slide2 from "../assets/slide/flutter1.png";
import './footer.css'

export default function Footer() {
    return (
        <div className="fixed-carousel">
            <Carousel>
                <Carousel.Item>
                    <img src={slide1} alt="First slide" />
                </Carousel.Item>

                <Carousel.Item>
                    <img src={slide2} alt="Second slide" /> 
                </Carousel.Item>

                <Carousel.Item>
                    <img src={slide2} alt="Thrid slide" />  
                </Carousel.Item>
                
                <Carousel.Item>
                    <img src={slide2} alt="Fouth slide" />   
                </Carousel.Item>

                <Carousel.Item>
                    <img src={slide2} alt="Fifth slide" />   
                </Carousel.Item>

                <Carousel.Item>
                    <img src={slide2} alt="Sixth slide" />   
                </Carousel.Item>
            </Carousel>

        </div>
    );
}
