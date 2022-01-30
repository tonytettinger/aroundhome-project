import React from "react";
import classes from "./TimeSlotList.module.css";
import {SlotStatus, TimeSlotCustomData, TimeSlotListProps} from "../../models/Models";

const TimeSlotList = ({
                          company,
                          daysAvailable,
                          setTimeSlots,
                          timeSlots,
                          setSelected,
                          selected,
                      }: TimeSlotListProps): JSX.Element => {
    const toggleSlot = (event: React.MouseEvent<HTMLButtonElement>) => {

        const id = event.currentTarget.getAttribute("data-id");
        const name = event.currentTarget.getAttribute("data-name");
        const range = event.currentTarget.getAttribute("data-range");
        const day = event.currentTarget.getAttribute("data-day");
        const status = event.currentTarget.getAttribute("data-status");

        let clicked: SlotStatus = "selected";
        let toggledDisable: SlotStatus = "disabled";
        let toggledBlocked: SlotStatus = "blocked";

        if (status === "blocked") return;

        if (status === "selected") {
            clicked = "available";
            toggledDisable = "available";
            toggledBlocked = "available";
            const updateSelected = new Map(selected);
            updateSelected.set(name!, "Select");
            setSelected(updateSelected);
        } else {
            const updateSelected = new Map(selected);
            const selectedText = `${day}, ${range}`;
            updateSelected.set(name!, selectedText);
            setSelected(updateSelected);
        }

        const updatedSlots: TimeSlotCustomData[] = timeSlots.map(
            (slot: TimeSlotCustomData) => {
                //same company slots
                if (slot.company === name) {
                    if (slot.status !== "blocked") {
                        return (id !== slot.slotUid) ? {...slot, status: toggledDisable} : {...slot, status: clicked}
                    } else {
                        return slot;
                    }
                //other company slots
                } else if (slot.hourRange === range && slot.dayOfTheWeek === day) {
                    //if the company has not selected an appointment yet
                    if(selected.get(slot.company) === "Select"){
                        return (slot.status !== "disabled") ? {...slot, status: toggledBlocked} : slot
                    //if the company has an appointment selected
                    } else {
                        if(slot.status === 'available') {
                            return {...slot, status: "blocked"};
                        } else if (slot.status === "blocked") {
                            return {...slot, status: "disabled"};
                        } else {
                            return {...slot, status: toggledBlocked}
                        }
                    }
                }  else {
                    return ( slot.status === "selected" || slot.status === "blocked" || slot.status === "disabled") ? slot : {...slot, status: "available"}
                }
            }
        );

        setTimeSlots(updatedSlots);
    };

    return (
        <div className={classes.week}>
            {daysAvailable.map((day: string) => {
                return (
                    <div key={`${day}-${company}`}>
                        <div className={classes.day}>{day}</div>
                        {timeSlots
                            .filter((slot: TimeSlotCustomData) => slot.company === company)
                            .filter((slot: TimeSlotCustomData) => slot.dayOfTheWeek === day)
                            .map((slot: TimeSlotCustomData) => {
                                return (
                                    <button
                                        disabled={
                                            slot.status === "disabled" || slot.status === "blocked"
                                        }
                                        className={`${classes[slot.status]}`}
                                        key={slot.slotUid}
                                        data-name={slot.company}
                                        data-range={slot.hourRange}
                                        data-id={slot.slotUid}
                                        data-day={slot.dayOfTheWeek}
                                        data-status={slot.status}
                                        onClick={toggleSlot}
                                    >
                                        {slot.status === "disabled"
                                            ? "One selection per company"
                                            : slot.status === "blocked"
                                                ? "Reserved for other company"
                                                : slot.hourRange}
                                    </button>
                                );
                            })}
                    </div>
                );
            })}
        </div>
    );
};

export default TimeSlotList