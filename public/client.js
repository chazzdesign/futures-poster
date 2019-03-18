let currentBackground = 0
let backgrounds = ['#1A8CDE', '#73D16F', '#F46F44']
let $future

const getTweet = (callback) => {
  var xhr = new XMLHttpRequest()

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      let response = JSON.parse(xhr.response)

      if (response && response.message) {
        if (callback) {
          callback()
        }
        $future.innerHTML = response.message
        console.log(response)
        document.getElementById("Tweet").innerHTML = "("+response.username+")"
      }
    } else {
      console.log('The request failed!')
    }
  }

  xhr.open('GET', '/api/future')
  xhr.send()
}

const changeText = () => {
  getTweet(() => {
    currentBackground = (currentBackground + 1) % (backgrounds.length)
    document.body.style.backgroundColor = backgrounds[currentBackground]
  })  
}

const onLoad = () => {
  $future = document.querySelector('[data-js="future"]')
  $future.onclick = changeText
  changeText()
}

window.onload = onLoad
