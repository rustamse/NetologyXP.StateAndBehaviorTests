'use strict';

export class PizzaOrderCalculator {
    constructor() {

    };

    canOrder(client, orderMethod) {
        if (orderMethod == 'web')
            return true;
        return false;
    }

    order(client, orderItems) {

        let outcome = {items: [], totalPrice: 0};
        for (let i = 0; i < orderItems.length; i++) {
            let item = orderItems[i];
            outcome.items.push(item.name);
            outcome.totalPrice += item.price;
        }

        if (client.isBirthday)
            outcome.items.push('sweet pizza');

        if (client.promocode == 'ABCD')
            outcome.totalPrice -= 100;

        return outcome;
    }
}
