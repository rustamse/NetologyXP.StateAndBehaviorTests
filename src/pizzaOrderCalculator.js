'use strict';

export class PizzaOrderCalculator {
    constructor() {

    };

    canOrder(client, orderMethod) {
        if (orderMethod == 'web')
            return true;
        return false;
    }

    order(client, orderInfo) {

        let outcome = {
            items: [],
            totalPrice: 0,
            bonusPoints: 0,
            payMethod: ''
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

        if (orderInfo.payMethod == "roubles") {

        }
        else if (orderInfo.payMethod == "bonusPoints") {

        }
        else {
            throw new Error('payMethod not supported: ' + orderInfo.payMethod);
        }

        outcome.payMethod = orderInfo.payMethod;

        return outcome;
    }
}
