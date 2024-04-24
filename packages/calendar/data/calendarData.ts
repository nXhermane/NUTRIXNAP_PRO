const daysOfWeek = [
  { name: "Lun" },
  { name: "Mar" },
  { name: "Mer" },
  { name: "Jeu" },
  { name: "Ven" },
  { name: "Sam" },
  { name: "Dim" }
];

const createWeek = (weekId, days) => ({
  weekId,
  days: days.map((day, index) => ({
    ...day,
    dayId: index,
    name: index + day.name,
    isActive: false,
    events: [{ eventId: "1", color: "blue" }]
  }))
});

const createMonth = (weeksCount, daysCount) =>
  Array.from({ length: weeksCount }, (_, weekIndex) =>
    createWeek(weekIndex, Array.from({ length: daysCount }, (_, dayIndex) => ({ name: dayIndex })))
  );

const month = createMonth(5, 31);
