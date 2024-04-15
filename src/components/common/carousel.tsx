import React from "react";
import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from './carouseldots'
import type { EmblaOptionsType } from 'node_modules/embla-carousel/components/Options'

export function Carousel(props: { images: ImageMetadata[] }) {
    const options: Partial<EmblaOptionsType> = {
        dragThreshold: 5,
    }
    const [emblaRef, emblaApi] = useEmblaCarousel(options);

    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi)

    return (
        <section className="embla">
            <div className="embla__viewport" ref={emblaRef}>
                <div className="embla__container">
                    {props.images.map((i, index) => (
                        <div className="embla__slide">
                            <img {...i} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="embla__controls">
                <div className="embla__dots">
                    {scrollSnaps.map((_, index) => (
                        <DotButton
                            key={index}
                            onClick={() => onDotButtonClick(index)}
                            className={'embla__dot'.concat(
                                index === selectedIndex ? ' embla__dot--selected' : ''
                            )}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}
