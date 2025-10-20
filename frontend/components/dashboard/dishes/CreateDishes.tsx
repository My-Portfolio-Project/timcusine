'use client';
import React, { useRef, useState } from 'react';
import { Camera, DollarSign, Loader2, Notebook, Star, Type, X } from 'lucide-react';
import { useDishStore } from '@/components/stores/dishStore';

const CreateDishes = () => {

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [image, setImage] = useState('');
  const [desc, setDesc] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [messages, setMessages] = useState<string>('')
  const [success, setSuccess] = useState<boolean | null>(null);


  const imageRef = useRef<HTMLInputElement>(null);

  const {fetchAll, createDish} = useDishStore()

  // ✅ Validate input fields
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Dish name is required';
    if (!price.trim()) newErrors.price = 'Dish price is required';
    if (!rating.trim()) newErrors.rating = 'Dish rating is required';
    if (!desc.trim()) newErrors.desc = 'Description rating is required';
    if (!image) newErrors.image = 'Dish image is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle image upload preview
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBoxClick = () => {
    imageRef.current?.click();
  };

  // ✅ Handle submit
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!validateForm()) return;

  const payload = { name, price, rating, image, desc };
  // console.log('Dish Created:', { name, price, rating, image, desc });

  setLoading(true);
  try {
    const { success, message } = await createDish(payload);
    setMessages(message);
    setSuccess(success);

    if (success) {
      // Reset form
      setName('');
      setPrice('');
      setRating('');
       setDesc('');
      setImage('');
      setPreview('');
    }

  } catch (error) {
    console.error('Error creating dish:', error);
    setMessages('Something went wrong while creating the dish.');
    setSuccess(false); 
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="w-full bg-[#1C2534] p-2 md:p-5 rounded-xl shadow-md
     border border-gray-700">
      <h2 className="text-xl font-semibold text-white mb-4">Create New Dish</h2>

      {/* message  */}

      <form onSubmit={handleSubmit}
       className="flex flex-col gap-5">

        {/* ✅ Success / Error Message */}
       {messages && (
  <div
    className={`mb-4 p-3 rounded text-sm ${
      success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
    }`}
  >
    {messages}
  </div>
       )
    }



<div className='flex flexcol md:flex-row w-full'>



{/* left section */}
<div className='flex flex-col gap-4 md:w-[50%] w-full'>


        {/* Image Upload */}
        <div className='w-full flex flex-col items-center justify-center'>
          <label className="text-gray-300 text-sm mb-2 hidden"> Image</label>
          <div
            onClick={handleBoxClick}
            className="relative w-[120px] h-[120px] rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center cursor-pointer hover:border-[#6159e7] transition"
          >

    { preview &&   <div onClick={() => setPreview(null)}
            className="absolute top-2 right-0 bg-red-500 w-5 h-5 flex items-center 
            justify-center rounded-full cursor-pointer">

  <X  size={12} />
              </div> }
            <input
              ref={imageRef}
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />

            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <Camera className="text-gray-400" size={28} />
            )}

            {preview && (
              <div className="absolute bottom-2 right-2 bg-black/60 p-1 rounded-full">
                <Camera size={16} color="#fff" />
              </div>
            )}

          </div>
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
          )}
        </div>

        {/* Dish Name */}
        <div>
          <label className="text-gray-300 text-sm mb-1 block">Dish Name</label>
          <div className="relative">
            <Type
              size={18}
              className="absolute left-3 top-3 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Enter dish name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full pl-10 pr-3 py-2 rounded-lg bg-[#111828] text-white focus:outline-none focus:ring-2 ${
                errors.name ? 'focus:ring-red-500' : 'focus:ring-[#6159e7]'
              }`}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>



        {/* Price */}
        <div>
          <label className="text-gray-300 text-sm mb-1 block">Price</label>
          <div className="relative">
            <DollarSign
              size={18}
              className="absolute left-3 top-3 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={`w-full pl-10 pr-3 py-2 rounded-lg bg-[#111828] text-white focus:outline-none focus:ring-2 ${
                errors.price ? 'focus:ring-red-500' : 'focus:ring-[#6159e7]'
              }`}
            />
          </div>
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price}</p>
          )}
        </div>

        </div>

        {/* right section */}


<div className="flex flex-col gap-4 md:w-[50%] w-full">
        {/* Rating */}
        <div>
          <label className="text-gray-300 text-sm mb-1 block">Rating</label>
          <div className="relative">
            <Star
              size={18}
              className="absolute left-3 top-3 text-gray-400 pointer-events-none"
            />
            <input
              type="number"
              placeholder="Enter rating (1–5)"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              className={`w-full pl-10 pr-3 py-2 rounded-lg bg-[#111828] text-white focus:outline-none focus:ring-2 ${
                errors.rating ? 'focus:ring-red-500' : 'focus:ring-[#6159e7]'
              }`}
              min={1}
              max={5}
            />
          </div>
          {errors.rating && (
            <p className="text-red-500 text-sm mt-1">{errors.rating}</p>
          )}
        </div>

          {/* Desc */}
        <div>
          <label className="text-gray-300 text-sm mb-1 block">Description</label>
          <div className="relative">
            <Notebook
              size={18}
              className="absolute left-3 top-3 text-gray-400 pointer-events-none"
            />
            <textarea
              placeholder="Enter description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              className={`w-full pl-10 pr-3 py-2 h-[150px] rounded-lg bg-[#111828] text-white
                 focus:outline-none focus:ring-2 ${
                errors.desc ? 'focus:ring-red-500' : 'focus:ring-[#6159e7]'
              }`}
       
            />
          </div>
          {errors.desc && (
            <p className="text-red-500 text-sm mt-1">{errors.desc}</p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-[#6159e7] hover:bg-[#4e49c6] rounded-lg text-white font-medium flex items-center justify-center transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin mr-2" /> Processing...
              </>
            ) : (
              'Create Dish'
            )}
          </button>
        </div>

        </div>

        </div>

      </form>

    </div>
  );
};

export default CreateDishes;
