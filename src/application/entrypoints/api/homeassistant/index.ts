import { Router } from 'express';
import { on, off } from './controller';

const homeassistantRouter = Router();

homeassistantRouter.post('/all_lights/on', on);
homeassistantRouter.post('/all_lights/off', off);

export default homeassistantRouter;
