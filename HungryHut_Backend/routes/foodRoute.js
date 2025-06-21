import express from 'express'
import { addFood, getSingleFood, getTrendingFoods, incrementFoodCounter, listFood, removeFood, suggestFoods, updateFood } from '../controllers/foodController.js'
import multer from 'multer'
import authMiddleware from '../middleware/auth.js';

const foodRouter=express.Router();

//image storage engine

const storage=multer.diskStorage({
  destination: "uploads",
  filename:(req,file,cb)=>{
    return cb(null,`${Date.now()}${file.originalname}`);
  }
})

const upload=multer({storage:storage})

foodRouter.post("/add",upload.single("image"),addFood)
foodRouter.get("/list",listFood)
foodRouter.post("/remove",removeFood)
foodRouter.get('/trending', getTrendingFoods)
foodRouter.patch('/increment-counter/:id',authMiddleware,incrementFoodCounter)
foodRouter.post('/suggest',suggestFoods)
foodRouter.patch('/update/:id', updateFood)
foodRouter.get('/get/:id', getSingleFood)


export default foodRouter;