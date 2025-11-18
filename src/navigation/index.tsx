import { createStaticNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BookingConfirmationScreen from "../features/appointments/screens/booking-confirmation-screen";
import BookAppointmentScreen from "@/features/appointments/screens/book-appointment-screen";

export type RootStackParamList = {
  BookAppointment: undefined;
  BookingConfirmation: undefined;
};

const RootStack = createNativeStackNavigator({
  screens: {
    BookAppointment: {
      screen: BookAppointmentScreen,
      options: {
        headerShown: false,
      },
    },
    BookingConfirmation: {
      screen: BookingConfirmationScreen,
      options: {
        title: "Booking Confirmation",
      },
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);
