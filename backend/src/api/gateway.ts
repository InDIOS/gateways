import express from 'express';
import { Document } from 'mongoose';
import { Gateway, Device } from './db/schema';
import { catchError, createError, getOneOrMany } from './commons';

const router = express.Router();

router.get('/gateways', async (_, res) => {
  const gateways = await getOneOrMany(Gateway, 'devices');
  res.status(200).send(gateways);
});

router.post('/gateway', (req, res, next) => {
  catchError(async () => {
    const gateway = await Gateway.create(req.body);
    res.status(201).send(gateway.toJSON({ versionKey: false }));
  }, next);
});

router.post('/gateway/:gatewayId/device', async (req, res, next) => {
  const _id = req.params.gatewayId;
  catchError(async () => {
    const gateway = await Gateway.findOne({ _id });
    if (gateway) {
      const device = new Device(req.body);
      const devices: Document[] = gateway.get('devices');
      if (devices.length < 10) {
        gateway.get('devices').push(device);
        await device.save();
        await gateway.save();
        res.status(200).send(device.toJSON({ versionKey: false }));
      } else {
        res.status(400).send({ statusCode: 400, message: 'Maximun number of devices reached' });
      }
    } else {
      res.status(400).send(createError(_id));
    }
  }, next);
});

router.delete('/gateway/:gatewayId/device/:deviceId', (req, res, next) => {
  const { gatewayId: _id, deviceId: id } = req.params;
  catchError(async () => {
    const gateway = await Gateway.findOne({ _id });
    if (gateway) {
      const gatewayDevices: Document[] = gateway.get('devices');
      const index = gatewayDevices.findIndex((d) => d._id.toString() === id);
      if (~index) {
        gatewayDevices.splice(index, 1);
        const device = await Device.findOneAndDelete({ _id: id });
        await gateway.save();
        res.status(device ? 200 : 400).send(device?.toJSON({ versionKey: false }) || createError(id));
      } else {
        res.status(400).send(createError(id));
      }
    } else {
      res.status(400).send(createError(_id));
    }
  }, next);
});

router
  .route('/gateway/:id')
  .get((req, res, next) => {
    const { id } = req.params;
    catchError(async () => {
      const gateways = await getOneOrMany(Gateway, 'devices', id);
      res.status(gateways.length ? 200 : 400).send(gateways.length ? gateways[0] : createError(id));
    }, next);
  })
  .put((req, res, next) => {
    const _id = req.params.id;
    catchError(async () => {
      await Gateway.findOneAndUpdate({ _id }, req.body, { useFindAndModify: false });
      const gateway = await Gateway.findOne({ _id });
      res.status(gateway ? 200 : 400).send(gateway?.toJSON({ versionKey: false }) || createError(_id));
    }, next);
  })
  .delete((req, res, next) => {
    const _id = req.params.id;
    catchError(async () => {
      const gateway = await Gateway.findOneAndDelete({ _id });
      res.status(gateway ? 200 : 400).send(gateway?.toJSON({ versionKey: false }) || createError(_id));
    }, next);
  });

export default router;
