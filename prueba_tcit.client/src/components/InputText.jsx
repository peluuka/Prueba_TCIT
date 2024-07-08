import SearchIcon from "../SVGIcons/Search"
export default function InputText({ type = "text", placeholder, name, onChange, value }) {
    return type === "search" ? (
        <label className="input input-bordered flex items-center gap-2 my-3">
            <input type="text" className="grow" placeholder={placeholder} name={name} onChange={onChange} value={value} />
            <SearchIcon/>
        </label>
    ) : (
        <label className="input input-bordered flex items-center gap-2 my-3">
                <input type="text" className="grow gap-x-2" placeholder={placeholder} name={name} onChange={onChange} value={value} />
        </label>
    )
}