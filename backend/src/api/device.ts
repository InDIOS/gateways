import express from 'express';
import { Device } from './db/schema';
import { catchError, createError, getOneOrMany } from './commons';

const router = express.Router();

router.get('/devices', async (_, res) => {
  const devices = await getOneOrMany(Device);
  res.status(200).send(devices);
});

router.post('/device', (req, res, next) => {
  catchError(async () => {
    const device = await Device.create(req.body);
    res.status(201).send(device.toJSON({ versionKey: false }));
  }, next);
});

router
  .route('/device/:id')
  .get((req, res, next) => {
    const { id } = req.params;
    catchError(async () => {
      const devices = await getOneOrMany(Device, '', id);
      res.status(devices.length ? 200 : 400).send(devices.length ? devices[0] : createError(id));
    }, next);
  })
  .put((req, res, next) => {
    const _id = req.params.id;
    catchError(async () => {
      await Device.findOneAndUpdate({ _id }, req.body, { useFindAndModify: false });
      const device = await Device.findOne({ _id });
      res.status(device ? 200 : 400).send(device?.toJSON({ versionKey: false }) || createError(_id));
    }, next);
  })
  .delete((req, res, next) => {
    const _id = req.params.id;
    catchError(async () => {
      const device = await Device.findOneAndDelete({ _id });
      res.status(device ? 200 : 400).send(device?.toJSON({ versionKey: false }) || createError(_id));
    }, next);
  });

export default router;
