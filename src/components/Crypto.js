import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Coins from './Coins';


function Crypto() {
  const [coins, setCoins] = useState([])
  const [search, setSearch] = useState('')
  useEffect(() => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=aud&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {
      console.log(res.data);
      setCoins(res.data);

    }).catch(error => alert('There is an error'));
  }, []);

  const handleChange = e => {
    setSearch(e.target.value)
  }

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
    )


  return (
    <div className='coin-app'>
      <div className="coin-search">
        <h1 className="coin-text">To the Moon 🚀</h1>
          <form>
            <input type="text" placeholder="Search"
             className="coin-input" onChange={handleChange}/>
          </form>
      </div>
      {filteredCoins.map(coin => {
        return <Coins 
        key={coin.id} 
        name={coin.name} 
        image={coin.image}
        symbol={coin.symbol}
        marketcap={coin.market_cap}
        price={coin.current_price}
        priceChange={coin.price_change_percentage_24h}
        volume={coin.total_volume}
        />;
        
      })}
    </div>
  );
}

export default Crypto;
