const SearchBar = ({onSubmit}) => {
    return (
        <header className="searchbar">
            <form className="form">
                <button type="submit" className="button" onClick={onSubmit}>
                    <span className="button-label">Search</span>
                </button>

                <input
                    className="input"
                    type="text"
                    autocomplete="off"
                    autofocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    )
}

export default SearchBar;