const BASE_URL = 'https://swapi.dev/api/people/?page=';

const getUsers = async (page = 1) => {
  try {
    const result = await fetch(`${BASE_URL}${page}`);
    const data = await result.json();

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

class App {
  $parentList = null;
  $parentPaginate = null;

  constructor({ parentList, parentPaginate }) {
    // const _options = { ...optionsDefault, ...options };
    // const { parentList, parentPaginate } = _options;

    // const { parentList, parentPaginate } = options;

    if (!parentList) {
      return new Error('no parent!');
    }

    this.$parentList = parentList;
    this.$parentPaginate = parentPaginate;

    this.onInit();
  }

  _page = 1;
  get page() {
    return this._page;
  }
  set page(currentPage) {
    this._page = currentPage;

    const $activeItem = this.$parentPaginate.querySelectorAll('a');
    if ($activeItem.length) {
      $activeItem.forEach(($item, index) => {
        // $item.classList.remove('active');
        // if (index + 1 === currentPage) {
        //     $item.classList.add('active');
        // }
        $item.classList.toggle('active', index + 1 === currentPage);
      });
    }

    this.getPeople(currentPage);
  }

  _isLoading = true;
  get isLoading() {
    return this._isLoading;
  }
  set isLoading(value) {
    this._isLoading = value;

    // if (value) {
    //     document.querySelector('.spinner-border').classList.add('d-none');
    // } else {
    //     document.querySelector('.spinner-border').classList.remove('d-none');
    // }
    document
      .querySelector('.spinner-border')
      .classList.toggle('d-none', !value);
  }

  onInit() {}

  async getPeople(page) {
    this.isLoading = true;

    this.clearList();
    // const result = await fetch('https://swapi.dev/api/people/?page=' + page);
    // const data = await result.json();
    const data = await getUsers(page);
    this.renderList(data.results);
    this.isLoading = false;

    return data;
  }

  clearList() {
    this.$parentList.innerHTML = '';
  }

  renderList(list) {
    list.forEach((person) => {
      this.addPersonItem(person);
    });
  }

  addPersonItem(person) {
    // <li class="list-group-item"> Name </li>
    const $li = document.createElement('li');
    $li.className = 'list-group-item';
    $li.innerText = `${person['name']} (birth year: ${person['birth_year']})`;
    this.$parentList.appendChild($li);
  }

  renderPaginate(count) {
    const itemLength = Math.ceil(count / 10);

    for (let i = 1; i <= itemLength; i++) {
      // <li class="page-item"><a class="page-link" href="#">1</a></li>
      const $li = document.createElement('li');
      $li.className = 'page-item';
      const $a = document.createElement('a');
      $a.className = 'page-link';
      $a.href = '#';

      if (i === 1) {
        $a.className += ' active';
      }

      $a.innerText = i;
      $a.addEventListener('click', (event) => {
        this.page = i;
        event.preventDefault();
      });

      $li.appendChild($a);

      this.$parentPaginate.appendChild($li);
    }
  }
}

const app = new App({
  parentList: document.querySelector('#people_list'),
  parentPaginate: document.querySelector('.pagination'),
});

app.getPeople(1).then((res) => {
  app.renderPaginate(res.count);
});
