import initMK from '../../_core/init';
import reportModified from '../_reportmodified';

const arrayPrototype = Array.prototype;

export default function createRemovingMethod(name, hasOptions) {
    return function pseudoNativeMethod(givenEventOptions) {
        if (!this.length) {
            return;
        }
        initMK(this);

        const returns = arrayPrototype[name].call(this);
        const eventOptions = {
            method: name,
            self: this,
            added: [],
            removed: [returns]
        };

        if(hasOptions) {
            if(givenEventOptions && typeof givenEventOptions === 'object') {
                nofn.assign(eventOptions, givenEventOptions);
            }
        }

        reportModified(this, eventOptions, name);

        return returns;
    };
}