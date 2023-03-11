import React, { FC } from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle } from "react-native"
import { Text } from "../components"
import SeedInput from "../components/SeedInput"
import { isRTL } from "../i18n"
import { colors, spacing } from "../theme"

const welcomeFace = require("../../assets/images/welcome-face.png")

type WelcomeScreenProps = {
  any
}
export const WelcomeScreen: FC<WelcomeScreenProps> = function WelcomeScreen() {
  return (
    <View style={$container}>
      <View style={$topContainer}>
        <Text
          testID="welcome-heading"
          style={$welcomeHeading}
          tx="welcomeScreen.welcome"
          preset="heading"
        />
        <Image style={$welcomeFace} source={welcomeFace} resizeMode="contain" />
        <SeedInput />
      </View>
    </View>
  )
}

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.large,
}

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  top: 180,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.medium,
}
