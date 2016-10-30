import assert from 'assert'
import sinon from 'sinon'
import {Bomb} from '../src/bomb'
import {Player} from '../src/player'
import {Match} from '../src/match'

suite('Counter Strike Bomb tests', function () {

    suite('when bomb NOT defused', function () {
        suite('when bomb is detonated', function () {
            test('terrorists win', function () {

                let match = new Match();
                let matchMock = sinon.mock(match);
                matchMock.expects('notifyAboutTerroristWin')
                    .once();

                let bomb = new Bomb(match);

                bomb.detonate();

                matchMock.verify();
            });
        });
    });

    suite('when bomb is defused', function () {
        test('counter-terrorists win', function () {

            let match = new Match();
            let matchMock = sinon.mock(match);
            matchMock.expects('notifyAboutCounterTerroristWin')
                .once();

            let bomb = new Bomb(match);

            bomb.defuse();

            matchMock.verify();
        });
    });

    suite('when try plant bomb in second time', function () {
        test('match get notification about try plant in second time', function () {

            let match = new Match();
            let matchMock = sinon.mock(match);
            matchMock.expects('notifyAboutTryPlantBombInSecondTime')
                .once();

            let bomb = new Bomb(match);
            bomb.plant();

            try {
                // planting in second time.
                bomb.plant();
            }
            catch (ex) {
            }

            matchMock.verify();
        });
    });

});