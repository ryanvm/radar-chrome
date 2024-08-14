document.addEventListener('DOMContentLoaded', function () {
    const radarSelect = document.getElementById('radar-select');
    const saveButton = document.getElementById('save-button');

    // Load the currently selected radar from storage
    chrome.storage.sync.get('selectedRadar', function (data) {
        if (data.selectedRadar) {
            radarSelect.value = data.selectedRadar;
        }
    });

    // Save the selected radar site
    saveButton.addEventListener('click', function () {
        const selectedRadar = radarSelect.value;
        chrome.storage.sync.set({ 'selectedRadar': selectedRadar }, function () {
            alert('Radar site saved!');
        });
    });
});
