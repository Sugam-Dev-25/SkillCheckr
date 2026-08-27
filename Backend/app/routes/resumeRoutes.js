const express = require('express');
const router = express.Router();
const cvController = require('../controllers/resumeController');

// Standard RESTful Routes
router.post('/', (req, res) => cvController.createCv(req, res));
router.get('/', (req, res) => cvController.getAllCvs(req, res));
router.get('/:id', (req, res) => cvController.getCvById(req, res));
router.put('/:id', (req, res) => cvController.updateCv(req, res));
router.delete('/:id', (req, res) => cvController.deleteCv(req, res));
router.get('/:id/download', (req, res) => cvController.downloadCvPdf(req, res));

module.exports = router;