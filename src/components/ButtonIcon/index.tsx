import React from 'react';

import {
  Text,
  Image,
  View,
  ImageSourcePropType,
} from 'react-native';

import { RectButton, RectButtonProps } from 'react-native-gesture-handler';

import { styles } from './styles';

type Props = RectButtonProps & {
  title: string;
  icon?: ImageSourcePropType;
}

export function ButtonIcon ({title, icon, ...rest}:Props){
  return (
    <RectButton style={styles.container} {...rest}>
      {icon && <View style={styles.iconWraper}>
        <Image source={icon} style={styles.icon}/>
      </View>}
      
      <Text style={styles.title}>{title}</Text>
    </RectButton>
  );
} 