import React from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface Props {
  type: React.HTMLInputTypeAttribute
  errorMesssage?: string
  placeholder?: string
  className?: string
  name: string
  register: UseFormRegister<any>
  rules?: RegisterOptions
  autoComplete?: string
}

export default function Input({
  type,
  name,
  autoComplete,
  errorMesssage,
  placeholder,
  className,
  register,
  rules
}: Props) {
  return (
    <div>
      <div className={className}>
        <input
          type={type}
          // name='email'
          className=' w-full border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...register(name, rules)}
        />
        <div className='mt-1 min-h-[1rem] text-sm text-red-600'>{errorMesssage}</div>
      </div>
    </div>
  )
}
