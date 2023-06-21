const { sequelize } = require("../../models/index");
const db = require("../../models/index");

const createTrip = async (fromSta, toSta, startTime, price) => {
  try {
    if (!fromSta || !toSta || !price) {
      return {
        EM: "Invalid input field",
        DT: [],
      };
    }
    await db.Trip.create({
      fromStation: fromSta,
      toStation: toSta,
      startTime: startTime,
      price: price,
    });
    return {
      EM: "Create Trip successfully",
      DT: [],
    };
  } catch (error) {
    return {
      EM: "Something wrong in server",
      DT: [],
    };
  }
};

const getAllTrip = async () => {
  try {
    const trips = await db.Trip.findAll({
      attributes: ["id", "startTime", "price"],
      include: [
        {
          model: db.Station,
          as: "from",
          throught: { attributes: ["name", "address", "province"] },
        },
        {
          model: db.Station,
          as: "to",
          throught: { attributes: ["name", "address", "province"] },
        },
      ],
    });
    return {
      EM: "Get all trip successfully",
      DT: trips,
    };
  } catch (error) {
    return {
      EM: "Something wrong in server",
      DT: [],
    };
  }
};

const updateTrip = async (id, fromStation, toStation, startTime, price) => {
  try {
    const trip = await db.Trip.findOne({
      where: { id },
    });
    if (trip) {
      if (!fromStation || !toStation || !startTime || !price) {
        return {
          EM: "Invalid input field",
          DT: [],
        };
      }
      const updateTrip = await trip.update({
        fromStation,
        toStation,
        startTime,
        price,
      });
      return {
        EM: "Update Trip successfully",
        DT: updateTrip,
      };
    }
    return {
      EM: "Trip not found",
      DT: [],
    };
  } catch (error) {
    return {
      EM: "Something wrong in server",
      DT: [],
    };
  }
};

const deleteTrip = async (id) => {
  try {
    const trip = await db.Trip.findOne({
      where: { id },
    });
    if (trip) {
      await trip.destroy();
      return {
        EM: "Delete Trip successfully",
        DT: [],
      };
    }
    return {
      EM: "Trip not found",
      DT: [],
    };
  } catch (error) {
    return {
      EM: "Something wrong in server",
      DT: [],
    };
  }
};

const getAllTripWithUser = async () => {
  try {
    const [result] = await sequelize.query(`
      SELECT "Trips"."id" as "id","Users"."name" as name, "Trips"."startTime" as "startTime", "Trips".price as "price" , fromSta.name as from, toSta.name as to FROM "Users" 
      INNER JOIN "Tickets"
      ON "Users".id = "Tickets"."userId" 
      INNER JOIN "Trips" 
      ON "Trips".id = "Tickets"."tripId"
      INNER JOIN "Stations" as fromSta
      ON fromSta.id = "Trips"."fromStation"
      INNER JOIN "Stations" as toSta
      ON toSta.id = "Trips"."toStation"
    `);

    return {
      EM: "Get All trips successfully",
      DT: result,
    };
  } catch (error) {
    return {
      EM: "Something wrong in server",
      DT: [],
    };
  }
};

const getTripWithUser = async (id) => {
  try {
    const user = await db.User.findOne({ where: { id: id } });
    console.log(user);
    if (user) {
      const [result] = await sequelize.query(`
        SELECT "Trips"."id" as "id", "Trips"."startTime" as "startTime", "Trips".price as "price" , fromSta.name as from, toSta.name as to FROM "Users" 
        INNER JOIN "Tickets"
        ON "Users".id = "Tickets"."userId" 
        INNER JOIN "Trips" 
        ON "Trips".id = "Tickets"."tripId"
        INNER JOIN "Stations" as fromSta
        ON fromSta.id = "Trips"."fromStation"
        INNER JOIN "Stations" as toSta
        ON toSta.id = "Trips"."toStation"
        WHERE "Users".id = ${user.id}
      `);

      return {
        EM: "Get trips with users successfully",
        DT: result,
      };
    }
    return {
      EM: "User not found",
      DT: [],
    };
  } catch (error) {
    return {
      EM: "Something wrong in server",
      DT: [],
    };
  }
};

const getPassengerCarByTrip = async (fromSta, toSta) => {
  try {
    const [result] = await sequelize.query(`
      SELECT "PassengerCarCompanies"."name" as "nameCar", "PassengerCarCompanies"."image" as "imageCar", "PassengerCarCompanies".descrpition as "descrpition", "Trips"."price" as "price", "Trips"."startTime" as "startTime",fromSta."name" as "from", toSta."name" as "to", "Vehicles".name as "vehicleRange" FROM "PassengerCarCompanies"
      INNER JOIN "Vehicles"
      ON "Vehicles"."passegerCarId" = "PassengerCarCompanies".id
      INNER JOIN "Trips"
      ON "Trips".id = "PassengerCarCompanies"."tripId"
      INNER JOIN "Stations" as fromSta
      ON fromSta.id = "Trips"."fromStation"
      INNER JOIN "Stations" as toSta
      ON toSta.id = "Trips"."toStation"
      WHERE (fromSta.province LIKE '%${fromSta}%' AND toSta.province LIKE '%${toSta}%')
    `);
    return {
      EM: "Get passenger car by trips successfully",
      DT: result,
    };
  } catch (error) {
    return {
      EM: "Something wrong in server",
      DT: [],
    };
  }
};

module.exports = {
  createTrip,
  getAllTrip,
  updateTrip,
  deleteTrip,
  getAllTripWithUser,
  getTripWithUser,
  getPassengerCarByTrip,
};
