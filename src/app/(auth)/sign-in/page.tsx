"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { signUpSchema } from "@/schemas/signUpSchema"
import axios, { AxiosError } from "axios"
import { ApiResponse } from "@/types/ApiResponse"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"
import { signInSchema } from "@/schemas/signInSchema"
import { signIn } from "next-auth/react"

const page = () => {


  const router = useRouter()

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  })


  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    
  const result = await signIn("credentials" , { identifier: data.identifier ,
     password: data.password , 
     redirect: false })

     if (result?.error) {
      toast.message("Login Failed , Invalid Credentials")
     } 

     if (result?.url) {
      router.replace("/dashboard")
      
     }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-gray-100 via-white to-gray-100 px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-lg p-8 space-y-6 dark:bg-gray-900 dark:border-gray-700">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Random Comment App</h1>
          <p className="text-sm font-semibold text-gray-600 mt-1 dark:text-gray-400">Sign In to Start Your Random Adventure</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">Email / Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Email / Username"  {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-300">Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-20 bg-blue-600 hover:bg-blue-800 text-white font-semibold py-2 px-4 rounded transition duration-200"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Sign In"}
            </Button>
          </form>
        </Form>

        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link href="/sign-up" className="text-blue-600 hover:underline dark:text-blue-500">
              Sign Up
            </Link>
          </p>
        </div>
        
      </div>
    </div>
  )
}

export default page
