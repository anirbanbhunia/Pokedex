import { useEffect, useState } from "react"
import { MdCatchingPokemon } from "react-icons/md";
import Card from "../Card/Card"

function PokeList(){
    const [isLoding,setIsLoding] = useState(true)
    const [PokeDetails,setPokeDetails] = useState([])
    const [pokeUrl,setPokeUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
    const [nxt,setNext] = useState(null)
    const [prev,setPrev] = useState(null)
    async function fetchData(){
        try{
            setIsLoding(true)
            const data1 = await fetch(pokeUrl)
            const res = await data1.json()
            console.log(res)
            setNext(res.next)
            setPrev(res.previous)
            console.log(nxt)
            //setIsLoding(false)
            const pokeArr = res.results
            //console.log(pokeArr)
            const pokeArr2 = pokeArr.map((p) => fetch(p.url))
            //console.log(pokeArr2)
            const pokeData = await Promise.all(pokeArr2)
            const pokeData2 = pokeData.map((p) => p.json())
            const finalData = await Promise.all(pokeData2)
            console.log(finalData)//find name
            const finalResult = finalData.map((p) =>{
                return {
                    name: p.name,
                    image: (p.sprites.other.dream_world.front_default) ? p.sprites.other.dream_world.front_default : (p.sprites.other.home.front_default)? p.sprites.other.home.front_default : p.sprites.front_shiny,
                    type: p.types,
                    id: p.id
                }
            })
            //console.log(finalResult)
            setPokeDetails(finalResult)
            //console.log(PokeDetails)
            setIsLoding(false)
        }catch{
            console.log("handeled")//something went wrong
        }
    }
    useEffect(() => {
        fetchData()
    },[pokeUrl])
    return(
        <div className="flex flex-col w-full items-center justify-center mt-8 mb-8">
            <div className="flex flex-wrap justify-around mx-4 sm:gap-x-3">
                {isLoding ?<div className="flex items-center gap-2">
                    <MdCatchingPokemon className="animate-spin font-thin text-2xl text-gray-400" />
                <span className="text-lg text-gray-400">Loading....</span>
                </div>
                :PokeDetails.map((e) => <Card name={e.name} image={e.image} key={e.id} type={e.type[0].type.name}/>)}
            </div>
            <div className="mt-12">
                <button className={(prev == null)?`bg-gray-300 border-gray-400 border text-gray-400 mr-2 px-6 py-1 font-serif tracking-[4px] rounded-md`:`bg-[#2980B9] mr-2 px-6 py-1 font-serif tracking-[4px] rounded-md text-orange-100  transition duration-100 hover:-translate-y-[2px] hover:shadow-lg active:border-2 active:border-[#2980B9] active:text-[#2980B9] active:bg-orange-100 active:shadow-inner active:shadow-gray-400`}
                disabled={prev == null}
                onClick={() => setPokeUrl(prev)}
                >Prev</button>

                <button className={(nxt == null)?`bg-gray-300 border-gray-400 border text-gray-400 ml-2 px-6 py-1 font-serif tracking-[4px] rounded-md`:`bg-[#2980B9] ml-2 px-6 py-1 font-serif tracking-[4px] rounded-md text-orange-100  transition duration-100 hover:-translate-y-[2px] hover:shadow-lg active:border-2 active:border-[#2980B9] active:text-[#2980B9] active:bg-orange-100 active:shadow-inner active:shadow-gray-400`}
                disabled={nxt == null}
                onClick={() => setPokeUrl(nxt)}
                >Next</button>
            </div>
        </div>
    )
}
export default PokeList
//bg-slate-500 ml-2 px-6 py-1 font-serif tracking-[4px]