"use strict";

const {URLSearchParams} = require("url");
const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();

//create User

async function userCreate(req) {
    try {
        let {name, email, balance} = JSON.parse(req.body);
        if (name && email && balance) {
            console.log(balance, "<-------------------balaanceeeee");
            const createUser = await prisma.users.create({
                data: {
                    name: name,
                    email: email,
                    balance: balance,
                },
            });
            console.log(createUser, "el usuario creadooooo");
            return {
                statusCode: 200,
                body: JSON.stringify(
                    {
                        message: "Usuario creado!",
                    },
                    null,
                    2
                ),
            };
        }
    } catch (e) {
        console.log(e, "error");
        return {
            statusCode: 400,
            body: "The information are not correct. Verify the name, email or balance",
        };
    }
}

//create Order

async function orderCreate(req, res) {
    try {
        let {users, Products, price} = JSON.parse(req.body);

        const findUser = await prisma.users.findUnique({
            where: {id_user: users},
        });
        // Search user
        if (findUser) {
            if (price > findUser.balance) {
                return {
                    statusCode: 400,
                    body: JSON.stringify(
                        {
                            message: "No funds!",
                        },
                       
                    ),
                };
            }
            // Update balance user
            const changeBalance = await prisma.users.update({
                where: {id_user: users},
                data: {
                    name: findUser.name,
                    email: findUser.email,
                    balance: findUser.balance - price,
                },
            });
        } else {
            return {
                statusCode: 500,
                message: "user not found",
            };
        }
        // Create order
        if (Products && price && users) {
            const createOrder = await prisma.orders.create({
                data: {
                    Products: Products,
                    Price: price,
                    users: {connect: {id_user: users}},
                },
            });
            return {
                statusCode: 200,
                body: JSON.stringify(
                    {
                        message: "Orden creada!",
                    },
                    null,
                    2
                ),
            };
        }
    } catch (e) {
        console.log(e, "error");
        return {
            statusCode: 400,
            body: "The information are not correct. Verify the products or total",
        };
    }

}
// get All Users with orders
async function getAllUsers(req) {
    const findAll = await prisma.users.findMany({
        include: {
            orders: true,
        },
    });
    if (findAll) {
        return {
            statusCode: 200,
            body: JSON.stringify(findAll),
        };
    } else {
        return {
            statusCode: 400,
            body: "Don´t exist users in the database",
        };
    }
}

// get all orders

async function getAllOrders(req) {
    const findAllOrders = await prisma.orders.findMany();
    if (findAllOrders) {
        return {
            statusCode: 200,
            body: JSON.stringify(findAllOrders),
        };
    } else {
        return {
            statusCode: 400,
            body: "Don´t exist orders in the database",
        };
    }
}
// pass money 
async function passMoney(req){

  try{
    let {id1,money ,id2} = JSON.parse(req.body);
    let findUserOne = await prisma.users.findUnique({
      where: {id_user: id1}
    })
    let findUserTwo = await prisma.users.findUnique({
      where:{id_user:id2}
    })
    if(findUserOne && findUserTwo){
      if(findUserOne.balance < money){
        return{
          statusCode:400,
          body:'you do not have enough money to make the transfer'
        }
      }else{
        const update1 = await prisma.users.update({
          where: {id_user: id1},
          data:{
                    name: findUserOne.name,
                    email: findUserOne.email,
                    balance: findUserOne.balance - money,
          }
        })
        const update2 = await prisma.users.update({
          where: {id_user: id2},
          data:{
                    name: findUserTwo.name,
                    email: findUserTwo.email,
                    balance: findUserTwo.balance + money,
          }
        })
        return{
          statusCode:200,
          body:'successful transfer'
        }

      }
    }
    
  }catch(e){
    console.log(e)
    return {
      statusCode: 400,
      body: "Error in the transference",
  };
  }

}

module.exports = {
    userCreate,
    orderCreate,
    getAllUsers,
    getAllOrders,
    passMoney
};
