document.addEventListener('DOMContentLoaded', function () {
    const radarImage = document.getElementById('radar-image');

    // Function to update the radar image
    function updateRadarImage(site) {
        const imageUrl = `https://radar.weather.gov/ridge/standard/${site}_loop.gif`;
        radarImage.src = imageUrl;
    }

    // Load the selected radar site from storage on initial load
    chrome.storage.sync.get('selectedRadar', function (data) {
        const site = data.selectedRadar || 'KCLX'; // Default to KCLX if no selection is made
        updateRadarImage(site);
    });

    // Listen for messages from the popup
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        if (request.action === 'updateRadar') {
            updateRadarImage(request.site);
        }
    });
});
