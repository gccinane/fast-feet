import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import FileController from './app/controllers/FileController';
import DeliverymanController from './app/controllers/DeliverymanController';
import OrderController from './app/controllers/OrderController';
import CompletedDeliveryController from './app/controllers/CompletedDeliveryController';
import InTransitDeliveryController from './app/controllers/InTransitDeliveryController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.get(
  '/deliveryman/:id/intransit-deliveries',
  InTransitDeliveryController.index
);

routes.put(
  '/deliveryman/:deliverymanId/intransit-deliveries/:deliveryId',
  InTransitDeliveryController.update
);

routes.get(
  '/deliveryman/:id/completed-deliveries',
  CompletedDeliveryController.index
);

routes.put(
  '/deliveryman/:deliverymanId/completed-deliveries/:deliveryId',
  CompletedDeliveryController.update
);

routes.post('/delivery/:id/problems', DeliveryProblemController.store);

routes.use(authMiddleware);

routes.get('/delivery-problems', DeliveryProblemController.index);
routes.get('/delivery/:id/problems', DeliveryProblemController.show);
routes.delete('/problem/:id/cancel-delivery', DeliveryProblemController.delete);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);
routes.get('/recipients/', RecipientController.index);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/deliverymen', DeliverymanController.store);
routes.get('/deliverymen', DeliverymanController.index);
routes.put('/deliverymen/:id', DeliverymanController.update);
routes.delete('/deliverymen/:id', DeliverymanController.delete);

routes.post('/orders', OrderController.store);
routes.get('/orders', OrderController.index);
routes.put('/orders/:id', OrderController.update);
routes.delete('/orders/:id', OrderController.delete);

export default routes;
