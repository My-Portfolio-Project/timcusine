'use client'
import { CartProps } from "@/components/interface/cart.interface";
import { DishProps } from "@/components/interface/dish.interface";
import { DishesProps } from "@/lib/types/dishes.types";
import { Minus, Plus, Trash } from "lucide-react";
// import { useCartStore } from "../../store/cartStore";


interface Props {
item: CartProps

}


const CartItem = ({ item } : Props) => {
    // const { removeCart, updateCart } = useCartStore()
	// console.log('Cart details:' , item)

	return (
		<div className=' border p-4 shadow-sm bg-transparent
		 border-white md:p-6'>

			<div className='space-y-4 md:flex md:items-center
			 md:justify-between md:gap-6 md:space-y-0'>

				<div className=''>
					<img className='h-20 md:max-w-[300px] w-full md:h-32 
					rounded max-w-[250px]' 
					src={item.dish.image} alt="" />
				</div>

				<label className='sr-only'>Choose quantity:</label>

				<div className='flex items-center justify-between
				 md:order-3 md:justify-end'>

					<div className='flex items-center gap-2'>
						<button
		className='inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border
	 border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2
	  focus:ring-emerald-500'
							// onClick={() => updateCart(item._id, item.quantity - 1)}
						>
							<Minus className='text-gray-300' />
						</button>
						<p className="text-white">{item?.quantity}</p>
						<button
			className='inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border
	 border-gray-600 bg-gray-700 hover:bg-gray-600 focus:outline-none 
	focus:ring-2 focus:ring-emerald-500'
		// onClick={() => updateCart(item._id, item.quantity + 1)}
						>
							<Plus className='text-gray-300' />
						</button>
					</div>

					<div className='text-end md:order-4 md:w-32'>
						<p className='text-base font-bold
						 text-white'>${item?.dish.price ?? ''}</p>
					</div>
				</div>

				<div className='w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md'>
					<p className='text-base font-medium text-white hover:text-emerald-400 hover:underline'>
						{item.dish.name}
					</p>
					<p className='text-sm text-gray-400'>{item?.dish.desc ?? ''}</p>

					<div className='flex items-center gap-4'>
						<button
                       
							className='inline-flex items-center text-sm font-medium text-red-400
							 hover:text-red-300 hover:underline'
							// onClick={() => removeCart(item._id)}
						>
							<Trash />
						</button>
					</div>
				</div>
				
			</div>
		</div>
	);
}

export default CartItem