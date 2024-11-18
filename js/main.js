//  elements
var siteName = document.getElementById('siteName');
var siteURL = document.getElementById('siteURL');
var nameMessage = document.getElementById('nameMessage');
var urlMessage = document.getElementById('urlMessage');
var site = [];

// Regular expressions for input validation
var nameRegex = /^[a-zA-Z0-9\s\-_]{3,10}$/;
var urlRegex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+)\.[a-z]{2,}(\.[a-z]{2,})?(\/\S*)?$/;

// Check for stored data
if (localStorage.getItem('allsite') != null) {
    site = JSON.parse(localStorage.getItem('allsite'));
    displaySite();
}

// Add event listeners
siteName.addEventListener('input', validateName);
siteURL.addEventListener('input', validateURL);

// Function to validate the site name
function validateName() {
    if (nameRegex.test(siteName.value.trim())) {
        siteName.classList.remove('is-invalid');
        siteName.classList.add('is-valid');
        nameMessage.style.display = 'none';
    } else {
        siteName.classList.remove('is-valid');
        siteName.classList.add('is-invalid');
        nameMessage.style.display = 'block';
    }
}

// Function to validate the site URL
function validateURL() {
    var urlValue = siteURL.value.trim();
    
    if (!urlValue.startsWith('http://') && !urlValue.startsWith('https://')) {
        urlValue = 'http://' + urlValue;
        siteURL.value = urlValue;
    }

    if (urlRegex.test(urlValue)) {
        siteURL.classList.remove('is-invalid');
        siteURL.classList.add('is-valid');
        urlMessage.style.display = 'none';
    } else {
        siteURL.classList.remove('is-valid');
        siteURL.classList.add('is-invalid');
        urlMessage.style.display = 'block';
    }
}

// Function to add a bookmark
function addBookmark() {
    if (!nameRegex.test(siteName.value.trim()) || !urlRegex.test(siteURL.value.trim())) {
        validateName();
        validateURL();
        return;
    }

    var Bookmark = {
        siteName: siteName.value.trim(),
        siteURL: siteURL.value.trim()
    };

    site.unshift(Bookmark);
    localStorage.setItem('allsite', JSON.stringify(site));

    clearForm();
    displaySite();
} 
// Function to clear the form
function clearForm() {
    siteName.value = '';
    siteURL.value = '';
    siteName.classList.remove('is-valid');
    siteURL.classList.remove('is-valid');
    nameMessage.style.display = 'none';
    urlMessage.style.display = 'none';
}


// Function to delete a bookmark
function deleteSite(index) {
    site.splice(index, 1);
    localStorage.setItem('allsite', JSON.stringify(site));
    displaySite();
}

// Function to display bookmarks
function displaySite() {
    var cartona = '';
    for (var i = 0; i < site.length; i++) {
        cartona += `
            <tr>
              <td>${i + 1}</td>
              <td>${site[i].siteName}</td>
              <td>
                <a href="${site[i].siteURL}" target="_blank" class="btn btn-success px-2">
                    <i class="fa-solid fa-external-link pe-2"></i> Visit
                </a>
              </td>
              <td>
                <button onclick="deleteSite(${i})" class="btn btn-danger px-2">
                  <i class="fa-solid fa-trash"></i> Remove
                </button>
              </td>
            </tr>
        `;
    }
    document.getElementById('bookmarkList').innerHTML = cartona;
}
