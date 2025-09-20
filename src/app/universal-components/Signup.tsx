'use client'
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter()
  const { signup } = useAuth()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    occupation: ''
  })
  
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  const [loading, setLoading] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid'
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }
    
    if (!formData.occupation.trim()) {
      newErrors.occupation = 'Occupation is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)
    
    try {
      await signup(formData.email, formData.password, {
        name: formData.name,
        occupation: formData.occupation
      })
      console.log('Signup successful, redirecting...')
      router.push('/materials')
    } catch (error: any) {
      console.error('Signup failed:', error)
      setErrors({ general: error.message || 'Signup failed. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Logo and Title */}
      <div className="flex items-center mb-8">
        <Image src="/tallylogo.svg" alt="Tally" width={80} height={80} className="mr-3" />
        <h1 className="text-6xl font-uncut-sans text-[#444EAA] font-bold">Tally</h1>
      </div>
      
      <div className="bg-white p-8 rounded-lg shadow w-full max-w-md">
        <h2 className="text-2xl font-uncut-sans font-bold mb-6 text-black text-center">Create your account</h2>
        
        {errors.general && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {errors.general}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              name="name"
              type="text"
              value={formData.name}
              className={`font-uncut-sans border rounded px-3 py-2 w-full text-gray-900 ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your full name"
              onChange={handleInputChange}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              name="email"
              type="email"
              value={formData.email}
              className={`font-uncut-sans border rounded px-3 py-2 w-full text-gray-900 ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter your email"
              onChange={handleInputChange}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Occupation</label>
            <select 
              name="occupation"
              value={formData.occupation}
              className={`font-uncut-sans border rounded px-3 py-2 w-full text-gray-900 ${
                errors.occupation ? 'border-red-500' : 'border-gray-300'
              }`}
              onChange={handleInputChange}
            >
              <option value="">Select your occupation</option>
              <option value="Crafter">Crafter</option>
              <option value="Designer">Designer</option>
              <option value="Artist">Artist</option>
              <option value="Entrepreneur">Entrepreneur</option>
              <option value="Student">Student</option>
              <option value="Other">Other</option>
            </select>
            {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              name="password"
              type="password"
              value={formData.password}
              className={`font-uncut-sans border rounded px-3 py-2 w-full text-gray-900 ${
                errors.password ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Create a password"
              onChange={handleInputChange}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
            <input 
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              className={`font-uncut-sans border rounded px-3 py-2 w-full text-gray-900 ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Confirm your password"
              onChange={handleInputChange}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
          
          <button 
            type="submit"
            disabled={loading}
            className="font-uncut-sans bg-[#444EAA] cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600 w-full disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <button 
            onClick={() => router.push('/')}
            className="text-[#444EAA] hover:underline font-uncut-sans"
          >
            Already have an account? Sign in
          </button>
        </div>
      </div>
    </div>
  );
}
