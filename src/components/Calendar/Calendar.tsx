import { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  Text,
} from "react-native";
import CalendarPicker from "react-native-calendar-picker";

import { Input, InputVariant } from "../Input/Input";
import RNDateTimePicker from "@react-native-community/datetimepicker";

interface CalendarProps {
  initialStartDate?: Date;
  initialEndDate?: Date;
  minDate?: Date;
  maxDate?: Date;
  onStartDateChange?: (date: Date | null) => void;
  onEndDateChange?: (date: Date | null) => void;
  onDateRangeChange?: (startDate: Date | null, endDate: Date | null) => void;
}

export function Calendar({
  initialStartDate,
  initialEndDate,
  minDate,
  maxDate,
  onStartDateChange,
  onEndDateChange,
  onDateRangeChange,
}: CalendarProps) {
  const [date, setDate] = useState<Date | null>(null);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(
    initialStartDate || null
  );
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(
    initialEndDate || null
  );
  const today = new Date();
  const nextYear = new Date().setFullYear(today.getFullYear() + 1);

  const toggleTimePicker = () => {
    setShowStartTimePicker(false);
    setShowEndTimePicker(false);
  };

  const confirmIOSTime = () => {
    if (showStartTimePicker && onStartDateChange) {
      onStartDateChange(selectedStartDate);
    }
    if (showEndTimePicker && onEndDateChange) {
      onEndDateChange(selectedEndDate);
    }
    if (onDateRangeChange) {
      onDateRangeChange(selectedStartDate, selectedEndDate);
    }
    toggleTimePicker();
  };

  return (
    <ScrollView>
      <CalendarPicker
        onDateChange={(date) => setDate(date)}
        allowRangeSelection
        selectedRangeStyle={{
          backgroundColor: "#E0EFFF",
        }}
        weekdays={[]}
        selectedDayTextStyle={{ color: "#2A90FF", fontWeight: "bold" }}
        minDate={minDate || today}
        maxDate={maxDate || nextYear}
        textStyle={{ color: "black" }}
      />
      <View style={styles.dateInputContainer}>
        <Input
          label="Start Date"
          placeholder="Start Date"
          variant={InputVariant.ARROW}
          onPress={() => setShowStartTimePicker(true)}
        />
        {showStartTimePicker && (
          <>
            <RNDateTimePicker
              value={selectedStartDate || new Date()}
              mode="time"
              display="spinner"
              onChange={(event, date) => {
                const selectedDate = date || null;
                setSelectedStartDate(selectedDate);
                if (Platform.OS !== "ios") {
                  setShowStartTimePicker(false);
                  if (onStartDateChange) onStartDateChange(selectedDate);
                  if (onDateRangeChange)
                    onDateRangeChange(selectedDate, selectedEndDate);
                }
              }}
            />
            {Platform.OS === "ios" && (
              <View style={styles.datepickerButtonsContainer}>
                <TouchableOpacity
                  style={styles.datepickerButtons}
                  onPress={toggleTimePicker}
                >
                  <Text>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.datepickerButtons}
                  onPress={confirmIOSTime}
                >
                  <Text>Confirmar</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
        <Input
          label="End Date"
          placeholder="End Date"
          variant={InputVariant.ARROW}
          onPress={() => setShowEndTimePicker(true)}
        />
        {showEndTimePicker && (
          <>
            <RNDateTimePicker
              value={selectedEndDate || new Date()}
              mode="time"
              display="spinner"
              onChange={(event, date) => {
                const selectedDate = date || null;
                setSelectedEndDate(selectedDate);
                if (Platform.OS !== "ios") {
                  setShowEndTimePicker(false);
                  if (onEndDateChange) onEndDateChange(selectedDate);
                  if (onDateRangeChange)
                    onDateRangeChange(selectedStartDate, selectedDate);
                }
              }}
            />
            {Platform.OS === "ios" && (
              <View style={styles.datepickerButtonsContainer}>
                <TouchableOpacity
                  style={styles.datepickerButtons}
                  onPress={toggleTimePicker}
                >
                  <Text>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.datepickerButtons}
                  onPress={confirmIOSTime}
                >
                  <Text>Confirmar</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dateInputContainer: {
    flex: 1,
    marginTop: 20,
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  datepickerButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  datepickerButtons: {
    backgroundColor: "#11182711",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
});
