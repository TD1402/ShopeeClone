import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from 'src/components/Input'
import { schema, Schema } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import { registerAccount } from 'src/apis/auth.api'
import { omit } from 'lodash'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ResponseApi } from 'src/types/utils.type'

// interface FormData {
//   email: string
//   password: string
//   confirm_password: string
// }

type FormData = Schema

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => registerAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    // console.log(data)
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        // console.log(error)
        if (isAxiosUnprocessableEntityError<ResponseApi<Omit<FormData, 'confirm_password'>>>(error)) {
          const fromError = error.response?.data.data
          if (fromError?.email) {
            setError('email', {
              message: fromError.email,
              type: 'Server'
            })
          }
          if (fromError?.password) {
            setError('password', {
              message: fromError.password,
              type: 'Server'
            })
          }
        }
      }
    })
  })

  // const email = watch('password')
  // console.log(email)

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng Ký</div>
              <Input
                className='mt-8'
                type='string'
                name='email'
                register={register}
                placeholder='Email'
                autoComplete='on'
                // rules={rules.email}
                errorMesssage={errors.email?.message}
              />
              <Input
                className='mt-4'
                type='password'
                name='password'
                register={register}
                placeholder='Password'
                autoComplete='on'
                // rules={rules.password}
                errorMesssage={errors.password?.message}
              />
              <Input
                className='mt-4'
                type='password'
                name='confirm_password'
                register={register}
                placeholder='Confirm Password'
                autoComplete='on'
                // rules={rules.confirm_password}
                errorMesssage={errors.confirm_password?.message}
              />

              {/* <div className='mt-8'>
                <input
                  type='email'
                  // name='email'
                  className=' w-full border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Email'
                  {...register('email', rules.email)}
                />
                <div className='mt-1 min-h-[1rem] text-sm text-red-600'>{errors.email?.message}</div>
              </div>
              <div className='mt-8'>
                <input
                  type='password'
                  // name='password'
                  className=' w-full border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Password'
                  autoComplete='on'
                  {...register('password', rules.password)}
                />
                <div className='mt-1 min-h-[1rem] text-sm text-red-600'>{errors.password?.message} </div>
              </div>
              <div className='mt-4'>
                <input
                  type='password'
                  // name='confirm_password'
                  className=' w-full border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Confirm Password'
                  autoComplete='on'
                  {...register('confirm_password', {
                    ...rules.confirm_password
                  })}
                />
                <div className='mt-1 min-h-[1rem] text-sm text-red-600'>{errors.confirm_password?.message}</div>
              </div> */}
              <div className='mt-3'>
                <button
                  type='submit'
                  className='w-full bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-500'
                >
                  Singup
                </button>
              </div>
              <div className='mt-8 flex  items-center justify-center'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='ml-1 text-red-400' to={'/login'}>
                  Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
