'use client';
import React, { useState } from 'react';
import { Eye, EyeOff, Loader2 } from 'lucide-react';

const CreateClient = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) newErrors.firstName = 'First name is required';
    if (!lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Enter a valid email';

    if (!password.trim()) newErrors.password = 'Password is required';
    if (password.length < 6)
      newErrors.password = 'Password must be at least 6 characters';

    if (confirmPassword !== password)
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log('Client Created:', {
        firstName,
        lastName,
        email,
        password,
      });

      // Reset form
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      alert('Client added successfully!');
    } catch (error) {
      console.error('Error creating client:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* First & Last Name */}
        <div className="flex flex-col md:flex-row gap-3 w-full">
          <div className="flex-1">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`input input-bordered w-full bg-[#111828] text-white border-none rounded-lg focus:outline-none focus:ring-2 ${
                errors.firstName ? 'focus:ring-red-500 border-red-500' : 'focus:ring-[#6159e7]'
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          <div className="flex-1">
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`input input-bordered w-full bg-[#111828] text-white border-none rounded-lg focus:outline-none focus:ring-2 ${
                errors.lastName ? 'focus:ring-red-500 border-red-500' : 'focus:ring-[#6159e7]'
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`input input-bordered w-full bg-[#111828] text-white border-none rounded-lg focus:outline-none focus:ring-2 ${
              errors.email ? 'focus:ring-red-500 border-red-500' : 'focus:ring-[#6159e7]'
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`input input-bordered w-full bg-[#111828] text-white border-none rounded-lg focus:outline-none focus:ring-2 ${
              errors.password ? 'focus:ring-red-500 border-red-500' : 'focus:ring-[#6159e7]'
            }`}
          />
          <div
            className="absolute top-3 right-3 cursor-pointer text-gray-400"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`input input-bordered w-full bg-[#111828] text-white border-none rounded-lg focus:outline-none focus:ring-2 ${
              errors.confirmPassword
                ? 'focus:ring-red-500 border-red-500'
                : 'focus:ring-[#6159e7]'
            }`}
          />
          <div
            className="absolute top-3 right-3 cursor-pointer text-gray-400"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="btn w-full bg-[#6159e7] text-white border-none hover:bg-[#4e49c6] flex items-center justify-center"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin mr-2" /> Processing...
              </>
            ) : (
              'Submit'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateClient;
