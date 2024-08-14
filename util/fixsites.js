const fs = require('fs');
const path = require('path');

// Define the path to the flat file
const filePath = path.join(__dirname, 'sites.txt');

function formatProperNoun(inputString) {
    // Split the string into an array of words
    const words = inputString.toLowerCase().split(' ');

    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // Join the words back into a single string
    return capitalizedWords.join(' ');
}


// Function to parse the file
function parseFlatFile(fileContent) {
    const lines = fileContent.split('\n');
    const result = lines.map(line => {
        vals = line.split(',');
        if (!vals || vals.length < 3) {
            console.log(`LINE`, line);
            return;
        }
        const site = vals[0].trim();
        const name = vals[1].trim();
        const state = vals[2].trim();
        return { Site: site, Name: `${state}, ${formatProperNoun(name)}` };
    });
    return result;
}

// Read the flat file
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // Parse the file content
    const parsedData = parseFlatFile(data);

    parsedData.sort((a,b) => a.Name.localeCompare(b.Name));

    // Output the JSON array
    //console.log(JSON.stringify(parsedData, null, 2));

    // Output HTML option values
    parsedData.forEach(v => {
        if (!v || !v.Site || !v.Name) {
            return;
        }
        console.log(`<option value="${v.Site}">${v.Name}</option>`);
    });
});
