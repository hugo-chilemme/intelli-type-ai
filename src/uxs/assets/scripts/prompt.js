

const loader = `
	<div class="loader"></div>
`

document.addEventListener('DOMContentLoaded', function() {
	document.querySelector('input').focus();
	document.querySelector('input').value = '';

	ipcRenderer.on('typingData', (event, data) => {
		// Handle the typingData event here
		console.log(data);
		document.getElementById('input').value = data
	});


	document.querySelector('input').addEventListener('keypress', (e) => {
		if (e.key === 'Enter') {
			const inputValue = e.target.value;

			document.querySelector('.btn-sent').innerHTML = loader; // Display the loader

			document.querySelector('input').blur();
			document.querySelector('input').disabled = true;
			document.querySelector('input').style.cursor = 'not-allowed';

			ipcRenderer.send('sentResearch', inputValue);
		}
	});
});

