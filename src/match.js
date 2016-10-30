'use strict';

export class Match {
    constructor(game) {
        this._game = game;
        this._trWins = 0;
        this._ctWins = 0;
    }

    notifyAboutTerroristWin() {
        this._trWins++;

        if (this._trWins == 2) {
            this._game.notifyAboutTerroristWinGame();
        }
    }

    notifyAboutCounterTerroristWin() {
        this._ctWins++;

        if (this._ctWins == 2) {
            this._game.notifyAboutCounterTerroristWinGame();
        }
    }

    notifyAboutTryPlantBombInSecondTime() {

    }
}

export class Game {
    constructor() {
    }

    notifyAboutTerroristWinGame() {

    }

    notifyAboutCounterTerroristWinGame() {

    }
}