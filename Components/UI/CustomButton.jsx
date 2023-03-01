import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

const CustomButton = ({ onPress, children }) => {
    return (
        <View>
            <Pressable onPress={onPress} style={({ pressed }) => [styles.pressableHandle, pressed && styles.pressed]}>
                <Text style={styles.textStyle}>{children}</Text>
            </Pressable>
        </View>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    pressableHandle: {
        backgroundColor: '#996633',
        width: '100%',
        padding: 13,
        borderRadius: 5
    },
    textStyle: {
        textAlign: "center",
        fontWeight: 'bold',
        fontSize: 17
    },
    pressed: {
        opacity: 0.7
    }
})