//Extracting JSON information for the IDs.
export function fetchIds(callback){    
    fetch('ids.json')
    .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
    })
    .then(select => {
    //Gets the JSON info.
    const select_start = select.id;
    callback(select_start);
    })
    .catch(error => {
    console.error('There has been a problem with your fetch operation:', error);
    });
}

export function sortAndDisplayRows(rowsArray, filter_label, sortAscending) {
    // Sort rowsArray based on the text content at the specified child node index
    rowsArray.sort((a, b) => {
        let idA = a.firstChild.firstChild.childNodes[filter_label].innerText.toUpperCase(); // Ensure case-insensitive comparison
        let idB = b.firstChild.firstChild.childNodes[filter_label].innerText.toUpperCase();
        return sortAscending ? idA.localeCompare(idB) : idB.localeCompare(idA);
    });

    // Clear the container
    const container = $('#list-container');
    container.empty();

    // Re-append rows in sorted order
    rowsArray.forEach(row => {
        container.append(row);
    });
}