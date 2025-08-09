const button = document.getElementById('submitBtn');
const transcriptionList = document.getElementById('transcriptionList');

  button.addEventListener('click', async () => {
    const urlInput = document.getElementById('audioUrl');
    const url = urlInput.value.trim();

    if (!url) {
      alert('Please enter a valid audio URL.');
      return;
    }

    const audioUrlPattern = /^(https?:\/\/[^\s]+)\.(mp3|wav|ogg)$/i;

    if (!audioUrlPattern.test(url)) {
    alert('Please enter a valid audio URL');
    return;
    }

    console.log('Submitting URL:', url);

    try {
      const res = await fetch('http://localhost:3000/transcription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ audioUrl: url })
      });

      const data = await res.json();

      if (res.ok) {
        alert('Submitted! ID: ' + data._id);
        loadTranscriptions();
        urlInput.value = '';
      } else {
        alert('Error: ' + (data.error || 'Something went wrong'));
      }

    } catch (err) {
      alert('Failed to send request: ' + err.message);
    }
  });


function renderTranscriptions(transcriptions) {
  transcriptionList.innerHTML = '';

  transcriptions.forEach(item => {
    const li = document.createElement('li');
    li.classList.add('list-group-item');
    li.innerHTML = `
      <strong>URL:</strong> ${item.audioUrl} &nbsp; | 
      <strong>Transcription:</strong> ${item.transcription} &nbsp; | 
      <strong>Created At:</strong> ${new Date(item.created_at).toLocaleString()}
    `;
    transcriptionList.appendChild(li);
  });
}

async function loadTranscriptions() {
  try {
    const res = await fetch('http://localhost:3000/transcriptions');
    const data = await res.json();
    renderTranscriptions(data);
  } catch (err) {
    console.log(err)
    alert('Error fetching transcriptions !..');
  }
}


document.addEventListener('DOMContentLoaded', loadTranscriptions);

