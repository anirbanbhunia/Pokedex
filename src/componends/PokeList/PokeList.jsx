import { MdCatchingPokemon } from "react-icons/md";
import Card from "../Card/Card"
import SearchBox from "../SearchBox/SearchBox";
import useCustomHook from "../CustomHook/useCustomHook";


function PokeList(){
    // const [isLoding,setIsLoding] = useState(true)
    // const [PokeDetails,setPokeDetails] = useState([])
    // const [pokeUrl,setPokeUrl] = useState("https://pokeapi.co/api/v2/pokemon/")
    // const [nxt,setNext] = useState(null)
    // const [prev,setPrev] = useState(null)

    //advance use state
    // const [allState , setAllState] = useState({
    //     isLoding: true,
    //     PokeDetails:[],
    //     pokeUrl:"https://pokeapi.co/api/v2/pokemon/",
    //     nxt: null,
    //     prev: null
    // })
    // async function fetchData(){
    //     try{
    //         //setIsLoding(true)
    //         setAllState((state) =>({...state,isLoding:true}))
    //         const data1 = await fetch(allState.pokeUrl)
    //         const res = await data1.json()
    //         //console.log(res)
    //         // setNext(res.next)
    //         // setPrev(res.previous)
    //         setAllState((st) =>({...st,nxt:res.next,prev:res.previous}))
    //         const pokeArr = res.results
    //         const pokeArr2 = pokeArr.map((p) => fetch(p.url))
    //         const pokeData = await Promise.all(pokeArr2)
    //         const pokeData2 = pokeData.map((p) => p.json())
    //         const finalData = await Promise.all(pokeData2)
    //         //console.log(finalData)
    //         const finalResult = finalData.map((p) =>{
    //             return {
    //                 name: p.name,
    //                 image: (p.sprites.other.dream_world.front_default) ? p.sprites.other.dream_world.front_default : (p.sprites.other.home.front_default)? p.sprites.other.home.front_default : p.sprites.front_shiny,
    //                 type: p.types,
    //                 id: p.id
    //             }
    //         })
    //         // setPokeDetails(finalResult)
    //         // setIsLoding(false)
    //         setAllState((state) => ({...state,PokeDetails:finalResult,isLoding:false}))
    //     }catch{
    //         console.log("handeled")//something went wrong
    //     }
    // }
    // useEffect(() => {
    //     fetchData()
    //     // eslint-disable-next-line
    // },[allState.pokeUrl])
    
    //use cutomhook
    const [allState,setAllState] = useCustomHook("https://pokeapi.co/api/v2/pokemon/")

    return(
        <div className="flex flex-col items-center">
            <SearchBox/>
            <div className="flex flex-col w-full items-center justify-center mt-8 mb-8">
                <div className="flex flex-wrap justify-around mx-4 sm:gap-x-3">
                    {allState.isLoding ?<div className="flex items-center gap-2">
                        <MdCatchingPokemon className="animate-spin font-thin text-2xl text-gray-400" />
                    <span className="text-lg text-gray-400">Loading....</span>
                    </div>
                    :allState.PokeDetails.map((e) => <Card name={e.name} image={e.image} key={e.id} type={e.type[0].type.name} id={e.id}/>)}
                </div>
                <div className="mt-12">
                    <button className={(allState.prev == null)?`bg-gray-300 border-gray-400 border text-gray-400 mr-2 px-6 py-1 font-serif tracking-[4px] rounded-md`:`bg-[#2980B9] mr-2 px-6 py-1 font-serif tracking-[4px] rounded-md text-orange-100  transition duration-100 hover:-translate-y-[2px] hover:shadow-lg active:border-2 active:border-[#2980B9] active:text-[#2980B9] active:bg-orange-100 active:shadow-inner active:shadow-gray-400`}
                    disabled={allState.prev == null}
                    onClick={() =>setAllState((st) =>({...st,pokeUrl:allState.prev}))}
                    >Prev</button>

                    <button className={(allState.nxt == null)?`bg-gray-300 border-gray-400 border text-gray-400 ml-2 px-6 py-1 font-serif tracking-[4px] rounded-md`:`bg-[#2980B9] ml-2 px-6 py-1 font-serif tracking-[4px] rounded-md text-orange-100  transition duration-100 hover:-translate-y-[2px] hover:shadow-lg active:border-2 active:border-[#2980B9] active:text-[#2980B9] active:bg-orange-100 active:shadow-inner active:shadow-gray-400`}
                    disabled={allState.nxt == null}
                    onClick={() =>setAllState((st) =>({...st,pokeUrl:allState.nxt}))}
                    >Next</button>
                </div>
            </div>
        </div>
    )
}
export default PokeList
