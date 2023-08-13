import React, { useRef, useState } from "react";
import "./Slide.scss"

function Slide({ slideProp, current, handleSlideClick }) {
    const slide = useRef(null)
    const { src, button, headline, index } = slideProp
    let classNames = 'slide'
    if (current === index) {
        classNames += ' slide--current'
    } else if (current - 1 === index) {
        classNames += ' slide--previous'
    } else if (current + 1 === index) {
        classNames += ' slide--next'
    }

    const handleMouseMove = (e) => {
        const el = slide.current
        const r = el.getBoundingClientRect()
        el.style.setProperty('--x', e.clientX - (r.left + Math.floor(r.width/2)))
        el.style.setProperty('--y', e.clientY - (r.top + Math.floor(r.height/2)))
    }

    const handleMouseLeave = (e) => {
        slide.current.style.setProperty('--x', 0)
        slide.current.style.setProperty('--y', 0)
    }

    const handleImageLoad = (e) => {
        e.target.style.opacity = 1
    }

    return (
        <li
            ref={slide}
            className={classNames}
            onClick={() => {
                handleSlideClick(index)
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseMove}
        >
            <div className='slide__image-wrapper'>
                <img
                    className='slide__image'
                    alt={headline}
                    src={src}
                    onLoad={handleImageLoad}
                />
            </div>
            <article className='slide__content'>
                <h2 className='slide__headline'>{headline}</h2>
                <button className='slide__action btn'>{button}</button>
            </article>
        </li>
    )
}

function SliderControl({ type, title, handleClick }) {
    return (
        <button title={title} className={`btn btn--${type}`} onClick={handleClick}>
            <svg className="icon" viewBox="0 0 24 24">
                <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" />
            </svg>
        </button>
    )
}

function Slider ({ slides, heading }) {
    const [ current, setCurrent ] = useState(0)
    const headingId = `slider-heading__${heading.replace(/\s+/g, '-').toLowerCase()}`
    const wrapperTransform = {
        'transform': `translateX(-${current * (100 / slides.length)}%)`
    }

    const handlePreviousClick = () => {
        const previous = current - 1
        setCurrent(previous < 0 ? slides.length - 1 : previous)
    }

    const handleNextClick = () => {
        const next = current + 1
        setCurrent(next === slides.length ? 0 : next)
    }


    const handleSlideClick = (index) => {
        if (current !== index) {
            setCurrent(index)
        }
    }

    return (
        <div className='slider' aria-labelledby={headingId}>
            <ul className='slider__wrapper' style={wrapperTransform}>
                <h3 id={headingId} className='visuallyhidden'>{heading}</h3>
                {slides.map(slide => {
                    return (
                        <Slide
                            key={slide.index}
                            slideProp={slide}
                            current={current}
                            handleSlideClick={handleSlideClick}
                        />
                    )
                })}
            </ul>

            <div className='slider__controls'>
                <SliderControl
                    type='previous'
                    title='Go to your previous slide'
                    handleClick={handlePreviousClick}
                />
                <SliderControl
                    type='next'
                    title='Go to your next slide'
                    handleClick={handleNextClick}
                />
            </div>
        </div>
    )
}

export const slideData = [
    {
        index: 0,
        headline: 'New Fashion Apparel',
        button: 'Shop now',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/fashion.jpg'
    },
    {
        index: 1,
        headline: 'In The Wilderness',
        button: 'Book travel',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/forest.jpg'
    },
    {
        index: 2,
        headline: 'For Your Current Mood',
        button: 'Listen',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/guitar.jpg'
    },
    {
        index: 3,
        headline: 'Focus On The Writing',
        button: 'Get Focused',
        src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/225363/typewriter.jpg'
    }
]

export default Slider;