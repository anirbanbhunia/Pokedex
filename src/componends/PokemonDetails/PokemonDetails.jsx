import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

function PokemonDetails({pokeName}){
    const {id} = useParams()
    const [pokemon,setPokemon] = useState({})
    async function downloadPokemon(){
        try{
            let res
            let res2
            if(pokeName){
                res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
                res2 = await res.json()
            }else{
                res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                res2 = await res.json()
            }
            //console.log(res2)
            setPokemon({
                name: res2.name,
                height: res2.height,
                weight: res2.weight,
                image: (res2.sprites.other.dream_world.front_default) ? res2.sprites.other.dream_world.front_default : (res2.sprites.other.home.front_default)? res2.sprites.other.home.front_default : res2.sprites.front_shiny,
                types: res2.types.map((p) => p.type.name)
            })
        }catch{
            console.log("wrong")
        }
    }
    useEffect(() =>{
        downloadPokemon()
        // eslint-disable-next-line
    },[])
    return(
        <div>
            <p>{pokemon.name}</p>
            <img src={pokemon.image} alt="pokemon"/>
            <div>
                {pokemon.types && pokemon.types.map((x) => <p key={x}>{x}</p>)} {/* if pokemon.types exist only that time it will render */}
            </div>
            <p>{pokemon.weight}</p>
            <p>{pokemon.height}</p>
        </div>
    )
}
export default PokemonDetails
