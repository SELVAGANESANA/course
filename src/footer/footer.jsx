import React from "react";
import Carousel from "react-bootstrap/Carousel";
import slide1 from '../assets/slide1.jpg';
import slide2 from '../assets/slide2.jpg';
import slide3 from '../assets/slide3.jpg';
import slide4 from '../assets/slide4.jpg';
import slide5 from '../assets/slide5.jpg';
import slide6 from '../assets/slide6.jpg';
import slide7 from '../assets/slide7.jpg';
import slide8 from '../assets/slide8.jpg';
import slide9 from '../assets/slide9.jpg';
import slide10 from '../assets/slide10.jpg';

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
                    <img src={slide3} alt="Thrid slide" />  
                </Carousel.Item>
                
                <Carousel.Item>
                    <img src={slide4} alt="Fouth slide" />   
                </Carousel.Item>

                <Carousel.Item>
                    <img src={slide5} alt="Fifth slide" />   
                </Carousel.Item>

                <Carousel.Item>
                    <img src={slide6} alt="Sixth slide" />   
                </Carousel.Item>
                  <Carousel.Item>
                    <img src={slide7} alt="Sixth slide" />   
                </Carousel.Item>
                  <Carousel.Item>
                    <img src={slide8} alt="Sixth slide" />   
                </Carousel.Item>
                 <Carousel.Item>
                    <img src={slide9} alt="Sixth slide" />   
                </Carousel.Item>
                 <Carousel.Item>
                    <img src={slide10} alt="Sixth slide" />   
                </Carousel.Item>
                
            </Carousel>

        </div>
    );
}
