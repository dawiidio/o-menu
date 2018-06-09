import { POSITION_MODES } from '../config/defaults';

const SCROLL_BAR_SIZE = 15;

export const positioningFunctions = {
    [POSITION_MODES.relative] : ({ targetElement, menuInstance, ev }) => {
        targetElement.style.position = 'relative';

        // start positioning menu block
        const {
            x: bcrX,
            y: bcrY,
            width: targetElementWidth,
            height: targetElementHeight,
        } = targetElement.getBoundingClientRect();

        // because values from getBoundingClientRect are relative to viewport position, they are dependent on scroll
        const targetElementX = bcrX + window.scrollX;
        const targetElementY = bcrY + window.scrollY;

        let positionX = (ev.pageX)-menuInstance.radiusWithPadding-targetElementX;
        let positionY = (ev.pageY)-menuInstance.radiusWithPadding-targetElementY;

        if (positionX < targetElementX)
            positionX = 0;
        else if ((positionX + menuInstance.size) > (targetElementWidth))
            positionX = (targetElementWidth) - menuInstance.size - SCROLL_BAR_SIZE;

        if (positionY < targetElementY)
            positionY = 0;
        else if ((positionY + menuInstance.size) > (targetElementHeight))
            positionY = (targetElementHeight) - menuInstance.size;

        menuInstance.svg.style({
            transform: `translate3d(${positionX}px, ${positionY}px, 0)`,
            position: 'absolute',
            top: 0,
            left: 0,
        });
    },

    [POSITION_MODES.fixed] : ({ targetElement, menuInstance, ev }) => {
        let positionX = ev.x-menuInstance.radiusWithPadding;
        let positionY = ev.y-menuInstance.radiusWithPadding;

        const size = menuInstance.size;

        if(positionX < 0)
            positionX = 0;
        else if(positionX + size > window.innerWidth)
            positionX = window.innerWidth - size - SCROLL_BAR_SIZE;

        if(positionY < 0)
            positionY = 0;
        else if(positionY + size > window.innerHeight)
            positionY = window.innerHeight - size;

        menuInstance.svg.style({
            position: 'fixed',
            transform: `translate3d(${positionX}px, ${positionY}px, 0)`
        });
    }
}
