import "https://unpkg.com/navigo"  //Will create the global Navigo object used below
import "https://cdnjs.cloudflare.com/ajax/libs/dompurify/2.4.0/purify.min.js"

import {
  setActiveLink, renderHtml, loadHtml
} from "./utils.js"

import {initBooks} from "./pages/books/books.js"

window.addEventListener("load", async () => {

  const templateBooks = await loadHtml("./pages/books/books.html")
  const templateHome = await loadHtml("./pages/home/home.html")

  const router = new Navigo("/",{hash:true});
  window.router = router
  router
      .hooks({
        before(done, match) {
          setActiveLink("menu", match.url)
          done()
        }
      })
      .on({
        //For very simple "templates", you can just insert your HTML directly like below
        "/": () => renderHtml(templateHome, "content"),
        "/no-navigo": () => document.getElementById("content").innerHTML=`
           <h3>Handling navigation on the client, if you don't like navigo</h3>
           <br/
           <p>Goto this page (will take you out of the router) <a href="/indexNoNavigoDemo.html">Plain no Navigo example</a></p>
           `,
        "/books": (match) => {
          renderHtml(templateBooks, "content")
          initBooks(match)
        }
      })
      .notFound(() => document.getElementById("content").innerHTML ="<h2>404 - Page not found</h2>")
      .resolve()
});


window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
  alert('Error: ' + errorMsg + ' Script: ' + url + ' Line: ' + lineNumber
      + ' Column: ' + column + ' StackTrace: ' + errorObj);
}