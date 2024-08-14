document.addEventListener('DOMContentLoaded', function () {
    const radarSelect = document.getElementById('radar-select');
    const saveButton = document.getElementById('save-button');

    // Load the currently selected radar from storage
    chrome.storage.sync.get('selectedRadar', function (data) {
        if (data.selectedRadar) {
            radarSelect.value = data.selectedRadar;
        }
    });

    // Save the selected radar site and notify the New Tab page
    saveButton.addEventListener('click', function () {
        const selectedRadar = radarSelect.value;
        chrome.storage.sync.set({ 'selectedRadar': selectedRadar }, function () {
            // Send a message to the New Tab page to update the radar image
            chrome.runtime.sendMessage({ action: 'updateRadar', site: selectedRadar });

            // Close the popup
            window.close();
        });
    });
});
