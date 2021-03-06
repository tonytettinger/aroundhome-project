import classes from "./TimeSlotCards.module.css";
import useTimes from "../../hooks/useTimes";
import {useEffect, useState} from "react";
import TimeSlotsCompany from "../TimeSlotsCompany";

import {TimeSlotCustomData} from "../../models/Models";

const TimeSlotCards: React.FC = () => {
  const {isLoading, error, data, isFetched} =
      useTimes();

  const [selected, setSelected] = useState<Map<string, string>>(
      new Map<string, string>()
  );
  const [timeSlots, setTimeSlots] = useState<TimeSlotCustomData[]>([]);

  useEffect(() => {
    if (isFetched && data?.timeSlotsProcessed) {
      setTimeSlots(data.timeSlotsProcessed);
      const newMap = new Map(selected);
      Object.keys(data.daysAvailable).forEach((key: string) =>
          newMap.set(key, "Select")
      );
      setSelected(newMap);
    }
  }, [isFetched]);

  //todo: change to loader component
  if (isLoading || !data) return <div>Loading timeslot data</div>;
  //todo: update error handling to be more informative
  if (error) return <div>An error has occurred</div>;

  let companies = [];

  for (const [company, days] of Object.entries(data.daysAvailable)) {
    companies.push(
        <TimeSlotsCompany
            key={company}
            company={company}
            daysAvailable={days}
            selected={selected}
            setSelected={(slots: Map<string, string>) => setSelected(slots)}
            setTimeSlots={(slots: TimeSlotCustomData[]) => setTimeSlots(slots)}
            timeSlots={timeSlots}
        />
    );
  }

  return (
      <section className={classes.cards}>
        {companies.map((company) => company)}
      </section>
  );
};

export default TimeSlotCards;