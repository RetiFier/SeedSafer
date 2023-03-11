import React from "react"
import { StyleSheet } from "react-native"
import { colors } from "../theme"
import { Button } from "./Button"

interface Props {
  onPress: () => void
  disabled: boolean
  title: React.ReactNode
}

const GeneratePrivateKeyButton: React.FC<Props> = ({ onPress, disabled, title }) => {
  return (
    <Button
      style={styles.buttonStyle}
      textStyle={styles.buttonTextStyle}
      disabled={disabled}
      onPress={onPress}
    >
      {title}
    </Button>
  )
}

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colors.palette.primary300,
    borderColor: colors.palette.neutral300,
    borderRadius: 10,
    marginTop: 10,
    paddingVertical: 20,
  },
  buttonTextStyle: {
    color: colors.palette.neutral100,
    fontSize: 18,
  },
})

export default GeneratePrivateKeyButton
