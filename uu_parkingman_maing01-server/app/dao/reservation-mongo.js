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

  async listByCriteria(awid, filterMap, sorterMap = [], pageInfo = { pageSize: 1000, pageIndex: 0 }) {
    const { pageIndex, pageSize } = pageInfo;
    const filter = { ...filterMap, awid };
    const sorter = { "sys.cts": -1 };

    if (sorterMap.length) {
      sorterMap.forEach((item) => {
        sorter[item.key] = item.ascending ? 1 : -1;
      });
    }

    if (filterMap.dayFrom) filter.dayFrom = { $lte: filterMap.dayFrom };
    if (filterMap.dayTo) filter.dayTo = { $gte: filterMap.dayTo };

    const reservations = await super.aggregate([
      {
        $lookup: {
          from: "user",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $lookup: {
          from: "parkingPlace",
          localField: "parkingPlaceId",
          foreignField: "_id",
          as: "parkingPlace",
        },
      },
      { $unwind: "$parkingPlace" },
      { $match: filter },
      { $sort: sorter },
      {
        $addFields: { id: "$_id" },
      },
      {
        $project: {
          _id: 0,
        },
      },
      {
        $facet: {
          itemList: [{ $skip: pageIndex * pageSize }, { $limit: pageSize }],
          info: [{ $group: { _id: null, count: { $sum: 1 } } }],
        },
      },
    ]);

    let total = 0;
    if (reservations[0] && reservations[0].info[0]) {
      total = reservations[0].info[0].count;
    }

    return {
      itemList: reservations[0].itemList,
      pageInfo: { pageIndex, pageSize, total },
    };
  }
}

module.exports = ReservationMongo;
