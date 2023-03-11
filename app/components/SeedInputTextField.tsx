import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { colors } from "../theme"
import { TextField } from "./TextField"

interface Props {
  value: string
  onChangeText: (text: string) => void
  isValid: boolean
  numWords: number
}

const SeedInputTextField: React.FC<Props> = ({ value, onChangeText, isValid, numWords }) => {
  const handleSeedInputChange = (text: string) => {
    onChangeText(text)
  }

  return (
    <View style={styles.inputContainer}>
      <TextField
        placeholderTx="welcomeScreen.seedInputPlaceholder"
        placeholder="Enter your twelve-word recovery seed"
        value={value}
        onChangeText={handleSeedInputChange}
        // style={[styles.input, !isValid && styles.invalidInput]}
        containerStyle={[styles.inputContainer]}
        multiline
        maxLength={isValid ? value.length : undefined}
      />
      <Text style={styles.wordCountText}>{numWords}/12 words</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    borderColor: colors.palette.neutral300,
    borderRadius: 10,
    marginBottom: 5,
    padding: 5,
    width: "100%",
  },

  wordCountText: {
    bottom: 25,
    color: colors.textDim,
    fontSize: 14,
    position: "absolute",
    right: 16,
  },
})

export default SeedInputTextField
