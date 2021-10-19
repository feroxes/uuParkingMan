"use strict";
const ParkingmanObjectDao = require("./parkingman-object-dao.js");

class ReservationMongo extends ParkingmanObjectDao {
  async createSchema() {
    await super.createIndex({ awid: 1, parkingPlaceId: 1 });
    await super.createIndex({ awid: 1, userId: 1 });
    await super.createIndex({ awid: 1, dayFrom: 1 });
    await super.createIndex({ awid: 1, dayTo: 1 });
  }

  async listByParkingPlaceId(awid, parkingPlaceId, pageInfo = {}) {
    return super.find({ awid, parkingPlaceId }, pageInfo);
  }

  async listByCriteria(awid, filterMap, pageInfo = {}) {
    const filter = { ...filterMap };
    if (filterMap.dayFrom) filter.dayFrom = { $lte: filterMap.dayFrom };
    if (filterMap.dayTo) filter.dayTo = { $gte: filterMap.dayTo };
    return super.find({ awid, ...filter }, pageInfo);
  }

  async listByOverlappingDates(awid, filterMap, pageInfo = {}) {
    const filter = { ...filterMap };
    if (filterMap.dayFrom) filter.dayFrom = { $lte: filterMap.dayFrom };
    if (filterMap.dayTo) filter.dayTo = { $gte: filterMap.dayTo };
    return super.find({ awid, ...filter }, pageInfo);
  }
}

module.exports = ReservationMongo;
