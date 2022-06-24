import React from 'react'
import CardPokemon from './CardPokemon'
import { useState, useEffect } from 'react'

const App = () => {


  const[allPokemons, setAllPokemons] = useState([])
  const[loadMore, setLoadMore] = useState('https://pokeapi.co/api/v2/pokemon?limit=151')
  const[infoPoke,setinfoPoke]=useState([])

   const getAllPokemons = async () => {
    const res = await fetch(loadMore)
    const data = await res.json()
    setLoadMore(data.next)

    function createPokemonObject(results)  {
      results.forEach( async pokemon => {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        const data =  await res.json()
        setAllPokemons( currentList => [...currentList, data])
        await allPokemons.sort((a, b) => a.id - b.id)
      })
    }
    createPokemonObject(data.results)
  }

  useEffect(() => {
    getAllPokemons()
   }, [])

   const handleClikPokemon = async ({target}) => {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${target.alt}`);
    setinfoPoke(await respuesta.json());
  };
  return (
    <div>
      <section>
          <h3>Bienvenido a la</h3>
            <div className='tit'>
            <h1 className='R'>P</h1>
            <h1 className='B'>o</h1>
            <h1 className='R'>k</h1>
            <h1 className='B'>e</h1>
            <h1 className='R'>d</h1>
            <h1 className='B'>e</h1>
            <h1 className='R'>x</h1>
          </div>
          <hr />
      </section>
      <section>
        <div className='Container'>
          <div className='row'>
            <div className='col'>
                <div onClick= {handleClikPokemon} className="all-container">
                  {allPokemons.map( (pokemonStats, index) => 
                    <CardPokemon
                      key={index}
                      id={pokemonStats.id}
                      image={pokemonStats.sprites.other.dream_world.front_default}
                      name={pokemonStats.name}
                    />)}
              </div>
            </div>
                {
                  infoPoke.name &&
                  <div className='col'>
                    <div className='inPo'>
                      {
                          <div>
                            <h3>{infoPoke.name.toUpperCase()}</h3>
                            <img src={infoPoke.sprites.other.dream_world.front_default} alt={infoPoke.name}/>
                            <p>TIPO:  {infoPoke.types[0].type.name.toUpperCase()}</p>
                            <div className='conteTip'>
                              <div>
                                <small>COMUN</small>
                                <div className='sprites'>
                                  <img src={infoPoke.sprites.front_default} alt="" />
                                  <img src={infoPoke.sprites.back_default} alt=""/>
                                </div>
                              </div>
                              <div>
                              <small>RARO</small>
                                <div className='sprites'>
                                  <img src={infoPoke.sprites.front_shiny} alt=""/>
                                  <img src={infoPoke.sprites.back_shiny} alt=""/>
                                </div>
                              </div>
                            </div>
                          </div>
                    }
                    </div>
                  </div>
                }
          </div>
        </div>
      </section>
      <button className="load-more" onClick={() => getAllPokemons()}>Mas Pokemons</button>
    </div>
  )
}

export default App