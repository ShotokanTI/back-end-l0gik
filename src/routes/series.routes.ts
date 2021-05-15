import { Router } from 'express';
import { multerConfig } from '../controllers/UploadFile';
import { validation, messagesErrors, validateFile } from '../MiddleWares/validation';
import multer from 'multer';
const router = Router();

import {
  getSeries,
  getSerie,
  createSeries,
  updateSeries,
  deleteSeries
} from "../controllers/Series.controller";

router.get("/Series", getSeries);
router.get("/Series/:id", getSerie);

router.get('/uploads')
router.post("/Series",
  multer(multerConfig).single('File'),
  validation,
  messagesErrors,
  createSeries);

  router.put("/statusSerie/:id",
  updateSeries);

router.put("/Series/:id",
  multer(multerConfig).single('File'),
  validation,
  messagesErrors,
  updateSeries);
router.delete("/Series/:id", deleteSeries);

export default router;
