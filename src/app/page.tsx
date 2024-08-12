'use client'

import { useState, useRef, useEffect } from 'react'
import Button from '@/components/Button'

export default function Home() {
  const numbersRef = useRef<(HTMLInputElement | null)[]>([])

  const [balance, setBalance] = useState(2000)
  const [bet, setBet] = useState(100)
  const [message, setMessage] = useState('')

  const getRandomNumber = () => Math.floor(Math.random() * 9) + 1

  const handleRoll = () => {
    if (balance <= 0) {
      setMessage('Yahahaha rungkat gabisa maen 🤑')
      setBet(0)
      return
    }

    if (bet === 0) {
      setMessage('Ngotak dong mana bisa bet $0')
      return
    }

    if (balance < bet) {
      setMessage(
        'Lo liat tu saldo kurang, kasi bet yang bener. Kontak atmin klo mau saldo'
      )
      return
    }

    const randomNumbers = Array.from({ length: 3 }, getRandomNumber)

    randomNumbers.forEach((num, idx) => {
      if (numbersRef.current[idx]) {
        numbersRef.current[idx]!.value = num.toString()
      }
    })

    const isWin = randomNumbers.every((num, _, arr) => num === arr[0])
    const isPartialWin = new Set(randomNumbers).size < 3

    if (isWin) {
      setBalance((prevBalance) => prevBalance + bet * 10)
      setMessage('Gacorr jackpot x10 🤑💰')
    }
    else if (isPartialWin) {
      setBalance((prevBalance) => prevBalance + Math.floor(bet * 1.5))
      setMessage('Gacorr half-win x1.5 🤑')
    }
    else {
      setBalance((prevBalance) => prevBalance - bet)
      setMessage('Coba lagi (ampe rungkat)')
    }
  }

  const handleBetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBet(parseInt(e.target.value, 10))
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedBalance = localStorage.getItem('balance')
      if (savedBalance) {
        setBalance(parseInt(savedBalance, 10))
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('balance', balance.toString())
    }
  }, [balance])

  useEffect(() => {
    if (balance === 0) {
      setBet(0)
      setMessage('mff restart gabisa naekin saldo, bukan app kominfo 😹')
    }

    if (typeof window !== 'undefined') {
      const query = new URLSearchParams(window.location.search)
      if (query.get('admin') === 'true') {
        setMessage(
          'Mode atmin, unlimited money. Delete query lagi kalo udah jangan rakus macam dpr'
        )
        setBalance((prevBalance) => prevBalance + 1000)
      }
    }
  }, [balance])

  return (
    <main className="bg-gradient-to-b from-blue-500 to-indigo-600 min-h-screen flex flex-col items-center justify-center p-4 antialiased">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full subpixel-antialiased">
        <h1 className="text-3xl font-extrabold text-center mb-6 text-blue-600">
          Welcome to MS Bet
        </h1>
        <div className="flex flex-row justify-center items-center gap-3 py-5 text-center">
          {Array.from({ length: 3 }).map((_, idx) => (
            <input
              key={idx}
              ref={(el) => {
                numbersRef.current[idx] = el
              }}
              className="form-input text-center text-xl font-bold rounded-lg w-16 h-16 bg-gray-100 border-2 border-indigo-200"
              type="text"
              readOnly
            />
          ))}
        </div>
        <div className="py-5 text-center">
          <div className="flex flex-col items-center mb-4">
            <p className="text-xl font-semibold">
              Balance: <span className="text-green-500">${balance}</span>
            </p>
            <p className="text-xl font-semibold">
              Bet: <span className="text-red-500">${bet}</span>
            </p>
          </div>
          <input
            type="range"
            min="0"
            max={balance}
            value={bet}
            step={balance / 100}
            className="w-full mt-2"
            onChange={handleBetChange}
          />
        </div>
        <div className="flex flex-row justify-center items-center gap-3 text-center mb-4">
          <Button label="Roll" onClick={handleRoll} />
        </div>
        <div className="text-center text-lg font-medium">
          <p>{message}</p>
        </div>
      </div>
    </main>
  )
}
