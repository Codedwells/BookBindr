'use client'

import { useState } from 'react'
import { BookMatchForm } from '@/components/forms/book-match'

export interface IBookType {
  title: string
  link: string
}

export default function Home() {
  const [bookMatches, setBookMatches] = useState<IBookType[]>([])

  function handleSetBooks(bookMatches: any) {
    setBookMatches(bookMatches)
  }
  return (
    <main className='min-h-screen pt-12 max-w-screen'>

      <div className='lg:px-64 mx-4'>
        <h1 className='scroll-m-20 text-4xl text-center font-extrabold tracking-tight lg:text-4xl'>
          Where Personality Meets Pages.
        </h1>

        <p className='scroll-m-20 mt-4 text-center text-gray-500 mx-auto max-w-md'>
          Get a book that matches your personality because your reading
          experience should be as unique as you are.
        </p>

        <BookMatchForm
          setBookMatches={handleSetBooks}
          className='max-w-md mt-12 mx-auto'
        />

        {bookMatches.length > 0 && (
          <div className='mt-12 max-w-md mx-auto'>
            <p className='text-sm font-medium'>
              Here are some of our favourite books:
            </p>

            <ul className='mt-2 p-2 border rounded-md bg-white max-h-[200px] overflow-y-auto'>
              {bookMatches.map((book) => {
                return (
                  <li key={book.title} className='mt-1'>
                    <a
                      href={book.link}
                      target='_blank'
                      className='text-sm hover:underline cursor-pointer'
                    >
                      - {book.title}
                    </a>
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </main>
  )
}
