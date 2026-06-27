import { TextProps, Text as RnText } from 'react-native'
import React from 'react'
import { useTheme } from '../context/ThemeContext'

export default function Text(props:TextProps) {
    const {colors} = useTheme()
  return (

      <RnText {...props} style={[{color:colors.text}, props.style]}>{props.children}</RnText>
  )
}