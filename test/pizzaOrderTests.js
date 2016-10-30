import assert from 'assert'
import sinon from 'sinon'
import {Client} from '../src/client'
import {PizzaOrderCalculator} from '../src/pizzaOrderCalculator'

suite('PizzaOrderCalculator tests', function () {

    suite('order pizza', function () {

        suite('when order by web', function () {

            var clientStub = {
                isBirthday: false
            };

            test('client order by web', function () {
                var expectOrderMethod = 'web';
                var order = {
                    items: [{name: 'meat pizza', price: 500}],
                    payMethod: 'roubles',
                    orderMethod: expectOrderMethod
                };

                var pizzaOrder = new PizzaOrderCalculator();

                var outcome = pizzaOrder.order(clientStub, order);

                assert.equal(expectOrderMethod, outcome.orderMethod);
            });

            test('when client order by fax', function () {
                var expectOrderMethod = 'fax';
                var order = {
                    items: [{name: 'meat pizza', price: 500}],
                    payMethod: 'roubles',
                    orderMethod: expectOrderMethod
                };

                var pizzaOrder = new PizzaOrderCalculator();

                assert.throws(() => pizzaOrder.order(clientStub, order), /Order method not supported/);
            });
        });

        suite('when client order at birthday', function () {

            var order = {
                items: [{name: 'meat pizza', price: 500}],
                payMethod: 'roubles',
                orderMethod: 'web'
            };

            test('client get free sweet pizza at birthday', function () {
                var clientStub = {
                    isBirthday: true
                };

                var pizzaOrder = new PizzaOrderCalculator();

                var outcome = pizzaOrder.order(clientStub, order);

                let hasFreePizza = outcome.items.indexOf('sweet pizza') != -1;
                assert.equal(true, hasFreePizza);
            });

            test('client NOT get free sweet pizza at NON-birthday', function () {
                var clientStub = {
                    isBirthday: false
                };

                var pizzaOrder = new PizzaOrderCalculator();

                var outcome = pizzaOrder.order(clientStub, order);

                let hasFreePizza = outcome.items.indexOf('sweet pizza') != -1;
                assert.equal(false, hasFreePizza);
            });
        });

        suite('when client order using promocode', function () {

            var order = {
                items: [{name: 'meat pizza', price: 500}],
                payMethod: 'roubles',
                orderMethod: 'web'
            };

            test('when client has promocode ABCD he get discound 100 roubles', function () {
                var clientStub = {
                    promocode: 'ABCD'
                };

                var pizzaOrder = new PizzaOrderCalculator();

                var outcome = pizzaOrder.order(clientStub, order);

                assert.equal(500 - 100, outcome.totalPrice);
            });

            test('when client has incorrect promocode', function () {
                var clientStub = {
                    promocode: 'AAAAA'
                };

                var pizzaOrder = new PizzaOrderCalculator();

                var outcome = pizzaOrder.order(clientStub, order);

                assert.equal(500, outcome.totalPrice);
            });
        });

        suite('when client order 2 pizzas from 10 to 16 hours', function () {

            var clientStub = {};
            var orderHour = 13;
            var order = {
                items: [{name: 'meat pizza', price: 500}, {name: 'chicken pizza', price: 600}],
                time: orderHour,
                payMethod: 'roubles',
                orderMethod: 'web'
            };

            test('client get discount 20%', function () {

                var pizzaOrder = new PizzaOrderCalculator();

                var outcome = pizzaOrder.order(clientStub, order);

                assert.equal((500 + 600) * 0.8, outcome.totalPrice);
            });
        });

        suite('when order pizza client will get bonus points', function () {

            var clientStub = {};
            var order = {
                items: [{name: 'meat pizza', price: 500}],
                payMethod: 'roubles',
                orderMethod: 'web'
            };

            test('client get 5% of order as bonus points', function () {

                var pizzaOrder = new PizzaOrderCalculator();

                var outcome = pizzaOrder.order(clientStub, order);

                assert.equal(500 * 0.05, outcome.bonusPoints);
            });
        });

        suite('client can order using bonusPoints', function () {

            var clientStub = {};
            var order = {
                items: [{name: 'meat pizza', price: 500}],
                payMethod: 'bonusPoints',
                orderMethod: 'web'
            };

            test('outcome payment method is bonusPoints', function () {

                var pizzaOrder = new PizzaOrderCalculator();

                var outcome = pizzaOrder.order(clientStub, order);

                assert.equal('bonusPoints', outcome.payMethod);
            });
        });

        suite('client can order using roubles', function () {

            var clientStub = {};
            var order = {
                items: [{name: 'meat pizza', price: 500}],
                payMethod: 'roubles',
                orderMethod: 'web'
            };

            test('outcome payment method is roubles', function () {

                var pizzaOrder = new PizzaOrderCalculator();

                var outcome = pizzaOrder.order(clientStub, order);

                assert.equal('roubles', outcome.payMethod);
            });
        });

        suite('client can NOT order using dollars', function () {

            var clientStub = {};
            var order = {
                items: [{name: 'meat pizza', price: 500}],
                payMethod: 'dollars',
                orderMethod: 'web'
            };

            test('outcome payment method is roubles', function () {

                var pizzaOrder = new PizzaOrderCalculator();

                assert.throws(() => pizzaOrder.order(clientStub, order), /payMethod not supported/);
            });
        });

    });

});