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

    get roubles() {
        return this._roubles;
    }

    get bonusPoints() {
        return this._bonusPoints;
    }
}
