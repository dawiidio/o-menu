import CircleMenu from './Menu';
import Slice from './Slice';

export class MenuAnimation extends CircleMenu{
    show(){
        this.svg.removeClass('hidden-animation-end');

        this.innerCircle.animate(100).scale(1, this.radiusWithPadding, this.radiusWithPadding).after(() => {
            this.slices.forEach(slice => {
                slice.show();
            });
        });
    }
    
    hide(){
        const promisesArr = this.slices.map(slice => slice.hide());

        Promise.all(promisesArr).then(() => {
            this.innerCircle.animate(100).scale(0.01, this.radiusWithPadding, this.radiusWithPadding).after(() =>{
                this.svg.addClass('hidden-animation-end');
            });
        });
    }
}

export class SliceAnimation extends Slice{
    show(){
        return new Promise((resolve) => {
            this.group.animate(100).scale(1, this.data.radiusWithPadding, this.data.radiusWithPadding).after(() => {
                this.group
                    .animate(100)
                    .rotate(this.data.circleDegOrigin, this.data.radiusWithPadding, this.data.radiusWithPadding)
                    .after(resolve);
            })
        });
    }
    
    hide(){
        const rotateStepDeg = -((this.number * this.data.degForStep)+(this.data.degForStep/2))+this.data.circleDegOrigin;

        return new Promise((resolve) => {
            this.group.animate(100).rotate(rotateStepDeg, this.data.radiusWithPadding, this.data.radiusWithPadding).after(() =>{
                this.group
                    .animate(100)
                    .scale(0.01, this.data.radiusWithPadding, this.data.radiusWithPadding)
                    .after(resolve)
            })
        });
    }
}
