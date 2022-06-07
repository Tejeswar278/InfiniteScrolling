import { useState,useEffect } from 'react'
import logo from './logo.svg'
import axios from "axios"
import './App.css'

function App() {
  let offset = 0;
  const [count, setCount] = useState([])

  const loadmoredata = () => {
    const newcount = [];
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`)
      .then(({data}) => {
        
        data.results.forEach((e) => newcount.push(e.name));
        setCount((count) => [...count, newcount])
      });
      offset += 10;
  }

  const handleScroll = (ele) => {
    // console.log(ele.target.documentElement.scrollTop)
    // console.log(ele.target.documentElement.scrollHeight)
    // if(window.innerHeight + ele.target.documentElement.scrollTop + 1 >= ele.target.documentElement.scrollHeight){
    //   loadmoredata();
    // }

    console.log(ele.target.documentElement.scrollTop);
    console.log(window.innerHeight);
    console.log(ele.target.documentElement.scrollHeight);
    // console.log(
    //   Math.ceil(e.target.documentElement.scrollTop + window.innerHeight)
    // );
    const scrollHeight = ele.target.documentElement.scrollHeight;
    const currentHeight = Math.ceil(
      ele.target.documentElement.scrollTop + window.innerHeight
    );
    if (currentHeight + 1 >= scrollHeight) {
      loadmoredata();
    }

  }

  useEffect(() => {
    loadmoredata();
    window.addEventListener("scroll", handleScroll)
  },[])
  

  

  return (
    <div className="App">
      {count.map((e,i) => {
        return <div key={i} className="container"><div>{i+1}.</div><div>{e}</div><br/></div>
      })}
    </div>
  )
}

export default App
