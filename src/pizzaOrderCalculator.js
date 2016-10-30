'use strict';

export class PizzaOrderCalculator {
    constructor() {

    };

    formOrder(client, orderInfo) {

        let order = {
            items: [],
            totalPrice: 0,
            bonusPoints: 0,
            payMethod: '',
            orderMethod: ''
        };

        for (let i = 0; i < orderInfo.items.length; i++) {
            let item = orderInfo.items[i];
            order.items.push(item.name);
            order.totalPrice += item.price;
        }

        if (client.isBirthday)
            order.items.push('sweet pizza');

        if (client.promocode == 'ABCD')
            order.totalPrice -= 100;

        if (orderInfo.items.length == 2 && orderInfo.time > 10 && orderInfo.time < 16)
            order.totalPrice *= 0.8;

        order.bonusPoints = order.totalPrice * 0.05;

        this._checkOrderMethod(orderInfo);
        order.orderMethod = orderInfo.orderMethod;

        this._checkPayMethodAndMoney(orderInfo, client);

        order.payMethod = orderInfo.payMethod;

        return order;
    }

    _checkPayMethodAndMoney(orderInfo, client) {
        if (orderInfo.payMethod == "roubles") {
            if (client.roubles < orderInfo.totalPrice)
                throw new Error('Not enough roubles');
        }
        else if (orderInfo.payMethod == "bonusPoints") {
            if (client.bonusPoints < orderInfo.totalPrice)
                throw new Error('Not enough bonusPoints');
        }
        else {
            throw new Error('payMethod not supported: ' + orderInfo.payMethod);
        }
    }

    _checkOrderMethod(orderInfo) {
        if (orderInfo.orderMethod != "web") {
            throw new Error('Order method not supported: ' + orderInfo.orderMethod);
        }
    };

    payOrder(client, order) {
        let paySuccesful = client.tryPay(order.totalPrice, order.payMethod);

        let payment = {
            paymentSuccessful: paySuccesful
        };

        return payment;
    };
}
