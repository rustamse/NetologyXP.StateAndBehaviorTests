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

        let outcome = {items: []};
        for (let i = 0; i < orderItems.length; i++) {
            outcome.items.push(orderItems[i].name);
        }

        if (client.isBirthday)
            outcome.items.push('sweet pizza');

        return outcome;
    }
}
