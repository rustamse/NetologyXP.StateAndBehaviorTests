import assert from 'assert'
import sinon from 'sinon'
import {Client} from '../src/client'
import {PizzaOrderCalculator} from '../src/pizzaOrderCalculator'

suite('PizzaOrderCalculator tests', function () {

    suite('formOrder method', function () {

        suite('check orderMethod', function () {
            var clientStub = {
                isBirthday: false
            };

            suite('when formOrder by web', function () {
                test('order success created by web', function () {
                    var expectOrderMethod = 'web';
                    var orderInfo = {
                        items: [{name: 'meat pizza', price: 500}],
                        payMethod: 'roubles',
                        orderMethod: expectOrderMethod
                    };

                    var pizzaOrder = new PizzaOrderCalculator();

                    var order = pizzaOrder.formOrder(clientStub, orderInfo);

                    assert.equal(expectOrderMethod, order.orderMethod);
                });
            });

            suite('when formOrder by fax', function () {
                test('order NOT created by fax', function () {
                    var expectOrderMethod = 'fax';
                    var orderInfo = {
                        items: [{name: 'meat pizza', price: 500}],
                        payMethod: 'roubles',
                        orderMethod: expectOrderMethod
                    };

                    var pizzaOrder = new PizzaOrderCalculator();

                    assert.throws(() => pizzaOrder.formOrder(clientStub, orderInfo), /Order method not supported/);
                });
            });
        });

        suite('check client birthday', function () {
            var orderInfo = {
                items: [{name: 'meat pizza', price: 500}],
                payMethod: 'roubles',
                orderMethod: 'web'
            };

            suite('when formOrder at client birthday', function () {
                test('order contains free sweet pizza', function () {
                    var clientStub = {
                        isBirthday: true
                    };

                    var pizzaOrder = new PizzaOrderCalculator();

                    var order = pizzaOrder.formOrder(clientStub, orderInfo);

                    let hasFreePizza = order.items.indexOf('sweet pizza') != -1;
                    assert.equal(true, hasFreePizza);
                });
            });

            suite('when formOrder at NON-client birthday', function () {
                test('order NOT contains free sweet pizza', function () {
                    var clientStub = {
                        isBirthday: false
                    };

                    var pizzaOrder = new PizzaOrderCalculator();

                    var order = pizzaOrder.formOrder(clientStub, orderInfo);

                    let hasFreePizza = order.items.indexOf('sweet pizza') != -1;
                    assert.equal(false, hasFreePizza);
                });
            });
        });

        suite('when formOrder using client promocode', function () {
            var orderInfo = {
                items: [{name: 'meat pizza', price: 500}],
                payMethod: 'roubles',
                orderMethod: 'web'
            };

            suite('when client has promocode ABCD', function () {
                test('order totalPrice contains discound 100 roubles', function () {
                    var clientStub = {
                        promocode: 'ABCD'
                    };

                    var pizzaOrder = new PizzaOrderCalculator();

                    var order = pizzaOrder.formOrder(clientStub, orderInfo);

                    assert.equal(500 - 100, order.totalPrice);
                });
            });

            suite('when client has incorrect promocode', function () {
                test('order totalPrice NOT contains discound', function () {
                    var clientStub = {
                        promocode: 'AAAAA'
                    };

                    var pizzaOrder = new PizzaOrderCalculator();

                    var order = pizzaOrder.formOrder(clientStub, orderInfo);

                    assert.equal(500, order.totalPrice);
                });
            });
        });

        suite('when client formOrder 2 pizzas from 10 to 16 hours', function () {

            var clientStub = {};
            var orderHour = 13;
            var orderInfo = {
                items: [{name: 'meat pizza', price: 500}, {name: 'chicken pizza', price: 600}],
                time: orderHour,
                payMethod: 'roubles',
                orderMethod: 'web'
            };

            test('client get discount 20%', function () {

                var pizzaOrder = new PizzaOrderCalculator();

                var order = pizzaOrder.formOrder(clientStub, orderInfo);

                assert.equal((500 + 600) * 0.8, order.totalPrice);
            });
        });

        suite('when formOrder pizza order will contain bonus points', function () {

            var clientStub = {};
            var orderInfo = {
                items: [{name: 'meat pizza', price: 500}],
                payMethod: 'roubles',
                orderMethod: 'web'
            };

            test('order contains 5% of pizza cost as bonus points', function () {

                var pizzaOrder = new PizzaOrderCalculator();

                var order = pizzaOrder.formOrder(clientStub, orderInfo);

                assert.equal(500 * 0.05, order.bonusPoints);
            });
        });

        suite('when formOrder using bonusPoints', function () {

            var clientStub = {};
            var orderInfo = {
                items: [{name: 'meat pizza', price: 500}],
                payMethod: 'bonusPoints',
                orderMethod: 'web'
            };

            test('order payment method is bonusPoints', function () {

                var pizzaOrder = new PizzaOrderCalculator();

                var order = pizzaOrder.formOrder(clientStub, orderInfo);

                assert.equal('bonusPoints', order.payMethod);
            });
        });

        suite('when formOrder using roubles', function () {

            var clientStub = {};
            var orderInfo = {
                items: [{name: 'meat pizza', price: 500}],
                payMethod: 'roubles',
                orderMethod: 'web'
            };

            test('order payment method is roubles', function () {

                var pizzaOrder = new PizzaOrderCalculator();

                var order = pizzaOrder.formOrder(clientStub, orderInfo);

                assert.equal('roubles', order.payMethod);
            });
        });

        suite('when formOrder using dollars', function () {

            var clientStub = {};
            var orderInfo = {
                items: [{name: 'meat pizza', price: 500}],
                payMethod: 'dollars',
                orderMethod: 'web'
            };

            test('EXCEPTION when formOrder because payMethod not supported', function () {

                var pizzaOrder = new PizzaOrderCalculator();

                assert.throws(() => pizzaOrder.formOrder(clientStub, orderInfo), /payMethod not supported/);
            });
        });

    });

    suite('payOrder method', function () {
        let orderStub = {
            items: [{name: 'meat pizza', price: 500}],
            totalPrice: 500,
            bonusPoints: 500 * 0.05,
            payMethod: 'roubles',
            orderMethod: 'web'
        };

        suite('when client pay successful', function () {
            let clientStub = {
                tryPay: function () {
                    return true;
                }
            };

            test('payment successful', function () {
                let pizzaOrderCalculator = new PizzaOrderCalculator();

                let payment = pizzaOrderCalculator.payOrder(clientStub, orderStub);

                assert.equal(true, payment.paymentSuccessful)

            });
        });

        suite('when client pay NON-successful', function () {
            let clientStub = {
                tryPay: function () {
                    return false;
                }
            };

            test('payment NON-successful', function () {
                let pizzaOrderCalculator = new PizzaOrderCalculator();

                let payment = pizzaOrderCalculator.payOrder(clientStub, orderStub);

                assert.equal(false, payment.paymentSuccessful)

            });
        });
    });
});