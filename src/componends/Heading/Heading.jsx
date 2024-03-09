import SearchBox from "../SearchBox/SearchBox"
import { MdCatchingPokemon } from "react-icons/md"
import './Headline.css'

function Heading(){
    return(
        <div className="flex flex-col items-center">
            <h1 className="text-4xl mt-5 sm:text-5xl flex items-end justify-center font-extrabold font-serif text-yellow-400" id="headLine"><span className="mr-1">P</span><MdCatchingPokemon className="mr-2 text-[34px] sm:text-[40px] animate-bounce text-red-600"/><span className="tracking-[8px]">kedex</span></h1>
            <SearchBox/>
        </div>
    )
}
export default Heading
//text 5xl text-[40px]