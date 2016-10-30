'use strict';

export class PizzaOrderCalculator {
    constructor() {

    };

    order(client, orderInfo) {

        let outcome = {
            items: [],
            totalPrice: 0,
            bonusPoints: 0,
            payMethod: '',
            orderMethod: ''
        };

        for (let i = 0; i < orderInfo.items.length; i++) {
            let item = orderInfo.items[i];
            outcome.items.push(item.name);
            outcome.totalPrice += item.price;
        }

        if (client.isBirthday)
            outcome.items.push('sweet pizza');

        if (client.promocode == 'ABCD')
            outcome.totalPrice -= 100;

        if (orderInfo.items.length == 2 && orderInfo.time > 10 && orderInfo.time < 16)
            outcome.totalPrice *= 0.8;

        outcome.bonusPoints = outcome.totalPrice * 0.05;

        this._checkOrderMethod(orderInfo);
        outcome.orderMethod = orderInfo.orderMethod;

        this._checkPayMethodAndMoney(orderInfo, client);

        outcome.payMethod = orderInfo.payMethod;

        return outcome;
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
    }
}
