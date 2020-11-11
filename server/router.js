const express = require('express');
const router = express.Router();
const controllers = require('./controllers')



router.route('/api').get(controllers.getAll)
router.route('/api/barchart/:id').get(controllers.getDataForBarChart)
router.route('/api/stackedbarchart/:id').get(controllers.getDataForStackedBarChart)

router.route('/api/databydate').get(controllers.getDataByDate)
router.route('/api/databyday').get(controllers.getDataByDay)

module.exports = router;

