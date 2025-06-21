import foodModel from "../models/foodModel.js";
import fs from 'fs'

const addFood = async (req, res) => {
  try {
    const image_filename = req.file.filename;
    const nutrition = JSON.parse(req.body.nutrition);

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: Number(req.body.price),
      category: req.body.category,
      image: image_filename,
      nutrition: nutrition 
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log("Add Food Error:", error);
    res.json({ success: false, message: "Error" });
  }
};


//add food list
const listFood= async (req,res)=>{
  try {
    const foods=await foodModel.find({})
    res.json({success:true,data:foods})
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
  }
}

//remove food items

const removeFood=async(req,res)=>{
    try {
      const foods=await foodModel.findById(req.body.id)
      fs.unlink(`uploads/${foods.image}`,()=>{})
      
      await foodModel.findByIdAndDelete(req.body.id)
      res.json({success:true,message:"Food Removed"})
    } catch (error) {
      console.log(error)
      res.json({success:false,message:"Error"})
    }
}

//Get Tranding Foods

const getTrendingFoods = async (req, res) => {
  try {
    const foods = await foodModel.find().sort({ counter: -1 }).limit(10);
    res.json({ success: true, data: foods });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error fetching trending foods" });
  }
};

//Increments counter
const incrementFoodCounter = async (req, res) => {
  try {
    const foodId = req.params.id;
    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { counter: 1 }
    });

    res.json({ success: true, message: 'Counter updated' });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: 'Failed to update counter' });
  }
};



//Nutrition Suggest
const suggestFoods = async (req, res) => {
  try {
    const { calories, protein, fat, carbs } = req.body;

    const allFoods = await foodModel.find();

    const userGoal = {
      calories: parseFloat(calories),
      protein: parseFloat(protein),
      fat: parseFloat(fat),
      carbs: parseFloat(carbs),
    };

    const parsedFoods = allFoods.map(food => {
      
      const n = food.nutrition || {};
      
      const cal = parseFloat(n.Calories) || 0;
      const pro = parseFloat(n.Protein) || 0;
      const fatVal = parseFloat(n.Fat) || 0; 
      const carbsVal = parseFloat(n.Carbs) || 0; 

      return {
        ...food.toObject(),
        parsedNutrition: {
          calories: cal,
          protein: pro,
          fat: fatVal,
          carbs: carbsVal,
        },
      };
    });

    // Step 1: Sort by Calories
    let calSorted = parsedFoods.sort((a, b) => a.parsedNutrition.calories - b.parsedNutrition.calories);
    let calGroup = [];
    let calSum = 0;
    for (let food of calSorted) {
      if (calSum + food.parsedNutrition.calories <= userGoal.calories) {
        calGroup.push(food);
        calSum += food.parsedNutrition.calories;
        
      } else {
        break;
      }
    }
    
    // Step 2: Sort by Protein
    let proteinSorted = calGroup.sort((a, b) => b.parsedNutrition.protein - a.parsedNutrition.protein);
    let proteinGroup = [];
    let proteinSum = 0;
    for (let food of proteinSorted) {
      if (proteinSum + food.parsedNutrition.protein <= userGoal.protein) {
        proteinGroup.push(food);
        proteinSum += food.parsedNutrition.protein;
      } else {
        break;
      }
    }

    // Step 3: Sort by Fat
    let fatSorted = proteinGroup.sort((a, b) => a.parsedNutrition.fat - b.parsedNutrition.fat);
    let fatGroup = [];
    let fatSum = 0;
    for (let food of fatSorted) {
      if (fatSum + food.parsedNutrition.fat <= userGoal.fat) {
        fatGroup.push(food);
        fatSum += food.parsedNutrition.fat;
      } else {
        break;
      }
    }

    // Step 4: Sort by Carbs
    let carbSorted = fatGroup.sort((a, b) => a.parsedNutrition.carbs - b.parsedNutrition.carbs);
    let finalFoods = [];
    let carbSum = 0;
    for (let food of carbSorted) {
      if (carbSum + food.parsedNutrition.carbs <= userGoal.carbs) {
        finalFoods.push(food);
        carbSum += food.parsedNutrition.carbs;
      } else {
        break;
      }
    }
    res.json({ success: true, data: finalFoods });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error generating suggestions" });
  }
};

// Get Single Food by ID
const getSingleFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.params.id);
    if (!food) return res.json({ success: false, message: "Food not found" });
    res.json({ success: true, food });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error fetching food" });
  }
};

// Update Food 
const updateFood = async (req, res) => {
  try {
    const { description, price } = req.body;

    const update = {};
    if (description !== undefined) update.description = description;
    if (price !== undefined) update.price = price;

    const updatedFood = await foodModel.findByIdAndUpdate(req.params.id, update, { new: true });

    if (!updatedFood) return res.json({ success: false, message: "Food not found" });

    res.json({ success: true, message: "Food updated successfully", updatedFood });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Error updating food" });
  }
};




export {addFood,listFood,removeFood,getTrendingFoods,incrementFoodCounter,suggestFoods,getSingleFood,updateFood}