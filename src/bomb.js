'use strict';

export class Bomb {
    constructor(match) {
        this._match = match;
        this._plantCount = 0;
    }

    plant() {
        if(this._plantCount == 1) {
            this._match.notifyAboutTryPlantBombInSecondTime();
            throw new Error('Can not plant bomb in second time per round');
        }

        this._plantCount++;
    }

    detonate() {
        this._match.notifyAboutTerroristWin();
    }

    defuse() {
        this._match.notifyAboutCounterTerroristWin();
    }
}