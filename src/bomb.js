'use strict';

export class Bomb {
    constructor(match) {
        this._match = match;
    }

    plant() {

    }

    detonate() {
        this._match.notifyAboutTerroristWin();
    }

    defuse() {
        this._match.notifyAboutCounterTerroristWin();
    }
}