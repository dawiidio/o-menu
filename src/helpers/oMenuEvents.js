import { SLICE_EVENTS } from '../config/defaults';
import { ISlice } from "../interfaces/ISlice";
import { IEvent } from '../interfaces/IEvent';

export class OMenuSliceEvent extends IEvent {
    constructor({ type, originalEvent, target }){
        super();

        if(!(target instanceof ISlice))
            throw new Error('Target must be an instance of Slice or NthLevelSlice');

        if (!Object.values(SLICE_EVENTS).includes(type))
            throw new Error('Event type must be one of defined in SLICE_EVENTS const');

        this.originalEvent = originalEvent;
        this.type = type;
        this.data = target.options.value;
        this.target = target;
    }
}

export class OMenuExternalEvent extends IEvent {
    constructor({type, originalEvent = null, target}) {
        super();

        this.type = type;
        this.originalEvent = originalEvent;

        if(target) {
            this.data = target.options.value;
            this.target = target;

            //todo mapowac typ na z internal na external
        }
    }
}
