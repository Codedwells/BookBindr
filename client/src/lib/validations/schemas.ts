import * as z from 'zod'

export const bookMatchSchema = z.object({
  hobby: z.string(),
  favouriteFilm: z.string(),
})
