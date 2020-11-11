const csv = require("csv-parser");
const fs = require("fs");
const {
  filterDataForBarChartByDate,
  filterDataForStackedBarChartByDate,
  filterDataForBarChartByDay,
  filterDataForStackedBarChartByDay,
} = require("./manipulation");

const controllers = {
  getAll: async (req, res) => {
    let results = [];
    try {
      let stream = await fs.createReadStream("data_aug27.csv");
      let data = await stream.pipe(csv());
      let arr = await data.on("data", (data) => results.push(data));
      await arr.on("end", () => {
        console.log(results.length, "getAll");
        res.status(200).send(results);
      });
    } catch (error) {
      res.status(400).error(e);
    }
  },
  getDataForBarChart: async (req, res) => {
    const { id } = req.params
    let results = [];
    try {
      let stream = await fs.createReadStream("data_aug27.csv");
      let data = await stream.pipe(csv());
      let arr = await data.on("data", (data) => results.push(data));
      await arr.on("end", () => {
        console.log(results.length, "getDataForBarChart");
        if (id === 'date') {
          let obj = filterDataForBarChartByDate(results);
          let data = Object.values(obj).map((data) => data.length);
        } else if (id === 'day') {
          let obj = filterDataForBarChartByDay(results);
          let data = Object.values(obj).map((data) => data.length);
        }
        res.status(200).send(data);
      });
    } catch (error) {
      res.status(400).error(e);
    }
  },
  getDataForStackedBarChartByDate: async (req, res) => {
    let results = [];
    try {
      let stream = await fs.createReadStream("data_aug27.csv");
      let data = await stream.pipe(csv());
      let arr = await data.on("data", (data) => results.push(data));
      await arr.on("end", () => {
        console.log(results.length, "getDataForStackedBarChartByDate");
        let arr = filterDataForStackedBarChartByDate(results);
        res.status(200).send(arr);
      });
    } catch (error) {
      res.status(400).error(e);
    }
  },
  // getDataForBarChartByDay: async (req, res) => {
  //   let results = [];
  //   try {
  //     let stream = await fs.createReadStream("data_aug27.csv");
  //     let data = await stream.pipe(csv());
  //     let arr = await data.on("data", (data) => results.push(data));
  //     await arr.on("end", () => {
  //       console.log(results.length, "getDataForBarChartByDay");
  //       let obj = filterDataForBarChartByDay(results);
  //       let data = Object.values(obj).map((data) => data.length);
  //       res.status(200).send(data);
  //     });
  //   } catch (error) {
  //     res.status(400).error(e);
  //   }
  // },
  getDataForStackedBarChartByDay: async (req, res) => {
    let results = [];
    try {
      let stream = await fs.createReadStream("data_aug27.csv");
      let data = await stream.pipe(csv());
      let arr = await data.on("data", (data) => results.push(data));
      await arr.on("end", () => {
        console.log(results.length, "getDataForStackedBarChartByDay");
        let arr = filterDataForStackedBarChartByDay(results);
        res.status(200).send(arr);
      });
    } catch (error) {
      res.status(400).error(e);
    }
  },
  getDataByDate: async (req, res) => {
    let results = [];
    try {
      let stream = await fs.createReadStream("data_aug27.csv");
      let data = await stream.pipe(csv());
      let arr = await data.on("data", (data) => results.push(data));
      await arr.on("end", () => {
        console.log(results.length, "getDataByDate");
        let arr = filterDataForStackedBarChartByDate(results);
        res.status(200).send(arr);
      });
    } catch (error) {
      res.status(400).error(e);
    }
  },
  getDataByDay: async (req, res) => {
    let results = [];
    try {
      let stream = await fs.createReadStream("data_aug27.csv");
      let data = await stream.pipe(csv());
      let arr = await data.on("data", (data) => results.push(data));
      await arr.on("end", () => {
        console.log(results.length, "getDataByDay");
        let arr = filterDataForStackedBarChartByDay(results);
        res.status(200).send(arr);
      });
    } catch (error) {
      res.status(400).error(e);
    }    
  }
};

module.exports = controllers;
