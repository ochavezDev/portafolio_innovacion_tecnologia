import { MemoryRouter } from 'react-router'
import App from './App.jsx'

export default function AppSSR({ entry = '/', state = {} }) {
  return (
    <MemoryRouter initialEntries={[entry]} initialState={state}>
      <App />
    </MemoryRouter>
  )
}