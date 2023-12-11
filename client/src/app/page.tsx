import { BookMatchForm } from '@/components/forms/book-match'
import NavBar from '@/components/navbar'

const BOOKS = [
  {
    name: 'The Hobbit',
    link: 'https://www.goodreads.com/book/show/5907.The_Hobbit',
  },
  {
    name: 'The Lord of the Rings',
    link: 'https://www.goodreads.com/book/show/33.The_Lord_of_the_Rings',
  },
  {
    name: 'The Chronicles of Narnia',
    link: 'https://www.goodreads.com/book/show/11127.The_Chronicles_of_Narnia',
  },
  {
    name: "The Hitchhiker's Guide to the Galaxy",
    link: 'https://www.goodreads.com/book/show/11.The_Hitchhiker_s_Guide_to_the_Galaxy',
  },
]

export default function Home() {
  return (
    <main className='min-h-screen max-w-screen bg-slate-50'>
      <NavBar />

      <div className='lg:px-64 mt-12 mx-4'>
        <h1 className='scroll-m-20 text-4xl text-center font-extrabold tracking-tight lg:text-4xl'>
          Where Personality Meets Pages.
        </h1>

        <p className='scroll-m-20 mt-4 text-center text-gray-500 mx-auto max-w-md'>
          Get a book that matches your personality because your reading
          experience should be as unique as you are.
        </p>

        <BookMatchForm className='max-w-md mt-12 mx-auto' />

        <div className='mt-12 max-w-md mx-auto'>
          <p className='text-sm font-medium'>Here are some of our favourite books:</p>

          <ul className='mt-2 p-2 border rounded-md bg-white max-h-[200px] overflow-y-auto'>
            {BOOKS.map((book) => {
              return (
                <li key={book.name} className='mt-1'>
                  <a  href={book.link} target='_blank' className='text-sm hover:underline cursor-pointer'>- {book.name}</a>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </main>
  )
}
