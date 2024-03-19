import { Link } from "react-router-dom"

function Card({name,image,type,id}){
    return(
    <Link to={`/pokemon/${id}`}>
        <div className="bg-gray-400 mt-8 rounded-lg hover:shadow-xl hover:shadow-gray-500 hover:bg-gray-300 max-w-[335px] flex flex-col justify-between transition duration-200 hover:-translate-y-3">
            <div className="p-4">
                <p className="text-center mb-2 tracking-[8px] font-light">{name.toUpperCase()}</p>
                <img src={image} alt="pokemons" className="h-[300px] w-[300px]"/>
            </div>
            <div className="p-4 bg-yellow-300 rounded-b-lg">
                <p className="font-serif tracking-[5px]">Type <span className="ml-10">{type.toUpperCase()}</span></p>
            </div>
        </div>
    </Link>
    )
}
export default Card