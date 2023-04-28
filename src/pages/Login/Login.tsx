import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from 'src/components/Input'
import { schema, Schema } from 'src/utils/rules'
import { useMutation } from '@tanstack/react-query'
import { loginAccount } from 'src/apis/auth.api'
import { isAxiosUnprocessableEntityError } from 'src/utils/utils'
import { ResponseApi } from 'src/types/utils.type'

type FormData = Omit<Schema, 'confirm_password'>
const loginSchema = schema.omit(['confirm_password'])
export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => loginAccount(body)
  })

  const onSubmit = handleSubmit((data) => {
    // console.log(data)

    loginMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
      },
      onError: (error) => {
        // console.log(error)
        if (isAxiosUnprocessableEntityError<ResponseApi<FormData>>(error)) {
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

  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng Nhâp</div>
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
              {/* <div className='mt-8'>
                <input
                  type='email'
                  name='email'
                  className=' w-full border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Email'
                />
                <div className='mt-1 min-h-[1rem] text-sm text-red-600'>Email không hợp lệ </div>
              </div>
              <div className='mt-8'>
                <input
                  type='password'
                  name='password'
                  className=' w-full border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
                  placeholder='Password'
                  autoComplete='on'
                />
                <div className='mt-1 min-h-[1rem] text-sm text-red-600'>Password không hợp lệ </div>
              </div> */}
              <div className='mt-3'>
                <button
                  type='submit'
                  className='w-full bg-red-500 px-2 py-4 text-center text-sm uppercase text-white hover:bg-red-500'
                >
                  Login
                </button>
              </div>
              <div className='mt-8 flex  items-center justify-center'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='ml-1 text-red-400' to={'/register'}>
                  Singup
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
