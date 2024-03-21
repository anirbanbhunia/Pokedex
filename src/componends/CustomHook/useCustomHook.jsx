import { useState,useEffect } from "react"

function useCustomHook(url){
    const [allState , setAllState] = useState({
        isLoding: true,
        PokeDetails: [],
        pokeUrl: url,
        nxt: null,
        prev: null
    })

    async function fetchData(){
        try{
            setAllState((State) =>({...State,isLoding: true}))
            const data1 = await fetch(allState.pokeUrl)
            const res = await data1.json()
            //console.log(res)
            setAllState((State) =>({...State,nxt: res.next , prev: res.previous}))
            const pokeArr = res.results
            const pokeArr2 = pokeArr.map((p) => fetch(p.url))
            const pokeData = await Promise.all(pokeArr2)
            const pokeData2 = pokeData.map((p) => p.json())
            const finalData = await Promise.all(pokeData2)
            //console.log(finalData)
            const finalResult = finalData.map((p) =>{
                return {
                    name: p.name,
                    image: (p.sprites.other.dream_world.front_default) ? p.sprites.other.dream_world.front_default : (p.sprites.other.home.front_default)? p.sprites.other.home.front_default : p.sprites.front_shiny,
                    type: p.types,
                    id: p.id
                }
            })
            setAllState((State) => ({...State, PokeDetails: finalResult, isLoding: false}))
        }catch{
            console.log("handeled")//something went wrong
        }
    }
    useEffect(() => {
        fetchData()
        // eslint-disable-next-line
    },[allState.pokeUrl])
    return[allState,setAllState]
}
export default useCustomHook