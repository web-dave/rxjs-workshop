import { of, map, from } from 'rxjs';
import { cold } from 'jasmine-marbles';
import { eyeColor } from './eye-color.pipe';
import { timeDiff } from './time-diff.pipe';
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

const events: any[] = [
  {
    timeStamp: 100,
  },
  {
    timeStamp: 300,
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

// eye Color

describe('eyeColor', () => {
  it('should return eye_color or User', () => {
    const actual = of(mockData[2]).pipe(eyeColor());
    const expected = cold('(f|)', { f: 'Pink' });
    expect(actual).toBeObservable(expected);
  });
});

// TimeDiff

describe('TimeDiff', () => {
  it('should show TimeDiff', () => {
    const actual = from(events).pipe(timeDiff());
    const expected = cold('(t|)', { t: 200 });
    expect(actual).toBeObservable(expected);
  });
});
