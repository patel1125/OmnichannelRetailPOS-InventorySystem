const express = require('express');
const DeliveryAgent = require('../models/DeliveryAgent');
const DeliveryTracking = require('../models/DeliveryTracking');
const { protect, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

router.post('/agents', protect, async (req, res, next) => {
  try {
    const agent = await DeliveryAgent.create({ ...req.body, userId: req.user._id });
    res.status(201).json(agent);
  } catch (error) {
    next(error);
  }
});

router.get('/agents/available', async (req, res, next) => {
  try {
    const agents = await DeliveryAgent.find({ isAvailable: true });
    res.json(agents);
  } catch (error) {
    next(error);
  }
});

router.put('/agents/:id/availability', protect, authorizeRoles('deliveryAgent', 'admin'), async (req, res, next) => {
  try {
    const agent = await DeliveryAgent.findByIdAndUpdate(req.params.id, { isAvailable: req.body.isAvailable }, { new: true });
    res.json(agent);
  } catch (error) {
    next(error);
  }
});

router.post('/tracking', protect, authorizeRoles('deliveryAgent', 'admin'), async (req, res, next) => {
  try {
    const tracking = await DeliveryTracking.create(req.body);
    res.status(201).json(tracking);
  } catch (error) {
    next(error);
  }
});

router.get('/tracking/:orderId', protect, async (req, res, next) => {
  try {
    const tracking = await DeliveryTracking.find({ orderId: req.params.orderId }).sort({ timestamp: -1 }).limit(1);
    res.json(tracking[0] || null);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
