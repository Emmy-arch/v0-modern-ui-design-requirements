"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, EyeOff, Building2, Users, FileText, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [selectedRole, setSelectedRole] = useState("")

  const handleLogin = (role: string) => {
    // In a real app, this would handle authentication
    window.location.href = `/${role}-dashboard`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:block space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-800 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-blue-800">PPP Portal</h1>
                <p className="text-blue-600">Public-Private Partnership Management</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-yellow-800" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Project-Based Investment</h3>
                <p className="text-gray-600 text-sm">Browse available PPP projects and express interest</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-yellow-800" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Streamlined Process</h3>
                <p className="text-gray-600 text-sm">From interest to approval with clear documentation flow</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-yellow-800" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Real-time Tracking</h3>
                <p className="text-gray-600 text-sm">Monitor your application status at every stage</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <Card className="w-full max-w-md mx-auto shadow-xl border-0">
          <CardHeader className="space-y-2 text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">Welcome Back</CardTitle>
            <CardDescription>Sign in to access your dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter your email" className="h-11" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Login As</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger className="h-11">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="super-admin">Super Admin</SelectItem>
                    <SelectItem value="investor">Investor</SelectItem>
                    <SelectItem value="ppp-member">PPP Member</SelectItem>
                    <SelectItem value="hod">Head of Department</SelectItem>
                    <SelectItem value="md-ceo">MD/CEO</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                className="w-full h-11 bg-yellow-400 hover:bg-yellow-500 text-yellow-900 font-semibold"
                onClick={() => selectedRole && handleLogin(selectedRole)}
                disabled={!selectedRole}
              >
                Sign In
              </Button>

              <div className="text-center">
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-800 hover:underline">
                  Forgot your password?
                </Link>
              </div>
            </div>

            {/* Demo Access */}
            <div className="border-t pt-4">
              <p className="text-xs text-gray-500 text-center mb-3">Quick Demo Access:</p>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={() => handleLogin("super-admin")} className="text-xs">
                  Super Admin
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleLogin("investor")} className="text-xs">
                  Investor Demo
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleLogin("ppp-member")} className="text-xs">
                  PPP Member
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleLogin("hod")} className="text-xs">
                  HoD Demo
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleLogin("md-ceo")}
                  className="text-xs col-span-2"
                >
                  MD/CEO Demo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
