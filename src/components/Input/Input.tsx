import React, { InputHTMLAttributes } from 'react'
import type { UseFormRegister, RegisterOptions } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  errorMesssage?: string
  classNameInput?: string
  classNameError?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register?: UseFormRegister<any>
  rules?: RegisterOptions
}

export default function Input({
  type,
  name,
  autoComplete,
  errorMesssage,
  placeholder,
  className,
  register,
  rules,
  classNameInput = 'w-full border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm',
  classNameError = 'mt-1 min-h-[1rem] text-sm text-red-600'
}: Props) {
  const registerResult = register && name ? register(name, rules) : {}
  return (
    <div>
      <div className={className}>
        <input
          type={type}
          // name='email'
          className={classNameInput}
          placeholder={placeholder}
          autoComplete={autoComplete}
          {...registerResult}
        />
        <div className={classNameError}>{errorMesssage}</div>
      </div>
    </div>
  )
}
