import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { MdCatchingPokemon } from "react-icons/md"
import './PokemonDetails.css'

function PokemonDetails({pokeName}){
    const {id} = useParams()
    const [pokemon,setPokemon] = useState({})
    const[wrong,setWrong] = useState(false)
    const[isLoding,setIsLoading] = useState(true)
    async function downloadPokemon(){
        try{
            setIsLoading(true)
            let res
            let res2
            if(pokeName){
                res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeName}`)
                res2 = await res.json()
            }else{
                res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
                res2 = await res.json()
            }
            //console.log("res2 is:",res2)
            setPokemon({
                name: res2.name,
                height: res2.height,
                weight: res2.weight,
                image: (res2.sprites.other.dream_world.front_default) ? res2.sprites.other.dream_world.front_default : (res2.sprites.other.home.front_default)? res2.sprites.other.home.front_default : res2.sprites.front_shiny,
                types: res2.types.map((p) => p.type.name),
                id1: res2.id
            })
            setWrong(false)
            setIsLoading(false)
        }catch{
            setWrong(true)
            setIsLoading(false)
        }
    }
    useEffect(() =>{
        downloadPokemon()
        // eslint-disable-next-line
    },[])
    return(
        <div className="flex flex-col h-screen items-center w-full">
        {(!isLoding)?!wrong?
            <div className="flex flex-col mt-8 w-full items-end">
                <div className="w-[420px] p-2 bg-yellow-300 rounded-full transition duration-200 hover:shadow-lg hover:shadow-gray-500 hover:-translate-y-3 mr-[256px]">
                        <h1 className="text-center font-serif font-semibold text-red-800 text-3xl"># {pokemon.id1}</h1>
                </div>
                <div className="flex w-full justify-center gap-[100px] mt-4 mr-[60px]">
                    <div className="flex flex-col mt-20">
                        <div className="w-[380px] bg-gray-700 rounded-full transition duration-200 hover:shadow-lg hover:shadow-gray-400 text-center p-2">
                            {pokemon.types?<span className="tracking-[5px] font-serif font-semibold text-xl text-yellow-100">TYPE</span>:null}
                        </div>
                        <div className="max-w-[380px]">
                            <div className="flex justify-center gap-6">
                                {pokemon.types && pokemon.types.map((x) =>
                                <div className="min-w-[100px] bg-sky-600 text-center rounded-full mt-6 tracking-[8px] px-3 py-1 font-light text-red-100">
                                    <p key={x}>{x.toUpperCase()}</p>
                                </div>)} {/* if pokemon.types exist only that time it will render */}
                            </div>
                        </div>
                        <div className="flex mt-12 gap-8">
                            <div className="max-w-[250px] flex flex-col items-center">
                                <div className="w-[250px] bg-gray-700 rounded-full transition duration-200 hover:shadow-lg hover:shadow-gray-400 text-center p-2">
                                    <p className="tracking-[5px] font-serif font-semibold text-xl text-yellow-100">WEIGHT</p>
                                </div>
                                <div className="min-w-[100px] bg-sky-600 text-center rounded-full mt-6 tracking-[8px] px-3 py-1 font-light text-red-100">
                                    <p>{(pokemon.weight)/10} kg</p>
                                </div>
                            </div>
                            <div className="max-w-[250px] flex flex-col items-center">
                                <div className="w-[250px] bg-gray-700 rounded-full transition duration-200 hover:shadow-lg hover:shadow-gray-400 text-center p-2">
                                    <p className="tracking-[5px] font-serif font-semibold text-xl text-yellow-100">HEIGHT</p>
                                </div> 
                                <div className="min-w-[150px] bg-sky-600 text-center rounded-full mt-6 tracking-[8px] px-3 py-1 font-light text-red-100">
                                    <p>{(pokemon.height)/10} m</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-gray-400 rounded-lg w-[380px] h-[420px] flex justify-center items-center p-8 transition duration-200 hover:shadow-xl hover:shadow-gray-500 hover:bg-gray-300 hover:-translate-y-3">
                        <img id="pokeImg" src={pokemon.image} alt="" className=" min-w-[480px]
                         max-h-[480px]"/>
                    </div>
                </div>
                <div className="rounded-full transition duration-200 hover:shadow-lg hover:shadow-gray-500 mt-6 p-1 border-orange-600 border-4 mr-[256px]">
                    <div className="w-[405px] p-2 bg-yellow-300 rounded-full">
                        <p className="text-center mb-2 tracking-[8px] font-light text-red-800">{pokemon.name.toUpperCase()}</p>
                    </div>
                </div>
            </div>
            :
            <div className="flex flex-col h-screen items-center mt-24">
                <div>
                    <h3 className="font-semibold font-sans tracking-[8px] text-orange-700 text-2xl text-center">SORRY</h3>
                </div>
                <div className="flex relative right-3">
                    <h1 className="text-[100px] font-medium text-black/70">4</h1>
                    <MdCatchingPokemon id="logoPoke" className="text-[75px] animate-pulse text-red-400 mt-9"/>
                    <h1 className="text-[100px] font-medium text-black/70">4</h1>
                </div>
                <div className=" bg-transparent w-[200px] h-[2px] relative bottom-4 right-2 rounded-full border-none" id="shadow"></div>
                <div>
                    <p className="text-center mt-5 mb-2 tracking-[6px] font-medium relative right-1 text-orange-900">POKEMON &nbsp;NOT &nbsp;FOUND</p>
                </div>
            </div>
            :
            <div className="flex flex-col w-full items-center justify-center mt-8 mb-8">
                <div className="flex items-center gap-2">
                            <MdCatchingPokemon className="animate-spin font-thin text-2xl text-gray-400" />
                        <span className="text-lg text-gray-400">Loading....</span>
                </div>
            </div>
            }
        </div>
    )
}
export default PokemonDetails
