import React, { useState, useEffect } from "react"
import { View, Alert, StyleSheet } from "react-native"
import * as bip39 from "bip39"
import * as SecureStore from "expo-secure-store"

// @ts-ignore
import { INFURA_API_KEY } from "@env"
// Import the crypto getRandomValues shim (**BEFORE** the shims)
import "react-native-get-random-values"

// Import the the ethers shims (**BEFORE** ethers)
import "@ethersproject/shims"

// Import the ethers library
import { ethers } from "ethers"

import { AccountInfoCard } from "./AccountInfoCard"
import SeedInputTextField from "./SeedInputTextField"
import GeneratePrivateKeyButton from "./GeneratePrivateKeyButton"
import ActivityIndicator from "./ActivityIndicator"
import { Text } from "./Text"

interface Props {}

interface EthereumAccount {
  address: string
  balance: string
}

const SeedInput: React.FC<Props> = () => {
  const [seed, setSeed] = useState("")
  const [isValid, setIsValid] = useState(false)
  const [numWords, setNumWords] = useState(0)
  const [ethereumAccount, setEthereumAccount] = useState<EthereumAccount | null>(null)
  const [isLoadingSeed, setIsLoadingSeed] = useState(false)
  const [isLoadingAccount, setIsLoadingAccount] = useState(false)

  const handleSeedInputChange = (text: string) => {
    const words = text
      .trim()
      .split(/\s+/)
      .filter((word) => word !== "")
    const numWords = words.length
    setIsValid(numWords === 12)
    setNumWords(numWords)
    setSeed(text)
  }

  const handleGeneratePrivateKey = async () => {
    if (seed) {
      setIsLoadingSeed(true)
      try {
        const seedHex = await bip39.mnemonicToSeed(seed)
        const hdNode = ethers.utils.HDNode.fromSeed(seedHex)
        const privateKey = hdNode.derivePath("m/44'/60'/0'/0/0").privateKey

        await SecureStore.setItemAsync("privateKey", privateKey)
        Alert.alert("Success!", "Private key saved securely.")
        if (privateKey) {
          await getEthereumAccount()
        }
      } catch (error) {
        Alert.alert("Error!", "Invalid seed. Please enter a valid twelve-word recovery seed.")
      } finally {
        setIsLoadingSeed(false)
      }
    } else {
      Alert.alert("Error!", "Invalid seed. Please enter a valid twelve-word recovery seed.")
    }
  }

  const getEthereumAccount = async () => {
    setIsLoadingAccount(true)
    try {
      const privateKey = await SecureStore.getItemAsync("privateKey")
      if (!privateKey) {
        throw new Error("Private key not found")
      }

      const provider = new ethers.providers.InfuraProvider("mainnet", INFURA_API_KEY)

      const wallet = new ethers.Wallet(privateKey, provider)

      const address = wallet.address
      const ensName = await provider.lookupAddress(address)
      const resolvedAddress = ensName ? await provider.resolveName(ensName) : address

      const balance = await provider.getBalance(resolvedAddress)

      setEthereumAccount({
        address: resolvedAddress,
        balance: ethers.utils.formatEther(balance),
      })
    } catch (error) {
      Alert.alert("Error!", "Failed to retrieve Ethereum account information.")
    } finally {
      setIsLoadingAccount(false)
    }
  }

  useEffect(() => {
    const getPrivateKey = async () => {
      setIsLoadingAccount(true)
      const privateKey = await SecureStore.getItemAsync("privateKey")
      if (privateKey) {
        await getEthereumAccount()
      }
      setIsLoadingAccount(false)
    }

    getPrivateKey()
  }, [])

  return (
    <View style={styles.container}>
      <SeedInputTextField
        value={seed}
        isValid={isValid}
        numWords={numWords}
        onChangeText={handleSeedInputChange}
      />
      <GeneratePrivateKeyButton
        disabled={!isValid || isLoadingSeed}
        onPress={handleGeneratePrivateKey}
        title={
          isLoadingSeed ? (
            <ActivityIndicator size={10} color="#ffffff" />
          ) : (
            <Text tx={"welcomeScreen.generateButton"} />
          )
        }
      />
      {ethereumAccount ? (
        <AccountInfoCard
          address={ethereumAccount.address}
          balance={ethereumAccount.balance}
          isLoadingAccount={isLoadingAccount}
        />
      ) : (
        <View>
          <Text>Please enter a valid twelve-word recovery seed and press Generate Private Key</Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
})

export default SeedInput
