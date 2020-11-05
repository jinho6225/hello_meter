const express = require('express');
const router = express.Router();
const csv = require('csv-parser')
const fs = require('fs')
const results = [];

const getAll = async (req, res) => {
    try {
        let stream = await fs.createReadStream('data_aug27.csv')
        let data = await stream.pipe(csv())
        await data.on('data', (data) => results.push(data))
        await data.on('end', () => {
                console.log(results.length);
                res.status(200).send(results);
        });
    } catch (error) {
        res.status(400).error(e);
    }
}

router.route('/api').get(getAll)

// router.route('/sgt/name').get(controllers.getAllByName);
// router.route('/sgt/name/:name').get(controllers.getOneByName);
// router.route('/sgt/course').get(controllers.getAllByCourse);
// router.route('/sgt/course/:course').get(controllers.getOneByCourse);


module.exports = router;

