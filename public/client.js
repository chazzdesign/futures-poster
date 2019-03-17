let $future

const request = () => {
var xhr = new XMLHttpRequest();

xhr.onload = function () {
	// Process our return data
	if (xhr.status >= 200 && xhr.status < 300) {
    let response = JSON.parse(xhr.response)
		$future.textContent = response.message
	} else {

		console.log('The request failed!');
	}

};


xhr.open('GET', '/api/future');
xhr.send();
}

const onLoad = () => {
 $future = document.querySelector('[data-js="future"]')
 request()  
}

window.onload = onLoad