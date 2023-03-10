import React, { useState } from "react"
import { TextInput, View, Button, Alert } from "react-native"
import BIP39 from "react-native-bip39"
import * as SecureStore from "expo-secure-store"

interface Props {}

const SeedInput: React.FC<Props> = () => {
  const [seed, setSeed] = useState("")

  const handleSeedInputChange = (text: string) => {
    setSeed(text)
  }

  const handleGeneratePrivateKey = async () => {
    try {
      const privateKey = await BIP39.mnemonicToSeed(seed)
      await SecureStore.setItemAsync("privateKey", privateKey.toString())
      Alert.alert("Success!", "Private key saved securely.")
    } catch (error) {
      Alert.alert("Error!", "Invalid seed. Please enter a valid twelve-word recovery seed.")
    }
  }

  return (
    <View>
      <TextInput
        placeholder="Enter your twelve-word recovery seed"
        value={seed}
        onChangeText={handleSeedInputChange}
      />
      <Button title="Generate Private Key" onPress={handleGeneratePrivateKey} />
    </View>
  )
}

export default SeedInput
