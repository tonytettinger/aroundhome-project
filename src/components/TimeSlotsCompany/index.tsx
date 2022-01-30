import classes from "./TimeSlotsCompany.module.css";
import TimeSlotList from "../TimeSlotList";
import {TimeSlotCustomData, TimeSlotListProps} from "../../models/Models";

const TimeSlotsCompany = ({
                              company,
                              daysAvailable,
                              setTimeSlots,
                              timeSlots,
                              selected,
                              setSelected,
                          }: TimeSlotListProps): JSX.Element => {
    return (
        <div className={classes.card} key={company}>
            <h2 className={classes.company}>{company}</h2>
            <div className={classes.selected}>{selected.get(company)}</div>
            <TimeSlotList
                company={company}
                daysAvailable={daysAvailable}
                setTimeSlots={(slots: TimeSlotCustomData[]) => setTimeSlots(slots)}
                setSelected={(slot: Map<string, string>) => setSelected(slot)}
                timeSlots={timeSlots}
                selected={selected}
            />
        </div>
    );
};

export default TimeSlotsCompany