'use client';

import { MoveRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Country, State, City } from 'country-state-city';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { useCartStore } from '@/components/stores/cartStore';
import { DishProps } from '@/components/interface/dish.interface';
import { useAuthStore } from '@/components/stores/authStore';
import { API_URL } from '@/components/hooks/Api';

const stripePromise= loadStripe(
  process.env.NEXT_PUBLIC_STRIPE!
);

interface StripeWithCheckout {
  redirectToCheckout: (options: { sessionId: string }) => Promise<{ error?: { message: string } }>;
}


interface Errors {
  country?: string;
  state?: string;
  city?: string;
  street?: string;
  payment?: string;
}

const OrderSummary = () => {

  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [payment, setPayment] = useState<'STRIPE' | 'PAYSTACK'>('STRIPE');
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const { carts } = useCartStore();
  const {user} = useAuthStore()

  const subtotal = 20;
  const total = 100;
  const savings = subtotal - total;

  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);

const handleCheckout = async () => {
  const formErrors: Errors = {};

  if (!country) formErrors.country = 'Country is required';
  if (!state) formErrors.state = 'State is required';
  if (!city) formErrors.city = 'City is required';
  if (!street) formErrors.street = 'Street is required';
  if (!payment) formErrors.payment = 'Payment is required';

  setErrors(formErrors);

  if (Object.keys(formErrors).length > 0) {
    toast.error('Please fill all required fields');
    return;
  }

  if (!user) {
    toast.error('You must be logged in to checkout');
    return;
  }

  setLoading(true);

  try {
    const simplifiedProducts = carts.map((item) => ({
      id: item.id,
      name: item.dish.name,
      image: item.dish.image,
      price: item.dish.price,
      quantity: item.quantity ?? 1,
    }));

    const payload = {
      email: user.email,
      paymentMethod: payment, 
      products: simplifiedProducts,
      shippingAddress: {
        street,
        country: Country.getCountryByCode(country)?.name || country,
        state: State.getStateByCodeAndCountry(state, country)?.name || state,
        city,
      },
    };

 
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/create-checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Checkout error:', errorText);
      toast.error('Failed to initiate payment.');
      return;
    }

    const data = await response.json();

    if (payment === 'STRIPE') {
      console.log('💳 Redirecting to Stripe checkout...');

const stripe = (await stripePromise) as unknown as StripeWithCheckout;

  if (!stripe) {
    toast.error('Stripe failed to initialize');
    return;
  }

const { sessionId } = data;
const result = await stripe.redirectToCheckout({ sessionId });


      if (result.error) {
        console.error('Stripe redirect error:', result.error.message);
        toast.error(result.error.message || 'Stripe checkout failed');
      }
    } else if (payment === 'PAYSTACK') {
      console.log('💰 Redirecting to Paystack checkout...');
      if (!data.checkoutUrl) {
        toast.error('Paystack checkout URL not found');
        return;
      }
      window.location.href = data.checkoutUrl; // redirect to Paystack
    }
  } catch (err: any) {
    console.error('⚠️ Checkout error:', err);
    toast.error(err.message || 'Checkout failed');
  } finally {
    setLoading(false);
  }
};


  return (
    <motion.div
      className="space-y-4 rounded-lg border bg-black p-4 shadow-sm sm:p-6 w-full max-w-[500px]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-xl font-semibold text-white">Order Summary</p>

      <div className="space-y-4">


             {/* Street */}
        <div className="mb-4">
          <label className="block text-white text-sm font-medium mb-1">Street</label>
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none bg-transparent text-white ${
              errors.street ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-[#a16d57]'
            }`}
          />
          {errors.street && <p className="text-red-500 text-xs mt-1">{errors.street}</p>}
        </div>

        {/* Country */}
        <div className="mb-4">
          <label htmlFor="country"  className="block text-white text-sm font-medium mb-1">Country</label>
          <select
          id='country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none bg-transparent text-black ${
              errors.country ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-[#a16d57]'
            }`}
          >
            <option value="" className=''>Select country</option>
            {Country.getAllCountries().map((c) => (
              <option key={c.isoCode} value={c.isoCode}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.country && <p className="text-red-500 text-xs mt-1">{errors.country}</p>}
        </div>

        {/* State */}
        {country && (
          <div className="mb-4">
            <label htmlFor="state"  className="block text-white text-sm font-medium mb-1">State</label>
            <select
            id='state'
              value={state}
              onChange={(e) => setState(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none bg-transparent text-black ${
                errors.state ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-[#a16d57]'
              }`}
            >
              <option value="">Select state</option>
              {State.getStatesOfCountry(country).map((s) => (
                <option key={s.isoCode} value={s.isoCode}>
                  {s.name}
                </option>
              ))}
            </select>
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
          </div>
        )}

        {/* City */}
        {state && (
          <div className="mb-4">
  <label htmlFor="city"  className="block text-white text-sm font-medium mb-1">City</label>
            <select
            id='city'
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none bg-transparent text-white ${
                errors.city ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-[#a16d57]'
              }`}
            >
              <option value="">Select city</option>
              {City.getCitiesOfState(country, state).map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>
        )}

   

        {/* Payment Method */}
        <div className="mb-4">
          <label htmlFor="payment"  className="block text-white text-sm font-medium mb-1">Payment Method</label>
          <select
          id='payment'
            value={payment}
            onChange={(e) => setPayment(e.target.value as 'STRIPE' | 'PAYSTACK')}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none bg-transparent text-white ${
              errors.payment ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-[#a16d57]'
            }`}
          >
            <option value="">Select payment method</option>
            <option value="PAYSTACK">Paystack</option>
            <option value="STRIPE">Stripe</option>
          </select>
          {errors.payment && <p className="text-red-500 text-xs mt-1">{errors.payment}</p>}
        </div>

        {/* Price Summary */}
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-white">Original Price</dt>
            <dd className="text-base font-medium text-white">${formattedSubtotal}</dd>
          </dl>

          {savings > 0 && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-white">Savings</dt>
              <dd className="text-base font-medium text-white">-${formattedSavings}</dd>
            </dl>
          )}

          <dl className="flex items-center justify-between gap-4 border-t border-gray-600 pt-2">
            <dt className="text-base font-bold text-white">Total</dt>
            <dd className="text-base font-bold text-white">${formattedTotal}</dd>
          </dl>
        </div>

        <motion.button
          className="flex w-full items-center justify-center border border-[#545454] px-5 py-2.5 text-sm font-medium text-black focus:outline-none bg-transparent hover:text-black hover:bg-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCheckout}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Proceed to Checkout'}
        </motion.button>

        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-400">or</span>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-white font-bold underline hover:no-underline"
          >
            Continue Shopping
            <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
