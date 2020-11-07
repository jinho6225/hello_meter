const express = require('express');
const router = express.Router();
const controllers = require('./controllers')



router.route('/api').get(controllers.getAll)
router.route('/api/barchartbydate').get(controllers.getDataForBarChartByDate)
router.route('/api/stackedbarchartbydate').get(controllers.getDataForStackedBarChartByDate)
router.route('/api/barchartbyday').get(controllers.getDataForBarChartByDay)
router.route('/api/stackedbarchartbyday').get(controllers.getDataForStackedBarChartByDay)
router.route('/api/piechartbydate').get(controllers.getDataForPieChartByDate)
router.route('/api/piechartbyday').get(controllers.getDataForPieChartByDay)

// router.route('/api/stackedbarchartbyday').get(controllers.getDataForStackedBarChartByDay)
// router.route('/sgt/name').get(controllers.getAllByName);
// router.route('/sgt/name/:name').get(controllers.getOneByName);
// router.route('/sgt/course').get(controllers.getAllByCourse);
// router.route('/sgt/course/:course').get(controllers.getOneByCourse);

module.exports = router;

