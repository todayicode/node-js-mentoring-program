import morgan from 'morgan';

morgan.token('date', function () {
  return new Date().toLocaleString('en-US', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });
});
morgan.token('level', function () {
  return 'INFO';
});
morgan.format('logs', '[ :date] :level :method :url - :response-time ms');

export default morgan('logs');
