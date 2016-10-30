'use strict';

export class Player {
    constructor(playerType, bomb) {
        this._playerType = playerType;
        this._bomb = bomb;
    }

    plantBomb() {
        if(this._playerType != 'terrorist') {
            throw new Error('Only terrorist can plant the bomb');
        }

        this._bomb.plant();
    }
}