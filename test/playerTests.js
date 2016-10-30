import assert from 'assert'
import sinon from 'sinon'
import {Bomb} from '../src/bomb'
import {Player} from '../src/player'

suite('Counter Strike Player tests', function () {

    suite('when player plantBomb', function () {
        suite('when Terrorist plant bomb', function () {
            test('bomb is planting', function () {
                var bomb = new Bomb();
                var bombMock = sinon.mock(bomb);
                bombMock.expects('plant')
                    .once();

                var player = new Player('terrorist', bomb);

                player.plantBomb();

                bombMock.verify();
            });
        });
    });
});