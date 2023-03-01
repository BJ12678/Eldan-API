"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get('/', async() => {
  return { status: 'Successfully deploy adonis eldan-v3 server'}
});

Route.group(() => {

  // user register and login
  Route.post("auth/register", "UserController.register");
  Route.post("auth/login", "UserController.login");
  // customers
  Route.get("customers", "CustomerController.index").middleware("auth");
  Route.post("customers", "CustomerController.create").middleware("auth");
  Route.put("customers/:id", "CustomerController.update").middleware("auth");
  Route.delete("customers/:id", "CustomerController.destroy").middleware(
    "auth"
  );
  // maintenance
  Route.get("maintenance", "MaintenanceController.index").middleware("auth");
  Route.post("maintenance", "MaintenanceController.create").middleware("auth");
  Route.put("maintenance/:id", "MaintenanceController.update").middleware(
    "auth"
  );
  Route.delete("maintenance/:id", "MaintenanceController.destroy").middleware(
    "auth"
  );
  // sales
  Route.get("sales", "SaleController.index").middleware("auth");
  Route.post("sales", "SaleController.create").middleware("auth");
  Route.put("sales/:id", "SaleController.update").middleware("auth");
  Route.delete("sales/:id", "SaleController.destroy").middleware("auth");
}).prefix("api");
