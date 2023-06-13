import { of, map } from 'rxjs';
import { cold } from 'jasmine-marbles';
const mockData = [
  {
    id: 1,
    first_name: 'Arlina',
    last_name: 'Gorringe',
    email: 'agorringe0@globo.com',
    gender: 'Female',
    ip_address: '203.231.192.209',
    eye_color: 'Teal',
  },
  {
    id: 2,
    first_name: 'Anselma',
    last_name: 'Streatley',
    email: 'astreatley1@wired.com',
    gender: 'Female',
    ip_address: '0.250.236.108',
    eye_color: 'Indigo',
  },
  {
    id: 3,
    first_name: 'Munroe',
    last_name: 'Demkowicz',
    email: 'mdemkowicz2@surveymonkey.com',
    gender: 'Male',
    ip_address: '127.92.46.243',
    eye_color: 'Pink',
  },
  {
    id: 4,
    first_name: 'Jobey',
    last_name: 'Lorinez',
    email: 'jlorinez3@google.co.uk',
    gender: 'Female',
    ip_address: '224.197.194.3',
    eye_color: 'Violet',
  },
];

// Hint
describe('mapArrayMap', () => {
  it('should sort the numeric items of the array with predicate', () => {
    const actual = of([5, 4, 3, 2, 1]).pipe(map((data) => data.sort()));
    const expected = cold('(a|)', { a: [1, 2, 3, 4, 5] });
    expect(actual).toBeObservable(expected);
  });
});
