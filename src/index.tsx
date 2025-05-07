import { createRoot } from 'react-dom/client'
import 'core-js'

import App from './App'
import './i18n'

createRoot(document.getElementById('root')!).render(<App />)
