const searchInput = document.getElementById("searchInput")
const searchForm = document.getElementById("searchForm")
const imageResult = document.querySelector(".result-image")
const showMore = document.querySelector(".show-more")

const accessKey = "134VZxrnHlbPbH5eqnUvIZ7G_NjRhiYw4VzvriO_Abo"
let page = 1

const fetchData = async()=> {
    const url = `https://api.unsplash.com/search/collections?page=${page}&query=${searchInput.value}&client_id=${accessKey}`
    
    const response = await fetch(url)
    const data = await response.json()
    return data
}

const renderData = (data = [])=>{
    data.results.map(image =>{
        const img = document.createElement('img')
        img.src = image.cover_photo.urls.small

        const imgLink = document.createElement('a')
        imgLink.href = image.links.self

        imgLink.appendChild(img)

        imageResult.appendChild(imgLink)
    })
}

const handeShowMore = async() =>{
    ++page
    const response = await fetchData()

    renderData(response)
}


searchForm.addEventListener('submit', async(e)=>{
    e.preventDefault()

    page = 1

    const data = await fetchData()

    imageResult.innerHTML = ""

    renderData(data)

    showMore.classList.remove('hidden')
     
})

showMore.addEventListener("click", async()=>{
   
    handeShowMore()

})

window.addEventListener("scroll", async()=>{
    if((window.innerHeight + window.scrollY) >= document.body.offsetHeight){
        handeShowMore()
    }
}) 

