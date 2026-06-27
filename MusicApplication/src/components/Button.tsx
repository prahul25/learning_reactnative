import {Pressable, PressableProps, Text, StyleSheet} from 'react-native';
import React from 'react';
import {useTheme} from '../context/ThemeContext';

interface CustomButtonProps extends Omit<PressableProps, 'children'> {
  title?: string;
  children?: React.ReactNode;
}

export default function Button({style, title, children, ...rest}: CustomButtonProps) {
  const {colors} = useTheme();
  return (
    <Pressable
      {...rest}
      style={({pressed}) => [
        {
          backgroundColor: colors.primary,
          paddingVertical: 12,
          paddingHorizontal: 24,
          borderRadius: 8,
          opacity: pressed ? 0.8 : 1,
        },
        style as any,
      ]}>
      <Text style={{color: '#FFFFFF', fontSize: 16, textAlign: 'center'}}>
        {title || children}
      </Text>
    </Pressable>
  );
}
