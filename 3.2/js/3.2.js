const $ul = document.querySelector('#people_list');

const $spinner = document.querySelector('.spinner-border');

const addPersonItem = (person) => {
    // <li class="list-group-item"> Name </li>
    // const secondFilm = person?.['films']?.[1] ?? 'Unknown';
    const secondFilm = _.get(person, '["films"][1]', 'Unknown');
    const $li = document.createElement('li');
    $li.className = 'list-group-item';

    // name + '(birth year: ' + birthYear + ')';
    $li.innerText = `
        ${person['name']}
        (birth year: ${person['birth_year']})
        - second film: ${secondFilm}
    `;
    $ul.appendChild($li);
};

// fetch('https://swapi.dev/api/people/?page=3')
//     .then((response) => response.json()) // get json from response
//     .then((json) => {
//         json.results.forEach(person => {
//             addPersonItem(person);
//         });
//     }); // get data

// request.catch();
// request.finally();

const hideLoading = () => {
  $spinner.classList.add('d-none');
};

axios.get('https://swapi.dev/api/people/?page=3')
    .then((res) => {
        res.data.results.forEach(person => {
          addPersonItem(person);
        });
        hideLoading();
    });