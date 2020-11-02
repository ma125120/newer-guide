import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import { NewerGuide } from './newerGuide'

function App() {
  const [guide, setGuide] = useState(null)
  const [count, setCount] = useState(0)
  useEffect(() => {
    const _guide = new NewerGuide({ selector: '.App-header', elList: ['.App-logo', '.sd'] })
    setGuide(_guide)
    _guide.step()
  }, [])

  const step = () => guide.step()

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button onClick={() => {setCount(count => count + 1); }}>count is: {count}</button>
        </p>
        <p className="sd">
          Edit <code>App.jsx</code> and save to test HMR updates.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
