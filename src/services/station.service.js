const db = require("../../models/index");

const createStation = async (name, address, province) => {
  try {
    if (!name || !address || !province) {
      return {
        EM: "Invalid input field",
        DT: [],
      };
    }
    await db.Station.create({
      name,
      address,
      province,
    });
    return {
      EM: "Create Station successfully",
      DT: [],
    };
  } catch (error) {
    return {
      EM: "Something wrong in server",
      DT: [],
    };
  }
};

const getAllStation = async () => {
  try {
    const data = await db.Station.findAll();
    return {
      EM: "Get all Station successfully",
      DT: data,
    };
  } catch (error) {
    return {
      EM: "Something wrong in server",
      DT: [],
    };
  }
};

const updateStation = async (id, name, address, province) => {
  try {
    const station = await db.Station.findOne({
      where: { id: id },
    });
    if (station) {
      if (!name || !address || !province) {
        return {
          EM: "Invalid input field",
          DT: [],
        };
      }
      await station.update({
        name,
        address,
        province,
      });

      return {
        EM: "Update station successfully",
        DT: station,
      };
    }
    return {
      EM: "Station not found",
      DT: [],
    };
  } catch (error) {
    return {
      EM: "Something wrong in server",
      DT: [],
    };
  }
};

const deleteStation = async (id) => {
  try {
    const station = await db.Station.findOne({
      where: { id: id },
    });
    if (station) {
      await station.destroy();
      return {
        EM: "Delete Station successfully",
        DT: [],
      };
    }
    return {
      EM: "Station not found",
      DT: [],
    };
  } catch (error) {
    return {
      EM: "Something wrong in server",
      DT: [],
    };
  }
};

module.exports = { createStation, getAllStation, updateStation, deleteStation };
