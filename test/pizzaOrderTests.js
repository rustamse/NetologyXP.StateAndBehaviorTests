import assert from 'assert'
import sinon from 'sinon'
import {Client} from '../src/client'
import {PizzaOrder} from '../src/pizzaOrder'

suite('pizza tests', function () {

    suite('pizza can be ordering', function () {
        var clientStub = {};

        test('client can order by web', function () {
            var pizzaOrder = new PizzaOrder();

            var canOrder = pizzaOrder.canOrder(clientStub, 'web');

            assert.equal(true, canOrder);
        });

        test('client can NOT order by fax', function () {
            var pizzaOrder = new PizzaOrder();

            var canOrder = pizzaOrder.canOrder(clientStub, 'fax');

            assert.equal(false, canOrder);
        });

    });

});