export const tooltipMonths = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

export const axisMonths = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const randPoints = [{
  value: 36.6,
  date: new Date(2015, 0, 1),
}];
for (let ii = 1; ii < 364;) {
  randPoints.push({
    value: Math.random()*80,
    date: new Date(2015, 0, ii+1)
  });

  ii += (Math.random() + 1) * 5;
}

randPoints.push({
  value: Math.random()*80,
  date: new Date(2015,0, 365)
});


export const points = randPoints;
