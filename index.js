let elForm = MakeElem("#form");
let movieList = MakeElem("#list")
let movieGenre = MakeElem("#movie_genre")
let movieSearch = MakeElem("#movie_search")


function renderGenersSelect(films, element){
    const result = []

    films.forEach((film)=>{
        film.genres.forEach((genre)=>{
            if(!result.includes(genre)){
                result.push(genre)
            }
        })
    })

    result.forEach((genre)=>{
        const newOption= CreateDom("option")
        newOption.value = genre
        newOption.textContent = genre

        element.appendChild(newOption)
    })
}
renderGenersSelect(films, movieGenre)

function render(arrFilm, element){
    element.innerHTML = null;

    arrFilm.forEach((film, index)=> {
    let newLi = CreateDom("li")
    let newImg = CreateDom("img")
    let newHeader = CreateDom("h2")
    let newTime = CreateDom("time")
    let newRaiting = CreateDom("p")
    let lineBg = CreateDom("div")
    let lineFront = CreateDom("div")
    let newGenres = CreateDom("p")
    let newOverview = CreateDom("p") 
    let openModal = CreateDom("button")
    let modal = CreateDom("div") 
    
    newLi.setAttribute("class" , "movie__item")
    newImg.setAttribute("src", film.poster)
    newImg.setAttribute("width", "300px")
    newImg.setAttribute("height", "350px")
    newHeader.setAttribute("class", "title")
    newTime.setAttribute("class", "date")
    newRaiting.setAttribute("class", "raiting_title")
    lineBg.setAttribute("class", "line")
    lineFront.setAttribute("class", "underline")
    newGenres.setAttribute("class", "genres")
    newOverview.setAttribute("class", "subtitle")
    openModal.setAttribute("class", "open_modal")
    modal.setAttribute("class", "modal")

    let date = new Date(film.release_date)
        let year = date.getFullYear()
        let month = String(date.getMonth()).padStart(2, "0")
        let day = date.getDate()
        let releDate = (`${year}.${month}.${day}`)

    lineFront.style.width = (Math.ceil(film.raiting *100) / 10) + `%`


    openModal.addEventListener("click", ()=>{
        modal.style.display = "block"
        openModal.style.display = "none"
        newTime.style.display = "none"
        newRaiting.style.display = "none"
        lineBg.style.display = "none"
        newGenres.style.display = "none"
        newHeader.style.marginTop = "100px"

        })
    modal.addEventListener("click", ()=>{
        modal.style.display = "none"
        openModal.style.display = "inline"
        newTime.style.display = "inline"
        newRaiting.style.display = "block"
        lineBg.style.display = "block"
        newGenres.style.display = "block"
        newHeader.style.marginTop = "0"
    })


    newHeader.textContent = film.title
    newGenres.textContent = film.genres
    newTime.textContent = releDate
    newRaiting.textContent = `Raiting: ${film.raiting}/10`
    newOverview.textContent = film.overview
    openModal.innerHTML = "more..."
    

    newLi.appendChild(newImg)
    newLi.appendChild(newHeader)
    newLi.appendChild(newTime)
    newLi.appendChild(newRaiting)
    lineBg.appendChild(lineFront)
    newLi.appendChild(lineBg)
    newLi.appendChild(openModal)
    newLi.appendChild(modal)
    modal.appendChild(newOverview)
    newLi.appendChild(newGenres)
    movieList.appendChild(newLi)
    })
}
render(films, movieList)

elForm.addEventListener("submit", (e)=>{
    e.preventDefault()

    let selectGenres = movieGenre.value.trim()
    let searchFilm = movieSearch.value.trim()

    let regex = new RegExp(searchFilm, 'gi')
    let searchedFilms = films.filter((film)=>{
        return film.title.match(regex)
    })
    
    let foundFilms = [];

    if(selectGenres == "All"){
    foundFilms = searchedFilms
    }
    else{
        foundFilms = searchedFilms.filter((film) =>{
            return film.genres.includes(selectGenres)
        })
    }
    render(foundFilms, movieList) 
});

