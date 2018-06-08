import { IEvent } from "../interfaces/IEvent";

export class OMenuEventEmitter {
    constructor(){
        this.subscriptions = {};
    }

    /**
     *
     * @param events {array<string>|string}
     * @param callback {function}
     */
    on(events = [], callback) {
        if(!Array.isArray(events))
            events = [events];

        if (typeof callback !== 'function')
            throw new Error('oMenu callback must be a function');

        events.forEach(event => {
            if (!this.subscriptions[event])
                this.subscriptions[event] = [];

            this.subscriptions[event].push(callback);
        });
    }

    /**
     *
     * @param event {string}
     * @param callback {function}
     * @returns {boolean}
     */
    off(event, callback) {
        if(!event && !callback) {
            this.subscriptions = {};
            return true;
        }

        const idx = this.subscriptions[event].indexOf(callback);

        if(idx === -1)
            return false;

        this.subscriptions[event].splice(idx, 1);

        return true
    }

    /**
     *
     * @param event {IEvent}
     */
    triggerEvent(event) {
        if (!(event instanceof IEvent))
            throw new Error('Event must be an instance of IEvent class');

        const eventType = event.type;

        if(this.subscriptions[eventType])
            this.subscriptions[eventType].forEach(callback => callback(event));
    }
}
