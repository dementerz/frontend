import './scss/custom-bootstrap.scss'

const allLinks = document.querySelectorAll('.navbar-nav>.nav-item>a')
const pageHref = window.location.href.split('/')[window.location.href.split('/').length - 1]

const activeOptionMenu = h => {
  allLinks.forEach(element => {
    element.href.split('/')[element.href.split('/').length - 1] === h ? element.classList.add('active') : element
  })
}

activeOptionMenu(pageHref)