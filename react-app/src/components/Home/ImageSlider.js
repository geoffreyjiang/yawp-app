import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { sliderData } from "../Home/slider-data";
import "./ImageSlider.css";
const ImageSlider = () => {
    const dispatch = useDispatch();
    const [currentSlide, setCurrentSlide] = useState(0);
    const autoScroll = true;
    let slideInterval;
    let intervalTime = 6000;
    const slideLength = sliderData.length;

    const nextSlide = () => {
        setCurrentSlide(
            currentSlide === slideLength - 1 ? 0 : currentSlide + 1
        );
    };

    const prevSlide = () => {
        setCurrentSlide(
            currentSlide === 0 ? slideLength - 1 : currentSlide - 1
        );
    };

    const auto = () => {
        slideInterval = setInterval(nextSlide, intervalTime);
    };

    useEffect(() => {
        if (autoScroll) {
            auto();
        }
        return () => clearInterval(slideInterval);
    }, [currentSlide]);

    useEffect(() => {
        setCurrentSlide(0);
    }, [dispatch]);
    return (
        <div className="slider">
            {/* <HiArrowLeft className="arrow prev" onClick={prevSlide} />
             <HiArrowRight className="arrow next" onClick={nextSlide} /> */}
            {sliderData.map((slide, index) => (
                <div
                    className={
                        index === currentSlide ? "slide current" : "slide"
                    }
                    key={index}
                >
                    {index === currentSlide && (
                        <>
                            <img src={slide.image} />

                            <div className="content">
                                <h2>{slide.heading}</h2>
                                <p>{slide.desc}</p>
                                <hr />
                            </div>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ImageSlider;
