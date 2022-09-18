const Lsi = {
  menu: {
    about: {
      en: "About",
      uk: "Про застосунок",
    },
    home: {
      en: "Home",
      uk: "Домашня",
    },
    admin: {
      en: "Admin",
      uk: "Адмінка",
    },
  },
  about: {
    header: {
      en: "uuPlaces",
    },
    creatorsHeader: {
      en: "Application creators",
      uk: "Творці застосунку",
    },
  },
  user: { en: "User", uk: "Користувач" },
  parkingPlace: { en: "Parking Place", uk: "Місце парковки" },
  reservationDates: { en: "Reservation Dates", uk: "Дати резерву" },
  reservationDuration: { en: "Reservation Duration", uk: "Тривалість резерву" },
  confirmDelete: {
    en: "Your reservation will be deleted.",
    uk: "Ваш резерв буде видалено.",
  },
  areYouSure: {
    en: "Are you sure?",
    uk: "Ви впевнені?",
  },
  days: {
    en: "${days} days",
    uk: "${days} днів",
  },

  create: { en: "Create", uk: "Створити" },
  update: { en: "Update", uk: "Оновити" },
  delete: { en: "Delete", uk: "Видалити" },
  cancel: { en: "Cancel", uk: "Відмінити" },
  createReservation: { en: "Create reservation", uk: "Створити резерв" },
  reservationUpdate: { en: "Reservation update", uk: "Оновити резерв" },
  reservationDelete: { en: "Reservation delete", uk: "Видалити резерв" },
  reservationDeleteConfirmation: {
    en: "Are you sure you want to delete this reservation?",
    uk: "Ви впевнені що хочете видалити цей резерв?",
  },
  successMessageCreated: {
    en: "Reservation successfully created",
    uk: "Резерв успішно створено",
  },
  successMessageUpdated: {
    en: "Reservation successfully updated",
    uk: "Резерв успішно оновлено",
  },
  successMessageDeleted: {
    en: "Reservation successfully deleted",
    uk: "Резерв успішно видалено",
  },
  reservations: { en: "Reservations", uk: "Резерви" },
  weeklyOverview: { en: "Weekly Overview", uk: "Тижневий огляд" },
  yourParkingPlace: { en: "Your parking place: ${number}", uk: "Ваше паркувальне місце: ${number}" },
  noReservation: { en: "Today you don't have reservations.", uk: "Сьогодні у вас немає резервів" },
  notOpened: { en: "Reservation will be opened on", uk: "Резервація буде відкрита" },
  sendNotification: { en: "Send notification", uk: "Відправити повідомлення про звільнене місце" },
  reservedBy: { en: "Reserved by: ", uk: "Зарезервовано: " },
  emptyPlace: { en: "Empty place", uk: "Вільне місце" },
  dayFrom: { en: "Day from", uk: "Початкова дата" },
  dayTo: { en: "Day to", uk: "Кінцева дата" },
  undergroundParkingLots: {
    en: "Underground parking lots",
    uk: "Підземні місця",
  },
  surfaceParkingLots: {
    en: "Surface parking lots",
    uk: "Надземні місця",
  },
  usersList: { en: "Users List", uk: "Список користувачів" },
  parkingPlaces: { en: "Parking Lots", uk: "Паркувальні місця" },
  settings: { en: "Settings", uk: "Налаштування" },
  successMessage: (prop) => {
    return { en: `Reservation successfully ${prop}` };
  },
};

export default Lsi;
