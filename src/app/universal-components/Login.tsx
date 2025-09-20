import Image from "next/image";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter()
  const { login } = useAuth()
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // Prevent default form submission
    console.log('Attempting login with:', email, password)
    try {
      await login(email, password)
      console.log('Login successful, redirecting...')
      // Redirect to materials page after successful login
      router.push('/materials')
    } 
    catch (error: any) {
      console.error('Login failed:', error)
      alert('Login failed: ' + (error.message || 'Unknown error'))
    }
  }

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      {/* Logo and Title */}
      <div className="flex items-center mb-8">
        <Image src="/tallylogo.svg" alt="Tally" width={80} height={80} className="mr-3" />
        <h1 className="text-6xl font-uncut-sans text-[#444EAA] font-bold">Tally</h1>
      </div>
      
      
      <div className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-uncut-sans font-bold mb-4 text-black">Sign in to your account</h2>
          <form onSubmit={handleSubmit}>
            <input 
              name="email" 
              type="email"
              value={email}
              className="font-uncut-sans border border-gray-300 rounded px-3 py-2 mb-4 w-full text-gray-500"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              name="password" 
              type="password"
              value={password}
              className="font-uncut-sans border border-gray-300 rounded px-3 py-2 mb-4 w-full text-gray-500"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button 
              type="submit"
              className="font-uncut-sans bg-blue-500 cursor-pointer text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
          <button 
            onClick={() => router.push('/signup')}
            className="text-[#444EAA] pt-4 cursor-pointer hover:underline font-uncut-sans"
          >
            Create an account
          </button>
        </div>
    </div>
  );
}
