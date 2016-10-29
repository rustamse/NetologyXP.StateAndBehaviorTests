'use strict';

export class PizzaOrder {
    constructor() {

    };

    canOrder(client, orderMethod) {
        if (orderMethod == 'web')
            return true;
        return false;
    }

    order(items) {
        return 0;
    }

}
