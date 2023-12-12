import * as React from 'react'
import { bookMatchSchema } from '@/lib/validations/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { cn } from '@/lib/utils'
import { Input } from '../input'
import { buttonVariants } from '../button'
import { InputRadio } from '../radio-input'
import { toast } from 'sonner'
import { getBookMatches } from '@/api/apis'
import { IBookType } from '@/app/(home)/page'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  setBookMatches: (bookMatches: IBookType) => void
}

type FormData = z.infer<typeof bookMatchSchema>

export function BookMatchForm({
  className,
  setBookMatches,
  ...props
}: UserAuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(bookMatchSchema),
  })
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [isGitHubLoading] = React.useState<boolean>(false)
  const [selected, setSelected] = React.useState<string>('')

  async function onSubmit(data: FormData) {
    if (!selected) {
      toast('Please select a genre')
      return
    }
    setIsLoading(true) // Show loading state

    const response = await getBookMatches({
      hobby: data.hobby,
      genre: selected,
    })

    if (!response) return

    setBookMatches(response)

    setIsLoading(false)
  }

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(event.target.value)
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='grid gap-2 md:gap-6'>
          <div className='grid gap-1'>
            <label className='sr-only' htmlFor='email'>
              Hobby
            </label>
            <Input
              id='hobby'
              placeholder='What is your hobby?'
              type='text'
              autoCapitalize='none'
              autoComplete='off'
              autoCorrect='off'
              disabled={isLoading || isGitHubLoading}
              {...register('hobby')}
            />
            {errors?.hobby && (
              <p className='px-1 text-xs text-red-600'>
                {errors.hobby.message}
              </p>
            )}
          </div>

          <div>
            <p className='text-sm font-medium text-gray-900'>
              Whats your favourite movie genre?
            </p>

            <div className='flex flex-col gap-1 mt-2'>
              <InputRadio
                label='Drama'
                name='Drama'
                value='Drama'
                checked={selected === 'Drama'}
                onChange={handleRadioChange}
              />

              <InputRadio
                label='Adventure'
                name='Adventure'
                value='Adventure'
                checked={selected === 'Adventure'}
                onChange={handleRadioChange}
              />

              <InputRadio
                label='Sci-fi/Fantasy'
                name='SciFi'
                value='SciFi'
                checked={selected === 'SciFi'}
                onChange={handleRadioChange}
              />
              <InputRadio
                label='Comedy'
                name='Comedy'
                value='Comedy'
                checked={selected === 'Comedy'}
                onChange={handleRadioChange}
              />
            </div>
          </div>

          <button
            type='submit'
            className={cn(buttonVariants())}
            disabled={isLoading}
          >
            {isLoading ? 'Fetching book ...' : 'Get book'}
          </button>
        </div>
      </form>
    </div>
  )
}
