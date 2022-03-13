import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { getPosts } from "./store/posts"

function App() {
  const dispatch = useDispatch()
	const data = useSelector((store) => store)

	useEffect(() => {
		dispatch(getPosts())
	}, [])

	console.log(data)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
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
  );
}

export default App;
