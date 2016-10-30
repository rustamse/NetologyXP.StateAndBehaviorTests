import assert from 'assert'
import sinon from 'sinon'
import {Bomb} from '../src/bomb'
import {Player} from '../src/player'

suite('Counter Strike Player tests', function () {

    suite('when player plantBomb', function () {
        suite('when Terrorist plant bomb', function () {
            test('bomb is planting', function () {
                let bomb = new Bomb();
                let bombMock = sinon.mock(bomb);
                bombMock.expects('plant')
                    .once();

                let player = new Player('terrorist', bomb);

                player.plantBomb();

                bombMock.verify();
            });
        });

        suite('when Counter-Terrorist plant bomb', function () {
            test('bomb is NOT planting', function () {
                let bomb = new Bomb();
                let bombMock = sinon.mock(bomb);
                bombMock.expects('plant')
                    .never();

                let player = new Player('counter-terrorist', bomb);

                try {
                    player.plantBomb();
                }
                catch(ex){
                }

                bombMock.verify();
            });
        });
    });
});