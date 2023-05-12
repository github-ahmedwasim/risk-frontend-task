import Image from 'next/image'
import { useRouter } from 'next/router'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Disclosure } from '@headlessui/react'

import { NAVIGATION_ITEMS } from '../utils/constants'
import logo from '../assets/logo.png'

const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

const MobileNavbar = () => (
  <Disclosure as='nav' className='transparent min-[770px]:hidden'>
    {({ open }) => (
      <>
        <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
          <div className='relative flex h-16 items-center justify-between'>
            <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
              <div className='absolute inset-y-0 flex items-center min-[770px]:hidden'>
                <Disclosure.Button className='inline-flex items-center justify-center rounded-md p-2 text-gray-200 hover:text-white'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>
        </div>
        <Disclosure.Panel className='min-[770px]:hidden absolute right-4 bg-gray-800 rounded'>
          <div className='space-y-1 px-2 pb-3 pt-2'>
            {NAVIGATION_ITEMS.map((item) => (
              <Disclosure.Button
                key={item.name}
                as='a'
                href={item.href}
                className={classNames(
                  item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium'
                )}
                aria-current={item.current ? 'page' : undefined}
              >
                {item.name}
              </Disclosure.Button>
            ))}
          </div>
        </Disclosure.Panel>
      </>
    )}
  </Disclosure>
)

const Navbar = () => {
  const router = useRouter()
  
  return (
    <nav className='flex justify-between max-[770px]:mr-[5%]'>
      <div className='mt-6 ml-[5%]'>
        <Image src={logo} alt='logo' onClick={() => router.push('/')} className='w-32 min- cursor-pointer' />
      </div>
      <ul className='text-white flex gap-x-10 font-semibold text-lg mt-6 mr-[7%] max-[770px]:hidden'>
        {NAVIGATION_ITEMS.map((item) => <li key={item.name}>{item.name}</li>)}
        <li className='bg-blue-600 p-2 px-8 rounded-3xl -mt-2 cursor-pointer'>
          Login
        </li>
      </ul>
      <MobileNavbar />
    </nav>
  )
}

export default Navbar
