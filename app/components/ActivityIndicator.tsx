import React from "react"
import { View, StyleSheet } from "react-native"
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useDerivedValue,
} from "react-native-reanimated"

// Define the props type for the component
type ActivityIndicatorProps = {
  animating?: boolean
  size?: number
  color?: string
}

const ActivityIndicator = ({
  animating = true,
  size = 10,
  color = "blue",
}: ActivityIndicatorProps) => {
  // Create an animated value that cycles between 0 and 1
  const progress = useSharedValue(0)
  useDerivedValue(() => {
    progress.value = (progress.value + 0.01) % 1
  })

  // Create an animated style that rotates the indicator based on progress
  const style = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${progress.value * 360}deg` }],
    }
  })

  // Create a dynamic style that changes the size and color of the dots based on props
  const dotStyle = useAnimatedStyle(() => {
    return {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: color,
    }
  })

  // Render a circular indicator with four dots
  return (
    <View>
      {animating && (
        <Animated.View style={style}>
          <View style={styles.container}>
            <Animated.View style={dotStyle} />
            <Animated.View style={dotStyle} />
          </View>
          <View style={styles.container}>
            <Animated.View style={dotStyle} />
            <Animated.View style={dotStyle} />
          </View>
        </Animated.View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
})

export default ActivityIndicator
