export interface TimeSlot {
  start_time: Date;
  end_time: Date;
}

export interface TimeSlotData {
  id: number;
  name: string;
  type: string;
  time_slots: TimeSlot[];
}

export interface DaysObject {
  [key: string]: string[];
}

export interface UseTimes {
  isLoading: boolean;
  error: Error | null;
  timeSlotsProcessed: TimeSlotCustomData[] | undefined;
  isFetched: boolean;
  daysAvailable: DaysObject;
}

export interface TimeSlotCustomData {
  slotUid: string;
  hourRange: string;
  dayOfTheWeek: string;
  company: string;
  status: SlotStatus;
}

export interface TimeSlotListProps {
  company: string;
  daysAvailable: string[];
  setTimeSlots: (slots: TimeSlotCustomData[]) => void;
  timeSlots: TimeSlotCustomData[];
  setSelected: (slot: Map<string, string>) => void;
  selected: Map<string, string>;
}

export type SlotStatus = "available" | "disabled" | "blocked" | "selected";
