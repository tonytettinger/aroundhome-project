import {useQuery} from "react-query";
import {ApiRoutes} from "../config/apiRoutes";
import {
    DaysObject,
    ProcessedTimes,
    SlotStatus,
    TimeSlot,
    TimeSlotCustomData,
    TimeSlotData,
} from "../models/Models";

const transformData = (data: TimeSlotData[]) => {
    const daysAvailable: DaysObject = {};

    const timeSlotsProcessed: TimeSlotCustomData[] | undefined = data
        ?.map((data) => {
            const timeSlots = data.time_slots;
            const company = data.name;
            if (!daysAvailable.hasOwnProperty(company)) {
                daysAvailable[company] = [];
            }

            function getLang() {
                if (navigator.languages != undefined) return navigator.languages[0];
                return "en-US";
            }

            const lang = getLang();

            return timeSlots.map((timeSlot: TimeSlot) => {
                const dayOfTheWeek = new Date(timeSlot.start_time).toLocaleDateString(
                    lang,
                    {weekday: "long"}
                );
                if (!daysAvailable[company]?.includes(dayOfTheWeek)) {
                    daysAvailable[company].push(dayOfTheWeek);
                }
                const slotStart =
                    new Date(timeSlot.start_time).getHours().toString() + ":00";
                const slotEnd =
                    new Date(timeSlot.end_time).getHours().toString() + ":00";
                const hourRange = slotStart + "-" + slotEnd;
                const slotUid = `${dayOfTheWeek}-${hourRange}-${company}`
                    .replace(/\s+/g, "-")
                    .toLowerCase();
                const status: SlotStatus = "available";
                return {slotUid, hourRange, dayOfTheWeek, company, status};
            });
        })
        .flat();

    return {timeSlotsProcessed, daysAvailable};
};

const fetchTimes = async (): Promise<TimeSlotData[]> => {
    return await fetch(`${ApiRoutes.timeSlotsApi}`).then((res) => res.json())
}

const useTimes = () => {
    return useQuery<TimeSlotData[], Error, ProcessedTimes>(
        "timeSlotsData",
        fetchTimes,
        {select: transformData});
};

export default useTimes