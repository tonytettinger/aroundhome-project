import {useQuery} from "react-query";
import {ApiRoutes} from "../config/apiRoutes";
import {
    DaysObject,
    SlotStatus,
    TimeSlot,
    TimeSlotCustomData,
    TimeSlotData,
    UseTimes,
} from "../models/Models";

const useTimes = (): UseTimes => {
    const {isLoading, error, data, isFetched} = useQuery<TimeSlotData[], Error>(
        "timeSlotsData",
        () => fetch(`${ApiRoutes.timeSlotsApi}`).then((res) => res.json())
    );

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

            const slotIntervals = timeSlots.map((timeSlot: TimeSlot) => {
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

            return slotIntervals;
        })
        .flat();

    return {
        isLoading,
        error,
        timeSlotsProcessed,
        isFetched,
        daysAvailable,
    };
};

export default useTimes