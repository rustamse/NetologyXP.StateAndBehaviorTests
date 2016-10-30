import assert from 'assert'
import sinon from 'sinon'
import {Bomb} from '../src/bomb'
import {Player} from '../src/player'
import {Match, Game} from '../src/match'

suite('Counter Strike Match tests', function () {

    suite('to win game command should win 2 rounds', function () {
        suite('when terrorist win 2 rounds', function () {
            test('terrorists win game', function () {
                let game = new Game();
                let gameMock = sinon.mock(game);
                gameMock.expects('notifyAboutTerroristWinGame')
                    .once();

                let match = new Match(game);
                match.notifyAboutTerroristWin();
                match.notifyAboutTerroristWin();

                gameMock.verify();
            });
        });

        suite('when terrorist win first rounds, after c-terrorists win 2 next rounds', function () {
            test('counter-terrorists win game', function () {
                let game = new Game();
                let gameMock = sinon.mock(game);
                gameMock.expects('notifyAboutCounterTerroristWinGame')
                    .once();

                let match = new Match(game);
                match.notifyAboutTerroristWin();
                match.notifyAboutCounterTerroristWin();
                match.notifyAboutCounterTerroristWin();

                gameMock.verify();
            });
        });
    });

});