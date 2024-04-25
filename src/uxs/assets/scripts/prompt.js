

const loader = `
	<div class="loader"></div>
`


let isReadySent = false
document.addEventListener('DOMContentLoaded', function() {
	document.querySelector('input').value = '';

	ipcRenderer.on('typingData', (event, data) => {
		// Handle the typingData event here
		console.log(data);
		document.getElementById('input').value = data
	});

	function handleSubmit(inputValue) {

		if (isReadySent) return;

		if (!inputValue || inputValue.length === 0)
		{
			return;
		}


		document.querySelectorAll('.suggestion').forEach(element => {
			element.style.display = 'none';
		});

		isReadySent = true;
		document.querySelector('.btn-sent').innerHTML = loader; // Display the loader

		document.querySelector('input').blur();
		document.querySelector('input').disabled = true;
		document.querySelector('input').style.cursor = 'not-allowed';

		addConversation(inputValue, 'user');
		ipcRenderer.send('sentResearch', inputValue);
	}


	document.querySelector('input').addEventListener('keypress', (e) => {
		if (e.key === 'Enter' && !e.shiftKey) {
			const inputValue = e.target.value;

			handleSubmit(inputValue);
		} else if (e.key === 'Escape') {
			ipcRenderer.send('close-prompt');
		} else if (e.shiftKey && e.key === 'Enter') {
			e.preventDefault();
			document.querySelector('input').value += '\n';
		}
	});


	document.querySelectorAll('.suggestion').forEach(element => {
		element.addEventListener('click', (e) => {

			if (isReadySent) return;
			const suggestion = element.querySelector('p').innerText;
			document.querySelector('input').value = suggestion;
			handleSubmit(suggestion);
		});
	});
});

