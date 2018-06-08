import { SLICE_EVENTS, INTERNAL_EXTERNAL_EVENTS_MAPPING } from '../config/defaults';
import { ISlice } from "../interfaces/ISlice";
import { IEvent } from '../interfaces/IEvent';

export class OMenuSliceEvent extends IEvent {
    constructor({ type, originalEvent, target }){
        super();

        if (!(target instanceof ISlice))
            throw new Error('Target must be an instance of Slice or NthLevelSlice');

        if (!Object.values(SLICE_EVENTS).includes(type))
            throw new Error('Event type must be one of defined in SLICE_EVENTS const');

        this.originalEvent = originalEvent;
        this.type = type;
        this.data = target.options.data;
        this.target = target;
    }
}

export class OMenuExternalEvent extends IEvent {
    constructor(event, propsToChange) {
        super();

        if(event instanceof IEvent && propsToChange) {
            Object.assign(this, {
                ...event,
                ...propsToChange,
                originalEvent: event
            });

            return this;
        }

        const {type, originalEvent = null, target} = event;

        this.type = type;
        this.originalEvent = originalEvent;
        this.hasNestedSlices = false;
        this.isSlice = false;

        if (target) {
            this.data = target.options.data;
            this.target = target;
            this.type = INTERNAL_EXTERNAL_EVENTS_MAPPING[type] || type;

            if (target instanceof ISlice) {
                this.isSlice = true;
                this.hasNestedSlices = target.slices && target.slices.length;
            }
        }
    }
}
