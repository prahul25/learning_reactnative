import {View, ViewProps} from 'react-native';
import React from 'react';
import {useTheme} from '../context/ThemeContext';
import {radius, spacing} from '../constants/theme';

interface CardProps extends ViewProps {
  children: React.ReactNode;
}

export default function Card({style, children, ...rest}: CardProps) {
  const {colors} = useTheme();
  return (
    <View
      {...rest}
      style={[
        {
          backgroundColor: colors.card,
          borderRadius: radius.lg,
          padding: spacing.md,
        },
        style,
      ]}>
      {children}
    </View>
  );
}
