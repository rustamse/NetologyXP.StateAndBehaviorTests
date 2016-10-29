import assert from 'assert'
import sinon from 'sinon'
import {Client} from '../src/client'
import {PizzaOrderCalculator} from '../src/pizzaOrderCalculator'

suite('pizza tests', function () {

    suite('pizza can be ordering', function () {
        var clientStub = {};

        test('client can order by web', function () {
            var pizzaOrder = new PizzaOrderCalculator();

            var canOrder = pizzaOrder.canOrder(clientStub, 'web');

            assert.equal(true, canOrder);
        });

        test('client can NOT order by fax', function () {
            var pizzaOrder = new PizzaOrderCalculator();

            var canOrder = pizzaOrder.canOrder(clientStub, 'fax');

            assert.equal(false, canOrder);
        });

    });

    suite('order pizza', function () {

        suite('when client order at birthday', function () {

            var order = [{name: 'meat pizza'}];

            test('client get free sweet pizza at birthday', function () {
                var clientStub = {isBirthday: true};

                var pizzaOrder = new PizzaOrderCalculator();

                var outcome = pizzaOrder.order(clientStub, order);

                let hasFreePizza = outcome.items.indexOf('sweet pizza') != -1;
                assert.equal(true, hasFreePizza);
            });

            test('client NOT get free sweet pizza at NON-birthday', function () {
                var clientStub = {isBirthday: false};

                var pizzaOrder = new PizzaOrderCalculator();

                var outcome = pizzaOrder.order(clientStub, order);

                let hasFreePizza = outcome.items.indexOf('sweet pizza') != -1;
                assert.equal(false, hasFreePizza);
            });
        });

    });

});