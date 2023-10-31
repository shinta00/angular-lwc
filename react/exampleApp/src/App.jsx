import { useState } from 'react'
import reactLogo from './assets/react.svg'
import salesforceLogo from './assets/salesforce.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <img src={salesforceLogo} className="logo" alt="Vite logo" />
        <img src={reactLogo} className="logo" alt="React logo" />
      </div>
      <h1>Salesforce + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <p className="read-the-docs">
        This is a React app to use in Salesforce
      </p>
    </>
  )
}

export default App
