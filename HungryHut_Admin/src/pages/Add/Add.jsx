import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from "axios";
import { toast } from 'react-toastify';
import Verify from '../../pages/Verify/Verify'; // import Verify component

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [showVerify, setShowVerify] = useState(false); // to show verify modal

  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Snacks",
    Calories: "",
    Protein: "",
    Fat: "",
    Carbs: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  };

  const submitToServer = async () => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("price", Number(data.price));
  formData.append("category", data.category);
  formData.append("image", image);

  // Bundle nutrition info into one object and stringify it
  const nutrition = {
    Calories: Number(data.Calories),
    Protein: Number(data.Protein),
    Fat: Number(data.Fat),
    Carbs: Number(data.Carbs),
  };
  formData.append("nutrition", JSON.stringify(nutrition));

  try {
    const response = await axios.post(`${url}/api/food/add`, formData);
    console.log(formData)
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Snacks",
        Calories: "",
        Protein: "",
        Fat: "",
        Carbs: ""
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message); 
    }
  } catch (err) {
    toast.error("Failed to add item.");
  }
  setShowVerify(false);
};


  const onSubmitHandler = (e) => {
    e.preventDefault();
    setShowVerify(true); // show verify modal
  };

  return (
    <div className='add'>
      <form className='flex-col' onSubmit={onSubmitHandler}>
        {/* Upload image */}
        <div className="add-image-upload flex-col">
          <p>Upload Image</p>
          <label htmlFor="image" className='upload-label'>
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
          </label>
          <input onChange={(e) => setImage(e.target.files[0])} type="file" id='image' hidden required />
        </div>

        {/* Product name */}
        <div className="add-product-name flex-col">
          <p>Product Name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder='Type Here' required />
        </div>

        {/* Description */}
        <div className="add-product-description flex-col">
          <p>Product Description</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" rows='6' placeholder='Write Content Here' required></textarea>
        </div>

        {/* Category and Price */}
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product Category</p>
            <select onChange={onChangeHandler} name="category" value={data.category}>
              <option value="Snacks">Snacks</option>
              <option value="Rice Dishes">Rice Dishes</option>
              <option value="Ice Cream">Ice Cream</option>
              <option value="Western Delights">Western Delights</option>
              <option value="Cake">Cake</option>
              <option value="Bread & Paratha">Bread & Paratha</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name='price' placeholder='10 BDT' required />
          </div>
        </div>

        {/* Nutrition */}
        <div className="add-nutrition flex-col">
          <p>Nutrition Information</p>
          <div className="nutrition-fields">
            <input onChange={onChangeHandler} value={data.Calories} type="number" name="Calories" placeholder="Calories (kcal)" required />
            <input onChange={onChangeHandler} value={data.Protein} type="number" name="Protein" placeholder="Protein (g)" required />
            <input onChange={onChangeHandler} value={data.Fat} type="number" name="Fat" placeholder="Fat (g)" required />
            <input onChange={onChangeHandler} value={data.Carbs} type="number" name="Carbs" placeholder="Carbs (g)" required />
          </div>
        </div>

        {/* Submit Button */}
        <button type='submit' className='add-btn'>ADD</button>
      </form>

      {/* Verify modal */}
      {showVerify && (
        <Verify
          onVerify={submitToServer}
          onCancel={() => setShowVerify(false)}
        />
      )}
    </div>
  );
};

export default Add;
