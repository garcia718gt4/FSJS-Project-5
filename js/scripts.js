// global variables
let employees = []; 
const urlAPI = 'https://randomuser.me/api/?results=12&inc=name, picture, email, location, phone, dob, &noinfo, &nat=US';
const gallery = document.getElementById('gallery');

const modal_container = document.querySelector('.modal-container');
const modal_close_btn = document.querySelector('.modal-close-btn');
const modal_info_container = document.querySelector('.modal-info-container');



// fetch data from the Random User Generator API
fetch(urlAPI)
    .then(res => res.json())
    .then(data => data.results)
    .then(displayEmployees)
    .catch(err => console.log(err))


/**
 * Render the employee info to the page
 * @param {JSON} employeeData - key info about each employee
 */ 
function displayEmployees(employeeData) {
    employees = employeeData; 
    
    // the employeeHTML will contain the markup for the employee elements
    let employeeHTML = '';

    // loop thru each employee and create HTML markup 
    employees.forEach((employee, index) => {
        let name = employee.name; 
        let email = employee.email; 
        let city = employee.location.city; 
        let state = employee.location.state; 
        let picture = employee.picture; 
    
        employeeHTML += `
            <div class='card' data-index='${index}'>
            <div class="card-img-container">
                <img class='card-img' src='${picture.large}' alt="profile picture">
            </div>
                <div class='card-info-container'>
                    <h3 id='name' class='card-name cap'>${name.first} ${name.last}</h3>
                    <p class='card-text'>${email}</p>
                    <p class='card-text cap'>${city}, ${state} </p>
                </div>
            </div>`
    });

    gallery.innerHTML = employeeHTML; 
}




/**
 * Renders the modal view 
 * @param {number}  index - current index in the array 
 */
function displayModal(index) {
    
    let {name, dob, phone, email, picture, location: {city, street, state, postcode} } =
    employees[index]; 

    let date = new Date(dob.date);
    
    const modalHTML = `
        <img class='modal-img' src='${picture.large}' alt='profile picture'>
        <div class='text-container'>
            <h3 id='name' class='modal-name'>${name.first} ${name.last}</h3>
            <p class='modal-text'>${email}</p>
            <p class='modal-text'>${phone}</p>
            <hr>
            <p class='modal-text cap'>${city}</p>
            <p class='modal-text'>${street.number} ${street.name}, ${state} ${postcode}</p>
            <p class='modal-text'>Birthday:
            ${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
        </div>`;
            modal_container.classList.remove('hidden');
            modal_info_container.innerHTML = modalHTML; 
}





/*
 *   Listens for a click in the gallery div
 *   (but only responds to clicks made on the card element) 
 *   and display the modal view 
*/
gallery.addEventListener('click', e => {
    // make sure the click was not on the grid container itself 
    if(e.target !==  gallery) {
        const card = e.target.closest('.card'); 
        const string = card.getAttribute('data-index'); 
        const num = parseInt(string);
        displayModal(num); 
    }
});




// Add the hidden class to the modal container
modal_close_btn.addEventListener('click', () => {
    modal_container.classList.add('hidden');
}); 



// Toggle previous
// const previous = document.getElementById('modal-prev');
// const next = document.getElementById('modal-next');
// const toggleContainer = document.querySelector('.modal-btn-container');


// toggleContainer.addEventListener('click', (e) => {
//     const toggle = e.target; 
//     if(toggle === previous) {
//        modal_info_container.insertAdjacentHTML('beforebegin', displayModal); 
//     } else if (toggle === next) {
//         modal_info_container.insertAdjacentHTML('afterend', displayModal); 
//     }
// });