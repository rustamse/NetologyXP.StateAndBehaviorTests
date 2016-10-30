'use strict';

export class Client {
    constructor() {
        this._bonusPoints = 0;
        this._roubles = 0;
    }

    get isBirthday() {
        return true;
    }

    get promocode() {
        return 'ABCD';
    }

    tryPay(amount, payMethod) {
        return true;
    }
}
