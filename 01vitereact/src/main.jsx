import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Krish from './krish.jsx'


const owner = "Krishna Walia"
const ReactElement = 
    <a href="https://reactjs.org/docs/introducing-jsx.html" target="_blank" rel="noopener noreferrer">Visit React documentation</a>


const newElement = React.createElement(
    'a',
    {href: 'https://google.com',
        target: '_blank'
    },
    'Click to visit google',
    owner
)

createRoot(document.getElementById('root')).render(

    <>
    {newElement}
    <br></br>
    {ReactElement}
    <App />
    <Krish></Krish>
    </>
)
