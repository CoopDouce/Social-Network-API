import { Router } from 'express';

const router = Router();
import apiRoutes from '../routes/api/index';

router.use('/api', apiRoutes);

export default router;