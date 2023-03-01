'use strict'
const Customer = use('App/Models/Customer')
const AuthorizationService = use('App/Services/AuthorizationService');

class CustomerController {
    async index({auth}) {
        const user = await auth.getUser(); //get the authenticated user
        return await user.customers().fetch() //fetch & return all user's customers
    }

    async create({auth, request}) {
        const user = await auth.getUser(); // get the authenticated user
        const { name, area, seller, contact, remarks } = request.all();     // grab all from request body
        const customer = new Customer();
        customer.fill({
            name,
            area,
            seller,
            contact,
            remarks,
        });                                // create new instance of customer
        await user.customers().save(customer);// save new customer of user
        return customer;
    }

    async update({auth, request, params}) {
        const user = await auth.getUser();// get authenticated user
        const {id} = params;              // grab the customer's id
        const customer = await Customer.find(id);// find the user's customer via id
        AuthorizationService.verifyPermission(customer, user);//verify user and checks if customer exist
        customer.merge(request.only([
            'name',
            'area',
            'seller',
            'contact',
            'remarks']
        ));                                  // update data
        await customer.save();                // save customer
        return customer;                      // return updated customer
    }

    async destroy({auth, request, params}) {
        const user = await auth.getUser();  // get authenticated user
        const {id} = params;                // grab customer's id
        const customer = await Customer.find(id);// find the customer via id
        AuthorizationService.verifyPermission(customer, user);//verify user and checks if customer exist
        await customer.delete();             // delete selected customer
        return customer;                     // return deleted customer
    }
}

module.exports = CustomerController
