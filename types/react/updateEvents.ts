export const HandledEvents = {
  updateStart: "Начало обновления",
  updateError: "Ошибка обновления",
  downloadBundle: "Загрузка файлов",
  bundleExtract: "Распаковка архива",
  bundleRemove: "Удаление мусора",
  updateDependencies: "Обновление зависимостей",
  settingsCreate: "Создание файла настроек",
  updateSuccess: "Обновление прошло успешно",
};

export type HandledEventsKeys = keyof typeof HandledEvents;
