document.addEventListener('DOMContentLoaded', function () {
    const radarImage = document.getElementById('radar-image');

    // Load the selected radar site from storage
    chrome.storage.sync.get('selectedRadar', function (data) {
        const site = data.selectedRadar || 'KCLX'; // Default to KCLX if no selection is made
        const imageUrl = `https://radar.weather.gov/ridge/standard/${site}_loop.gif`;

        // Set the radar image source
        radarImage.src = imageUrl;
    });

});
