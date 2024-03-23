import useDebouncing from "../CustomHook/useDebouncing"

export default function SearchBox({update}){

    const debounce = useDebouncing((e) => update(e.target.value.toLowerCase()))

    return(
        <div>
            <input
                type="text" placeholder="pokemon name...."
                className="mt-8 w-[350px] p-2 outline-none border-gray-400 border-2 sm:w-[500px] sm:p-3 sm:mt-10 rounded-[4px]"
                onChange={debounce}
            />
        </div>
    )
}
