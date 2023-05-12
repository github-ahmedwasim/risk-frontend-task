import { useEffect, useState } from 'react'
import { SiEthereum } from 'react-icons/si'
import { useRouter } from 'next/router'

import { CRYPTOS } from '../utils/constants'
import { TokenSelector } from '.'

const TableItem = ({ title, style='' }) => (
  <div className={`text-center border-2 p-3 ${style}`}>
    {title}
  </div>
)

const Welcome = () => {
  const [firstToken, setFirstToken] = useState({})
  const [secondToken, setSecondToken] = useState({})
  const [tokensSelected, setTokensSelected] = useState({})
  const [firstTokenAmount, setFirstTokenAmount] = useState(0)

  const router = useRouter()

  useEffect(() => {
    setTokensSelected(() => (
      Object.keys(firstToken).length === 0 || 
      Object.keys(secondToken).length === 0 || 
      !firstTokenAmount
    ))
  }, [firstToken, secondToken, firstTokenAmount])

  const remainingTokens = [...CRYPTOS]
  remainingTokens.splice(CRYPTOS.indexOf(firstToken), 1)

  const handleSubmit = e => {
    e.preventDefault()
    localStorage.setItem('tokens', JSON.stringify({ base: firstToken.tokenHash, quote: secondToken.tokenHash }))
    router.push('order-book')
  }

  return (
    <div className='flex justify-between p-[5%] max-[770px]:flex-col'>
      <div className='w-fit text-white min-[770px]:max-w-[420px] max-[770px]:w-[100%]'>
        <h1 className='text-white text-4xl'>
          Exchange Crypto<br /> 
          from anywhere with KRYPT
        </h1>
        <p className='w-[90%] text-gray-400 mt-4'>
          Explore the crypto world. Buy and sell cryptocurrencies easily on Krypto.
        </p>
        <button
          type='submit'
          className='bg-blue-600 w-1/2 rounded-3xl p-2 mt-6'
        >
          Connect Wallet
        </button>
        <div className='grid grid-cols-3 mt-14 min-[770px]:pr-[5%]'>
          <TableItem title='Reliability' style='rounded-tl-2xl' />
          <TableItem title='Security' />
          <TableItem title='Ethereum' style='rounded-tr-2xl' />
          <TableItem title='Web 3.0' style='rounded-bl-2xl' />
          <TableItem title='Low fees' />
          <TableItem title='Blockchain' style='rounded-br-2xl' />
        </div>
      </div>
      <div className='min-[770px]:w-[35%] lg:mr-[2%] min-[770px]:max-w-[400px] min-w-[300px] min-[770px]:ml-14 max-[770px]:mt-14'>
        <div className='bg-gradient-to-r from-blue-300 to-red-400 lg:w-[100%] p-4 rounded-xl'>
          <div className='flex space-x-72'>
            <SiEthereum className='justify-start' color='white' size={40} />
          </div>
          <div className='mt-16'>
            <h2 className='text-white font-semibold'>Exchange Crypto</h2>
          </div>
        </div>
        <div className=''>
          <form className='space-y-2 bg-gray-900 p-4'>
            <TokenSelector 
              heading={'You Pay:'} 
              tokens={CRYPTOS} 
              selected={firstToken} 
              setSelected={setFirstToken}
              amount={firstTokenAmount}
              setAmount={setFirstTokenAmount}
            />
            <TokenSelector 
              heading={'You Receive:'} 
              tokens={remainingTokens} 
              selected={secondToken} 
              setSelected={setSecondToken} 
              amount={secondToken ? firstTokenAmount : 0}
              setAmount={setFirstTokenAmount}
            />
           <div>
            <button
                type='submit'
                disabled={tokensSelected}
                className={`bg-blue-600 w-full rounded-3xl p-2 mt-3 text-white ${tokensSelected && 'opacity-50 cursor-not-allowed'}`}
                onClick={handleSubmit}
              >
                Exchange
              </button>
           </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Welcome
