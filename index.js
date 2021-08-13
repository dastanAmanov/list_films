let elForm = MakeElem("#form");
let movieList = MakeElem("#list")
let movieGenre = MakeElem("#movie_genre")
let movieSearch = MakeElem("#movie_search")
let closee = MakeElem("#close")
let modDescrip = MakeElem(".modal_description")
let modTitle = MakeElem(".modal_title")


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

    let date = new Date(film.release_date)
        let year = date.getFullYear()
        let month = String(date.getMonth()).padStart(2, "0")
        let day = date.getDate()
        let releDate = (`${year}.${month}.${day}`)

    lineFront.style.width = (Math.ceil(film.raiting *100) / 10) + `%`


    
    
    newHeader.textContent = film.title
    newGenres.textContent = film.genres
    newTime.textContent = releDate
    newRaiting.textContent = `Raiting: ${film.raiting}/10`
    newOverview.textContent = film.overview
    openModal.textContent = "more..."
    openModal.dataset.uuid = film.id
    

    newLi.appendChild(newImg)
    newLi.appendChild(newHeader)
    newLi.appendChild(newTime)
    newLi.appendChild(newRaiting)
    lineBg.appendChild(lineFront)
    newLi.appendChild(lineBg)
    newLi.appendChild(openModal)
    newLi.appendChild(newGenres)
    movieList.appendChild(newLi)
    

        openModal.addEventListener("click", (e)=>{
            let filmId = e.target.dataset.uuid
            let x = arrFilm.find((e)=> filmId == e.id)
            modalimg.setAttribute("src", x.poster)
            modTitle.textContent = x.title
            modDescrip.textContent = x.overview
            modalraiting.textContent = `Raiting: ${x.raiting}/10`
            raitingline.style.width = (Math.ceil(x.raiting * 100) / 10)+`%`

            modal.classList.add("active") 
        });
        closee.addEventListener("click", (e)=>{
            modal.classList.remove("active") 
        });
        window.addEventListener("click", (e)=>{ 
            if(e.target == modal)
            modal.classList.remove("active")
        });
    });
    
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

