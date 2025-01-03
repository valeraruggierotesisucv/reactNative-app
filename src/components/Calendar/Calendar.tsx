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
import Switch from "../Switch/Switch";
import { formatHour } from "../../../utils/formatHour";

interface CalendarProps {
  initialDate?: Date;
  initialStartTime?: Date;
  initialEndTime?: Date;
  maxDate?: Date;
  onDateChange?: (date: Date | null) => void;
  onStartTimeChange?: (time: Date | null) => void;
  onEndTimeChange?: (time: Date | null) => void;
}

export function Calendar({
  initialDate,
  initialStartTime,
  initialEndTime,
  maxDate,
  onDateChange,
  onStartTimeChange,
  onEndTimeChange,
}: CalendarProps) {
  const [date, setDate] = useState<Date | null>(initialDate || null);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [selectedStartTime, setSelectedStartTime] = useState<Date | null>(
    initialStartTime || null
  );
  const [selectedEndTime, setSelectedEndTime] = useState<Date | null>(
    initialEndTime || null
  );
  const today = new Date();
  const nextYear = new Date().setFullYear(today.getFullYear() + 1);

  const toggleTimePicker = () => {
    setShowStartTimePicker(false);
    setShowEndTimePicker(false);
  };

  const confirmIOSTime = () => {
    if (showStartTimePicker && onStartTimeChange) {
      onStartTimeChange(selectedStartTime);
    }
    if (showEndTimePicker && onEndTimeChange) {
      onEndTimeChange(selectedEndTime);
    }
    if (onDateChange) {
      onDateChange(date);
    }
    toggleTimePicker();
  };

  return (
    <ScrollView>
      <CalendarPicker
        onDateChange={(date) => setDate(date)}
        selectedDayStyle={{
          backgroundColor: "#E0EFFF",
        }}
        weekdays={[]}
        selectedDayTextStyle={{
          color: "#2A90FF",
          fontFamily: "SF-Pro-Text-Bold",
        }}
        minDate={today}
        maxDate={maxDate || nextYear}
        textStyle={{ color: "black", fontFamily: "SF-Pro-Text-Regular" }}
      />
      <View style={styles.dateInputContainer}>
        <Input
          label="Empieza"
          placeholder={
            selectedStartTime ? formatHour(selectedStartTime) : "Hora de inicio"
          }
          variant={InputVariant.ARROW}
          onPress={() => setShowStartTimePicker(true)}
        />
        {showStartTimePicker && (
          <>
            <RNDateTimePicker
              value={selectedStartTime || new Date()}
              mode="time"
              display="spinner"
              onChange={(_, date) => {
                const selectedDate = date || null;
                setSelectedStartTime(selectedDate);
                if (Platform.OS !== "ios") {
                  setShowStartTimePicker(false);
                  if (onStartTimeChange) onStartTimeChange(selectedDate);
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
          label="Termina"
          placeholder={
            selectedEndTime ? formatHour(selectedEndTime) : "Hora de fin"
          }
          variant={InputVariant.ARROW}
          onPress={() => setShowEndTimePicker(true)}
        />
        {showEndTimePicker && (
          <>
            <RNDateTimePicker
              value={selectedEndTime || new Date()}
              mode="time"
              display="spinner"
              onChange={(_, date) => {
                const selectedDate = date || null;
                setSelectedEndTime(selectedDate);
                if (Platform.OS !== "ios") {
                  setShowEndTimePicker(false);
                  if (onEndTimeChange) onEndTimeChange(selectedDate);
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
