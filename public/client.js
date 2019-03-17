let currentBackground = 0
let backgrounds = ['#1A8CDE', '#73D16F', '#F46F44']
let $future

const request = () => {
  var xhr = new XMLHttpRequest()

  xhr.onload = function () {
    // Process our return data
    if (xhr.status >= 200 && xhr.status < 300) {
      let response = JSON.parse(xhr.response)
      $future.textContent = response.message
    } else {

      console.log('The request failed!')
    }

  }

  xhr.open('GET', '/api/future')
  xhr.send()
}

const changeText = () => {
  currentBackground = (currentBackground + 1) % (backgrounds.length - 1)
  document.body.style.backgroundColor = backgrounds[currentBackground]
  request()  
}

const onLoad = () => {
  $future = document.querySelector('[data-js="future"]')
  $future.onclick = changeText
  request()  
}

window.onload = onLoad
