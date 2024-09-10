 import express from 'express';
 import { generateQrCode} from '../controleurs/qrCode.js';

 const Route = express.Router();

 // api pour le QrCode 
 Route.post("/qr_code" , generateQrCode)
 

 export default Route;