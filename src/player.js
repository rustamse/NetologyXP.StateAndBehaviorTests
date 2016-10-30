'use strict';

export class Player {
    constructor(playerType, bomb) {
        this._playerType = playerType;
        this._bomb = bomb;
    }

    plantBomb() {
        this._bomb.plant();
    }
}