import React from "react"
import { StyleSheet } from "react-native"
import { Card as BaseCard } from "./Card"

interface Props {
  address: string
  balance: string
  isLoadingAccount: boolean
}

export const AccountInfoCard: React.FC<Props> = ({ address, balance, isLoadingAccount }) => {
  return (
    <BaseCard
      style={styles.container}
      headingTx="welcomeScreen.accountInfo"
      content={`Address: ${isLoadingAccount ? "Loading..." : address}`}
      footer={`Balance: ${isLoadingAccount ? "Loading..." : balance}`}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
})
