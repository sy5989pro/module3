// HOMEWORK#11
// 1) создать функцию-конструктор, которая создает объект со своим набором прототипов
// 2) сделать, чтобы в объекте были поля, которые нельзя менять или удалять
// 3) переписать предыдущее задание на класс

// 1
function Student(name, surname, email, yearOfBirth) {
  this.name = name;
  this.surname = surname;
  this.email = email;
  this.yearOfBirth = yearOfBirth;
}

Student.prototype.getFullName = function() {
  return `${this.name} ${this.surname}`;
}

Student.prototype.calcAge = function() {
  let date = new Date();
  return date.getFullYear() - this.yearOfBirth;
}

const student1 = new Student('Serhii', 'Y', 'sy5989pro@gmail.com', 1989);
console.log(student1);
console.log(student1.getFullName());
console.log(student1.calcAge());


// 2
Object.defineProperty(student1, 'name', { value: 'Serhii', writable: false, configurable: false });
Object.defineProperty(student1, 'surname', { value: 'Y', writable: false, configurable: false });

student1.name = 'Ivan';
delete student1.surname;
console.log(student1);


// 3 - the same but through JS Classes
class Student {
  constructor(name, surname, email, yearOfBirth) {
    this.name = name;
    this.surname = surname;
    this.email = email;
    this.yearOfBirth = yearOfBirth;
  }
  getFullName() {
    return `${this.name} ${this.surname}`;
  }
  calcAge() {
    let date = new Date();
    return date.getFullYear() - this.yearOfBirth;
  }
}

const student1 = new Student('Serhii', 'Y', 'sy5989pro@gmail.com', 1989);
console.log(student1);
console.log(student1.getFullName());
console.log(student1.calcAge());

Object.defineProperty(student1, 'name', { value: 'Serhii', writable: false, configurable: false });
Object.defineProperty(student1, 'surname', { value: 'Y', writable: false, configurable: false });

student1.name = 'Ivan';
delete student1.surname;
console.log(student1);