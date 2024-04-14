import useEmblaCarousel from 'embla-carousel-react'
import { DotButton, useDotButton } from './carouseldots'

export function Carousel(props: { children: React.ReactNode }) {
    const [emblaRef, emblaApi] = useEmblaCarousel()
    const { selectedIndex, scrollSnaps, onDotButtonClick } =
        useDotButton(emblaApi)

    return (
        <section>
            <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                    {props.children}
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
