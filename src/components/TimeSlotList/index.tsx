import React from "react";
import classes from "./TimeSlotList.module.css";
import {
    SlotStatus,
    TimeSlotCustomData,
    TimeSlotListProps,
} from "../../models/Models";

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
        const slot = timeSlots.filter((obj) => {
            return obj.slotUid === id;
        })[0];

        const name = slot.company;
        const range = slot.hourRange;
        const day = slot.dayOfTheWeek;
        const status = slot.status;
        const selectedText = `${day}, ${range}`;
        const isSelected = status === "selected";
        const selectionBoxText = isSelected ? "Select" : selectedText;
        const updateSelected = new Map(selected);
        updateSelected.set(name!, selectionBoxText);
        setSelected(updateSelected);

        const clicked: SlotStatus = isSelected ? "available" : "selected";
        const toggledDisable: SlotStatus = isSelected ? "available" : "disabled";
        const toggledBlocked: SlotStatus = isSelected ? "available" : "blocked";

        const updatedSlots: TimeSlotCustomData[] = timeSlots.map(
            (slot: TimeSlotCustomData) => {
                //same company slots
                if (slot.company === name && slot.status !== "blocked") {
                    return id !== slot.slotUid
                        ? {...slot, status: toggledDisable}
                        : {...slot, status: clicked};
                    //other company slots on the same row
                } else if (slot.hourRange === range && slot.dayOfTheWeek === day) {
                    //if the company has not selected an appointment yet
                    if (selected.get(slot.company) === "Select") {
                        return slot.status !== "disabled"
                            ? {...slot, status: toggledBlocked}
                            : slot;
                        //if the company has an appointment selected
                    } else {
                        if (slot.status === "available") {
                            return {...slot, status: "blocked"};
                        } else if (slot.status === "blocked") {
                            return {...slot, status: "disabled"};
                        } else {
                            return {...slot, status: toggledBlocked};
                        }
                    }
                } else {
                    //other company slots on different rows
                    return slot.status === "selected" ||
                    slot.status === "blocked" ||
                    slot.status === "disabled"
                        ? slot
                        : {...slot, status: "available"};
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
                                        data-id={slot.slotUid}
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