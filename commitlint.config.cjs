module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // новые функции
        'fix',      // исправления багов
        'docs',     // документация
        'style',    // форматирование кода
        'refactor', // рефакторинг
        'perf',     // улучшения производительности
        'test',     // тесты
        'chore',    // задачи по обслуживанию
        'ci',       // CI/CD
        'build',    // сборка
        'revert'    // откат изменений
      ]
    ],
    'subject-case': [0], // разрешаем любые регистры в описании
    'subject-empty': [2, 'never'], // описание обязательно
    'subject-full-stop': [2, 'never', '.'], // не заканчивать точкой
    'header-max-length': [2, 'always', 72], // максимальная длина заголовка
    'body-max-line-length': [2, 'always', 100], // максимальная длина строки в теле
  }
};
