import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

export const getFormattedDate = (time, view) => {
  return dayjs(time).format(view);
};

export const getFormattedDuration = (start, end) => {
  dayjs.extend(duration);
  let humanizer = ``;

  const ms = dayjs(end).diff(dayjs(start));

  const asDay = Math.floor(dayjs.duration(ms).asDays());
  const asHour = Math.floor((dayjs.duration(ms).asHours()) % 24);
  const asMinute = Math.floor((dayjs.duration(ms).asMinutes()) % 60);

  if (asDay) {
    humanizer += (asDay >= 10) ? `${asDay}D ` : `0${asDay}D `;
  }
  humanizer += (asHour >= 10) ? `${asHour}H ` : `0${asHour}H `;
  humanizer += (asMinute >= 10) ? `${asMinute}M ` : `0${asMinute}M`;

  return humanizer;
};
