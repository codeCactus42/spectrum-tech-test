https://github.com/user-attachments/assets/54ca0d76-279c-4074-9e50-1d8be99a2440

# Spectrum Tech Test

A React Native appointment booking application featuring a polished multi-step form flow with custom theming and validation.

## ⚡️ Tech Stack

- **React Native** 0.81.4 with **Expo** 54
- **HeroUI Native** - React Native component library
- **TailwindCSS** via Uniwind - Native styling
- **React Navigation** 7.x - Native Stack
- **react-hook-form** + **Zod** - Form management and validation

## 🎯 Key Highlights

- **Compound component pattern** for flexible, reusable forms
- **Feature-based architecture** for scalable organization
- **Custom theming** with CSS variables for light/dark modes

## 🧩 MultiStepForm Component

A reusable compound component for building multi-step forms with integrated Zod validation, state management, and navigation controls.

```tsx
<MultiStepForm {...formProps}>
  <MultiStepForm.Step schema={step1Schema}>
    <YourStepContent />
  </MultiStepForm.Step>
  <MultiStepForm.Step schema={step2Schema}>
    <YourStepContent />
  </MultiStepForm.Step>
  {/* Add unlimited steps as needed */}
</MultiStepForm>
```

## ✨ Features

**Appointment Booking Flow**
- Multi-step form for GP appointment booking
- Two-step process: GP details → Appointment format selection
- Real-time form validation with Zod schemas
- Progress indicator and navigation controls

**Custom Components**
- `MultiStepForm` - Reusable compound component with integrated validation
- `ProgressBar` - Visual progress indicator

## 📁 Project Structure

```
src/
├── features/appointments/       # Appointment booking feature
│   ├── screens/                # Booking screens
│   └── components/             # Feature-specific components
├── components/                 # Shared components
│   └── multi-step-form/        # Compound form component
├── navigation/                 # Navigation configuration
└── theme/                      # Custom Spectrum theme
```

## 🚀 Getting Started

Install dependencies:
```sh
npm install
```

Run using ExpoGo :
```sh
npx expo start 
```

Run on platforms:
```sh
npx expo run:ios     # iOS simulator
npx expo run:android  # Android emulator
```

## ⚠️ Known Issue

### iOS: PagerView Swipe Gestures
The multi-step form uses `react-native-pager-view` with `scrollEnabled={false}` to prevent manual swiping between steps (navigation is controlled via Next/Previous buttons only). However, there's a known bug in `react-native-pager-view` where `scrollEnabled={false}` doesn't prevent swipe gestures on ExpoGo.

**Tracking**: [react-native-pager-view#1029](https://github.com/callstack/react-native-pager-view/issues/1029)
