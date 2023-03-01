'use strict'
const Sale = use('App/Models/Sale')
const AuthorizationService = use('App/Services/AuthorizationService');

class SaleController {
    async index({auth}) {
        const user = await auth.getUser(); //get the authenticated user
        return await user.sales().fetch() //fetch & return all user's sale
    }

    async create({auth, request}) {
        const user = await auth.getUser(); // get the authenticated user
        const { date, customer, seller, item, payments, remarks } = request.all();     // grab all from request body
        const sale = new Sale();
        sale.fill({
            date,
            customer,
            seller,
            item,
            payments,
            remarks,
        });                                // create new instance of sale
        await user.sales().save(sale);// save new sale of user
        return sale;
    }

    async update({auth, request, params}) {
        const user = await auth.getUser();// get authenticated user
        const {id} = params;              // grab the sale's id
        const sale = await Sale.find(id);// find the user's sale via id
        AuthorizationService.verifyPermission(sale, user);//verify user and checks if sale exist
        sale.merge(request.only([
            'date',
            'customer',
            'seller',
            'item',
            'payments',
            'remarks',
        ]));                                  // update data
        await sale.save();                // save sale
        return sale;                      // return updated sale
    }

    async destroy({auth, request, params}) {
        const user = await auth.getUser();  // get authenticated user
        const {id} = params;                // grab sale's id
        const sale = await Sale.find(id);// find the sale via id
        AuthorizationService.verifyPermission(sale, user);//verify user and checks if sale exist
        await sale.delete();             // delete selected sale
        return sale;                     // return deleted sale
    }
}

module.exports = SaleController
