import "./searchByTitle.css"
export default function SearchByTitle({ title, updateTitle, searchByTitle }){
    return(
        <form className="search-by-title-container">
            <input type="text" placeholder="Search By Title..." value={title} onChange={updateTitle}/>
            <button type="button" onClick={searchByTitle}>Search</button>
        </form>
    )
}