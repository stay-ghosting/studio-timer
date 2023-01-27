import { Platform, StatusBar, SafeAreaView } from "react-native";
import React from 'react'

export default (props) => {
    return (
        <SafeAreaView
            {...props}

            style={{
                paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
            }}>
            {props.children}
        </SafeAreaView>
    )
}