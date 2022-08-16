import React,{useState,useEffect} from "react";
import axios from 'axios'
import "./style.css";

export default function App() {
  const[coinname,setCoinName]=useState([])
  const[searchterm,setSearchTerm]=useState('')
 
  useEffect(()=>{
    axios.get('https://api.coinstats.app/public/v1/coins?skip=0')
    .then(resp=> { setCoinName(resp.data.coins)
     console.log(coinname) })
  },[])
  return (
    <div className='divstyle'>
      <input placeholder="search.."onChange={(e)=>setSearchTerm(e.target.value)}/>
      <table > 
        <thead className='head'>
        <tr>
        <th>Coin</th>
        <th>Symbol</th>
        <th>Price</th>
        <th>Price Change(24h)</th>
        </tr> 
        </thead>
        
      {coinname && coinname.filter((coins)=>{
        if(searchterm==''){
          return coins
        } else if (coins.name.toLowerCase().includes(searchterm.toLowerCase())){
          return coins
        }
      }).map((coins,id)=>(
        <tbody>
            <tr key={id}>
         <td>{coins.name}</td>
        <td >{coins.symbol}</td>
        <td >$ {coins.price} </td> 
        <td style={{color: coins.priceChange1h > 0 ? 'green' : 'red' }} > {coins.priceChange1h}</td>
        </tr>
        </tbody>
        
  ))} 
  
  </table>
   </div>
  );
}
