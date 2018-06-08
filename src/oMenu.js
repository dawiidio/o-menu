import CircleMenu from './elements/OMenu';
import FirstLevelSlice from './elements/FirstLevelSlice';
import NthLevelSlice from './elements/NthLevelSlice';
import {
    dumpExtend,
} from './helpers/utils';
import {
    SLICE_EVENTS,
    EXTERNAL_API_EVENTS,
    OPTIONS_DEFAULTS,
    INTERNAL_EXTERNAL_EVENTS_MAPPING
} from './config/defaults';
import { IEvent } from "./interfaces/IEvent";
import { OMenuEventEmitter } from "./helpers/OMenuEventEmitter";
import { OMenuExternalEvent } from "./helpers/oMenuEvents";

/**
 * Simple factory function for Menu
 *
 * @param selector {string}
 * @param newOptions {Object}
 * @param defaultOptions {Object}
 * @returns {Menu}
 */
const createInstance = (selector, newOptions, defaultOptions) => {
    const instanceOptions = dumpExtend({}, defaultOptions, newOptions);

    const mappedSlices = instanceOptions.slices.map( slice => ({...defaultOptions.slice, ...slice}) );
    const newMenuInstance = new CircleMenu(selector, instanceOptions.menu);

    const createSlices = (slices, parent) => {
        slices.forEach(sliceOptions => {
            const isFirstLvl = parent instanceof CircleMenu;
            const options = dumpExtend({}, (isFirstLvl
                    ? instanceOptions.slice
                    : instanceOptions.nthSlice
                ),
                sliceOptions
            );


            const slice = isFirstLvl
                ? new FirstLevelSlice(newMenuInstance.svg, options)
                : new NthLevelSlice(newMenuInstance.svg, options);

            if(options.slices.length)
                createSlices(options.slices, slice);

            parent.pushSlice( slice );
        });
    };

    createSlices(mappedSlices, newMenuInstance);

    return newMenuInstance;
};

/**
 *
 * @param selector
 * @param userOptions
 * @returns object
 */
const externalApi = (selector, userOptions) => {
    let isOpen = false;
    let pendingAnimation = false;

    const defaultInstanceOptions = dumpExtend({}, OPTIONS_DEFAULTS, userOptions);

    let menuInstance = null;

    const api = new class extends OMenuEventEmitter {
        get isOpen(){
            return isOpen;
        }
    };

    /**
     * close menu
     */
    const close = ev => {
        const valueForCallback = ev instanceof IEvent ? ev : null;

        if(!isOpen || pendingAnimation)
            return Promise.reject();

        if(defaultInstanceOptions.menu.closeMenuOn)
            document.removeEventListener(defaultInstanceOptions.menu.closeMenuOn, close);

        pendingAnimation = true;

        return menuInstance
            .hide()
            .then(() => {
                if(typeof defaultInstanceOptions.onEndCloseAnimation === 'function')
                    defaultInstanceOptions.onEndCloseAnimation(valueForCallback);

                menuInstance.destroy();

                isOpen = false;
                pendingAnimation = false;
            });
    };

    /**
     * open menu
     * @param ev
     */
    const open = (ev, manualOpenOptions) => {
        let dynamicOptions = {};

        if(pendingAnimation)
            return Promise.reject();

        if(isOpen)
            return close().then(() => open(ev, manualOpenOptions));

        pendingAnimation = true;

        if(!manualOpenOptions && typeof defaultInstanceOptions.onOpen === 'function')
            dynamicOptions = defaultInstanceOptions.onOpen(ev);
        else if(manualOpenOptions)
            dynamicOptions = manualOpenOptions;

        menuInstance = createInstance(selector, dynamicOptions, defaultInstanceOptions);

        menuInstance.draw();

        let positionX = ev.x-menuInstance.radiusWithPadding;
        let positionY = ev.y-menuInstance.radiusWithPadding;

        const size = menuInstance.size;

        if(positionX < 0)
            positionX = 0;
        else if(positionX + size > window.innerWidth)
            positionX = window.innerWidth - size - 15;

        if(positionY < 0)
            positionY = 0;
        else if(positionY + size > window.innerHeight)
            positionY = window.innerHeight - size;

        menuInstance.svg.style({ transform: `translate3d(${positionX}px, ${positionY}px, 0)` });

        if(defaultInstanceOptions.menu.closeMenuOn)
            document.addEventListener(defaultInstanceOptions.menu.closeMenuOn, close);

        menuInstance.slices.forEach(slice => {
            slice.on([SLICE_EVENTS.click, SLICE_EVENTS.hover], ev => {
                api.triggerEvent(new OMenuExternalEvent(ev));
            });
        });

        isOpen = true;

        return menuInstance.show().then(() => {
            pendingAnimation = false;
        });
    };

    /**
     * trigger menu
     *
     * @param ev {Event}
     */
    const trigger = (ev) => {
        ev.preventDefault();

        if(isOpen)
            close(ev);
        else
            open(ev);
    };

    if(defaultInstanceOptions.menu.openMenuOn)
        document.body.addEventListener(defaultInstanceOptions.menu.openMenuOn, trigger);

    api.trigger = trigger;
    api.open = open;
    api.close = close;

    return api;
};

export default externalApi;
