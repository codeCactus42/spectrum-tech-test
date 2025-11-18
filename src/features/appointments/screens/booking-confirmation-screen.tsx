import { Ionicons } from "@expo/vector-icons";
import { Button, Card } from "heroui-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import type { RootStackParamList } from "../../../navigation";

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function BookingConfirmationScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <View className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6">
        <View className="items-center pt-6 pb-6">
          <Ionicons name="checkmark-circle" size={120} color="#30DE7A" />
        </View>

        <Text className="font-sans-bold text-2xl text-[#192550] text-center pb-6">
          Booking confirmed!
        </Text>

        <View className="gap-4 pb-6">
          <Text className="text-base leading-[22px] text-[#1e1e22] text-center">
            You should soon receive an email confirming your booking, followed
            by a reminder email 1 hour before your appointment, sent to your
            registered email address.
            {"\n"}
            {"\n"}
            To attend or cancel your session, go to the booking area by tapping
            the calendar icon on the home view.
          </Text>
        </View>

        <Card className="bg-[#FFEF99] rounded-[20px] p-6 gap-2">
          <Card.Header className="p-0 flex-row gap-2">
            <Ionicons name="alert-circle" size={20} color="#594B00" />
            <Text className="text-base leading-[22px] font-bold text-[#594B00]">
              Important Note
            </Text>
          </Card.Header>

          <Card.Body className="p-0 gap-2 items-center">
            <Text className="text-base leading-6 text-[#1e1e22]">
              For both audio appointments and video appointments, you will need
              to return to the app to join your session at the scheduled time.
              {"\n"}
              {"\n"}
              Clinicians do not call users directly. Ensure you log in a few
              minutes before your appointment to avoid missing your session.
            </Text>
          </Card.Body>
        </Card>
      </ScrollView>

      <View className="bg-white/90 backdrop-blur-md px-6 pb-6 pt-4">
        <Button
          variant="primary"
          size="lg"
          className="rounded-[15px]"
          onPress={() => navigation.replace('BookAppointment')}
        >
          <Text className="text-base font-semibold text-white">
            Return to Home
          </Text>
        </Button>
      </View>
    </View>
  );
}
