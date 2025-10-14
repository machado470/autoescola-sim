declare module 'cors' {
  import type { RequestHandler } from 'express'

  const cors: (...args: unknown[]) => RequestHandler
  export default cors
}

declare module 'helmet' {
  import type { RequestHandler } from 'express'

  const helmet: (...args: unknown[]) => RequestHandler
  export default helmet
}
