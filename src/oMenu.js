import CircleMenu from './elements/OMenu';
import FirstLevelSlice from './elements/FirstLevelSlice';
import NthLevelSlice from './elements/NthLevelSlice';
import {
    dumpExtend,
    recursivelyForEachSlices,
} from './helpers/utils';
import {
    SLICE_EVENTS,
    OPTIONS_DEFAULTS,
    EXTERNAL_API_EVENTS
} from './config/defaults';
import { IEvent } from "./interfaces/IEvent";
import { OMenuEventEmitter } from "./helpers/OMenuEventEmitter";
import { OMenuExternalEvent } from "./helpers/oMenuEvents";
import { positioningFunctions } from './helpers/positioningFunctions';

/**
 * Simple factory function for Menu
 *
 * @param selector {string}
 * @param instanceOptions {Object}
 * @param defaultOptions {Object}
 * @returns {Menu}
 */
const createInstance = (selector, defaultOptions, instanceOptions) => {
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
 * @param selector {string} dom element id
 * @param userOptions {object} oMenu options
 * @returns {{isOpen: *, on((Array<string>|string)=, Function): void, off(string, Function): boolean, triggerEvent(IEvent): void}}
 */
const externalApi = (selector, userOptions) => {
    const targetElement = document.getElementById(selector);
    let isOpen = false;
    let pendingAnimation = false;

    if(!targetElement)
        throw new Error(`oMenu can't find element with id ${selector}`);

    const defaultInstanceOptions = dumpExtend({}, OPTIONS_DEFAULTS, userOptions);

    let menuInstance = null;

    const api = new class extends OMenuEventEmitter {
        get isOpen(){
            return isOpen;
        }
    };

    /**
     * Default click listener, manages menu and slices state after click event
     *
     * @param ev
     * @returns {*}
     */
    const embedOnClick = ev => {
        if (ev.isSlice) {
            if(!ev.hasNestedSlices)
                return close(ev);

            if (ev.target.isSlicesOpen) {
                ev.target.slices.forEach(s => s.hide());
                ev.target.isSlicesOpen = false;
            }
            else {
                ev.target.slices.forEach(s => s.show());
                ev.target.isSlicesOpen = true;
            }
        }
    };

    /**
     *
     * @param ev {IEvent|Event}
     * @returns {*}
     */
    const close = ev => {
        const sendEvent = type => {
            const event = ev instanceof IEvent
                ? new OMenuExternalEvent(ev, { type })
                : new OMenuExternalEvent({
                    type,
                    target: null,
                    originalEvent: ev
                });

            api.triggerEvent(event);
        };

        if(!isOpen || pendingAnimation)
            return Promise.reject();

        if(defaultInstanceOptions.menu.closeMenuOn)
            document.removeEventListener(defaultInstanceOptions.menu.closeMenuOn, close);

        pendingAnimation = true;

        sendEvent(EXTERNAL_API_EVENTS.closeMenu);

        return menuInstance
            .hide()
            .then(() => {
                sendEvent(EXTERNAL_API_EVENTS.hideAnimationEnd);

                menuInstance.destroy();

                isOpen = false;
                pendingAnimation = false;
            });
    };

    /**
     *
     * @param ev {Event} event which triggers open menu, for positioning purposes
     * @param dynamicOptions {object} dynamic options which will be merged
     * with default, passed during externalApi fn call
     * @returns {*}
     */
    const open = (ev, dynamicOptions) => {
        api.triggerEvent(new OMenuExternalEvent({
            type: EXTERNAL_API_EVENTS.openMenu,
            target: null,
            originalEvent: ev
        }));

        if(pendingAnimation)
            return Promise.reject();

        if(isOpen)
            return close().then(() => open(ev, dynamicOptions));

        pendingAnimation = true;

        const instanceOptions = dumpExtend({}, defaultInstanceOptions, dynamicOptions);

        menuInstance = createInstance(selector, defaultInstanceOptions, instanceOptions);

        menuInstance.draw();

        // start positioning menu block
        if(!positioningFunctions[instanceOptions.menu.positioningMode])
            throw new Error(`No positioning function for mode ${instanceOptions.menu.positioningMode}`);

        positioningFunctions[instanceOptions.menu.positioningMode]({
            menuInstance,
            targetElement,
            ev,
        });

        if(defaultInstanceOptions.menu.closeMenuOn)
            document.addEventListener(defaultInstanceOptions.menu.closeMenuOn, close);

        /**
         * mapping internal events to external
         */
        recursivelyForEachSlices(menuInstance.slices,
                slice => slice.on(Object.values(SLICE_EVENTS),
                        ev => api.triggerEvent(new OMenuExternalEvent(ev))));

        isOpen = true;

        return menuInstance.show().then(() => {
            pendingAnimation = false;

            api.triggerEvent(new OMenuExternalEvent({
                type: EXTERNAL_API_EVENTS.showAnimationEnd,
                target: null,
                originalEvent: ev
            }));
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

    api.trigger = trigger;
    api.open = open;
    api.close = close;

    api.on(EXTERNAL_API_EVENTS.sliceClick, embedOnClick);

    return api;
};

export default externalApi;
