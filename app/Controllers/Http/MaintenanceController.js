'use strict'
const Maintenance = use('App/Models/Maintenance')
const AuthorizationService = use('App/Services/AuthorizationService');

class MaintenanceController {
    async index({auth}) {
        const user = await auth.getUser(); //get the authenticated user
        return await user.maintenances().fetch() //fetch & return all user's maintenance
    }

    async create({auth, request}) {
        const user = await auth.getUser(); // get the authenticated user
        const { date, employee, item, amount, remarks } = request.all();     // grab all from request body
        const maintenance = new Maintenance();
        maintenance.fill({
            date,
            employee,
            remarks,
            amount,
        });                                // create new instance of maintenance
        await user.maintenances().save(maintenance);// save new maintenance of user
        return maintenance;
    }

    async update({auth, request, params}) {
        const user = await auth.getUser();// get authenticated user
        const {id} = params;              // grab the maintenance's id
        const maintenance = await Maintenance.find(id);// find the user's maintenance via id
        AuthorizationService.verifyPermission(maintenance, user);//verify user and checks if maintenance exist
        maintenance.merge(request.only([
            'date',
            'employee',
            'remarks',
            'amount',
        ]));                                  // update data
        await maintenance.save();                // save maintenance
        return maintenance;                      // return updated maintenance
    }

    async destroy({auth, request, params}) {
        const user = await auth.getUser();  // get authenticated user
        const {id} = params;                // grab maintenance's id
        const maintenance = await Maintenance.find(id);// find the maintenance via id
        AuthorizationService.verifyPermission(maintenance, user);//verify user and checks if maintenance exist
        await maintenance.delete();             // delete selected maintenance
        return maintenance;                     // return deleted maintenance
    }
}

module.exports = MaintenanceController
