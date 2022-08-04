const $ul = document.querySelector('#people_list');
const $spinner = document.querySelector('.spinner-border');
const $pageItem1 = document.querySelector('.page-item:nth-child(2)');
const $pageItem2 = document.querySelector('.page-item:nth-child(3)');
const $pageItem3 = document.querySelector('.page-item:nth-child(4)');
const $prev = document.querySelector('.page-item:first-child');
const $next = document.querySelector('.page-item:last-child');
const $li = document.getElementsByClassName('list-group-item');

const paginationNumbers = [$pageItem1, $pageItem2, $pageItem3];

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

const fetchPeople = (event) => {
  const pageNumber = event.target.text;
  const currentPeople = [...$li];
  paginationNumbers.forEach((element, index) => {
    if (index + 1 === +pageNumber) {
      element.classList.add('pointer-event', 'active');
      return;
    }
    element.classList.remove('pointer-event', 'active');
  });

  showLoading();

  if (currentPeople.length) {
    currentPeople.forEach((element) => {
      element.remove();
    });
  }

  axios.get(`https://swapi.dev/api/people/?page=${pageNumber}`).then((res) => {
    res.data.results.forEach((person) => {
      addPersonItem(person);
    });

    hideLoading();
  });
};

const showLoading = () => {
  $spinner.classList.remove('d-none');
  $spinner.classList.add('d-block');
};

const hideLoading = () => {
  $spinner.classList.remove('d-block');
  $spinner.classList.add('d-none');
};

paginationNumbers.forEach(pageItem => {
  pageItem.addEventListener('click', fetchPeople);
});
