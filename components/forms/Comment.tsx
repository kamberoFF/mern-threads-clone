"use client"

import React from 'react'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { commentValidation } from '@/lib/validations/thread'
import { addCommentToThread } from '@/lib/actions/thread.actions'
// import { createThread } from '@/lib/actions/thread.actions'

interface Props {
    threadId: string,
    currentUserImage: string,
    currentUserId: string
}



const Comment = ({ threadId, currentUserImage, currentUserId} : Props) => {
    const router = useRouter()
    const pathname = usePathname()
  
    const form = useForm({
      resolver: zodResolver(commentValidation),
      defaultValues: {
        thread: ""
      }
    })
  
    const onSubmit = async (values: z.infer<typeof commentValidation>) => {
      await addCommentToThread(JSON.parse(threadId), values.thread, JSON.parse(currentUserId), pathname);
  
      form.reset();
    }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="comment-form">

        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className='flex items-center gap-3 w-full'>
              <FormLabel>
                <Image 
                src={currentUserImage}
                alt="Profile image"
                width={48}
                height={48}
                className='rounded-full object-cover'
                />
              </FormLabel>
              <FormControl className='border-none bg-transparent'>
                <Input
                  type='text'
                  placeholder='Comment...'
                  className='no-focus text-light-1 outline-none bg-dark-3'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        
        <Button
          type="submit"
          className="comment-form_btn">
            Reply
        </Button>
      </form>
    </Form>
  )
}

export default Comment