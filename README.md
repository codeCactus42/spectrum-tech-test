https://github.com/user-attachments/assets/dccd7122-5f03-407f-adbf-91bbae21c2e0

# Spectrum Tech Test

A React Native appointment booking application featuring a polished multi-step form flow with custom theming and validation.

## Tech Stack

- **React Native** 0.81.4 with **Expo** 54
- **HeroUI Native** - React Native component library
- **TailwindCSS** via Uniwind - Native styling
- **React Navigation** 7.x - Native Stack
- **react-hook-form** + **Zod** - Form management and validation

## Features

**Appointment Booking Flow**
- Multi-step form for GP appointment booking
- Two-step process: GP details → Appointment format selection
- Real-time form validation with Zod schemas
- Progress indicator and navigation controls

**Custom Components**
- `MultiStepForm` - Reusable compound component with integrated validation
- `BrandLogo` - Spectrum branding component
- `ProgressBar` - Visual progress indicator

**Design System**
- Custom Spectrum color palette
- Light/dark mode support with automatic system detection
- DM Sans custom typography
- Edge-to-edge layout on Android

## Getting Started

Install dependencies:
```sh
npm install
```

Start the development server:
```sh
npm start
```

Run on platforms:
```sh
npm run ios     # iOS simulator
npm run android # Android emulator
npm run web     # Web browser
```

## Project Structure

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

## Key Highlights

- **Compound component pattern** for flexible, reusable forms
- **Feature-based architecture** for scalable organization
- **Custom theming** with CSS variables for light/dark modes

## Known Issue ⚠️

### iOS: PagerView Swipe Gestures
The multi-step form uses `react-native-pager-view` with `scrollEnabled={false}` to prevent manual swiping between steps (navigation is controlled via Next/Previous buttons only). However, there's a known bug in `react-native-pager-view` where `scrollEnabled={false}` doesn't prevent swipe gestures on `ExpoGo`.

**Tracking**: [react-native-pager-view#1029](https://github.com/callstack/react-native-pager-view/issues/1029)


