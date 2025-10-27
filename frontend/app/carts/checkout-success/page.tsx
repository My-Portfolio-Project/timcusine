'use client'
import { API_URL } from '@/components/hooks/Api';
import { useCartStore } from '@/components/stores/cartStore';
import { verify } from 'crypto';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import React, { Suspense, useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

function CheckoutContent () {


    const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const reference = searchParams.get('reference')
  const sessionId = searchParams.get('session_id')
  const  payment = searchParams.get('payment')

  const {clearCarts} = useCartStore()

useEffect(() => {
  async function verifyPayment() {
    setLoading(true);
    try {
      if (!payment) {
        toast.error('Payment method is missing');
        return;
      }

      const queryParams = new URLSearchParams();
      queryParams.append('payment', payment);
      if (payment === 'PAYSTACK' && reference) queryParams.append('reference', reference);
      if (payment === 'STRIPE' && sessionId) queryParams.append('session_id', sessionId);

      const response = await fetch(`${API_URL}/order/checkout/success?${queryParams.toString()}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();

      if (data.success || data.message) {
        setSuccess(true);
        toast.success(data.message || 'Payment verified successfully!');
        clearCarts()
      } else {
        toast.error('Payment verification failed.');
      }
    } catch (error: any) {
      toast.error(error.message || 'Error verifying payment');
    } finally {
      setLoading(false);
    }
  }

  verifyPayment();
}, [payment, reference, sessionId]);


  return (
    <div className="min-h-screen flex items-center justify-center p-4">

        <Toaster  />
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-6">
          {success ? 'Payment Successful!' : 'Payment Processing'}
        </h1>

        {loading ? (
          <div className="flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
            <p>Verifying your payment...</p>
          </div>
        ) : (
          <div>
            <p className="mb-6">
              {success
                ? 'Your order has been confirmed and will be processed shortly.'
                : 'We encountered an issue verifying your payment.'}
            </p>
            <p className="text-sm text-gray-500">Reference: {reference}</p>
          </div>
        )}

        <a
          href="/"
          className="mt-6 inline-block bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
        >
          {success ? 'View Your Orders' : 'Try Again'}
        </a>
      </div>
    </div>
  );
}

export default function CheckoutSuccess () {
    return (
        <Suspense>
<CheckoutContent  />
        </Suspense>
    )
}


