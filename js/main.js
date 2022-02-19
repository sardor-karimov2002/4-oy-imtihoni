var userTemplate = document.querySelector('#user-template').content
var userItemElD=document.querySelector('#playlist-item-template')
var userList = document.querySelector('#user-list')
function renderUsers(users,node){
    node.innerHTML='';
    let userListFragment=document.createDocumentFragment()

    for(let i= 0; i<10; i++){
        let userItemEl=document.importNode(userTemplate,true)
        let temp=users.items[i].volumeInfo.title
        let img=users.items[i].volumeInfo.imageLinks.thumbnail
        let year=users.items[i].volumeInfo.publishedDate
        userItemEl.querySelector('.user-img').src= img
        userItemEl.querySelector('.user-title').textContent=temp
        userItemEl.querySelector('.user-id').textContent=year
        let sevimli=document.querySelector('#playlist')
        let bookmarkBtn=userItemEl.querySelector('.bookmark-btn')
        bookmarkBtn.addEventListener('click',event=>{
            bookmarkBtn.dataset=temp 

            console.log(temp)
            console.log(event.target.matches('.bookmark-btn'))
             
            sevimli.append(temp)
        })
            userListFragment.appendChild(userItemEl)
    }
    node.appendChild(userListFragment)
}

const API = 'https://www.googleapis.com/books/v1/volumes?q=search+'
function getUsers(page=10){
    return new Promise((resolve, reject) => {
        fetch(`${API}terns=${page}`)
        .then(res => res.json())
        .then(res => { 
            console.log(res)
            renderUsers(res, userList)
        })
        .catch(err => reject(err))
    })
}
getUsers().then((res) => {
    console.log(res)
    const users = res.data
    const pages_count = res.total_pages
    renderPagination(pages_count)
    renderUsers(users, userList)
    console.log(users)
 })
 .catch(err => {
     console.log(err)
 })
getUsers()

var pagination = document.querySelector('.pagination')
var paginateBtn = document.querySelector('#paginate-btn').content
var current = 1
function renderPagination(page_count){
    pagination.innerHTML = null
    let prevBtnEl = document.importNode(paginateBtn, true)
    let linkPrevEl = prevBtnEl.querySelector('.page-link')
    linkPrevEl.textContent = 'Prev'
    linkPrevEl.dataset.pageId =current == 1 ?  current : current -1;
    pagination.appendChild(prevBtnEl)

    for(let i =1; i <= page_count; i++ ){
        let paginateBtnEl = document.importNode(paginateBtn, true)
        let linkEl = paginateBtnEl.querySelector('.page-link')
        linkEl.textContent = i
        linkEl.dataset.pageId = i
        pagination.appendChild(paginateBtnEl)
    }

    let nextBtnEl = document.importNode(paginateBtn, true)
    let linkNextEl = nextBtnEl.querySelector('.page-link')
    linkNextEl.textContent = 'Next'
    linkNextEl.dataset.pageId =current == page_count ?  current :current+1;
    pagination.appendChild(nextBtnEl)
}

pagination.addEventListener('click', event => {
    const targetEl = event.target
    if(targetEl.dataset.task = 'pagination-btn'){
        current = targetEl.dataset.pageId

        getUsers(current).then((res) => {
            renderUsers(res.data, userList)
            renderPagination(res.total_pages)
        })
    }
})
