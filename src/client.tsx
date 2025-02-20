import { hydrateRoot } from 'react-dom/client'
import { StartClient } from '@tanstack/start'

import { createRouter } from './router'

const router = createRouter({
  scrollRestoration: true,
})

hydrateRoot(document!, <StartClient router={router} />)
