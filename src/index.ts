import {} from 'rxjs';

const btn = document.querySelector('button');
const output: HTMLUListElement = document.querySelector('ul');

function print(text: string) {
  const li: HTMLLIElement = document.createElement('li');
  li.innerText = text;
  output.appendChild(li);
}

// coding start here
const myObservable = {
  observer: null,
  subscribe: function (obs) {
    myObservable.observer = obs;

    setInterval(() => {
      myObservable.observer.next('Hallo');
    }, 2000);
  },
};

myObservable.subscribe({
  next: (data) => console.log(data),
});
