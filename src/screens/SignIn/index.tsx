
import React from 'react';
import {
  View,
  Text,
  Image,
  ActivityIndicator
} from 'react-native';

import { styles } from './styles';

import illustrationImg from '../../assets/illustration.png';
import { ButtonIcon } from '../../components/ButtonIcon';
import DiscordImg from '../../assets/discord.png';
import { Background } from '../../components/Background';
import { useAuth } from '../../hooks/auth';
import { theme } from '../../global/styles/theme';

export function SignIn() {
  const {isLoading, signIn} = useAuth();

  async function handleSignIn() {
    try{
      await signIn();
    }catch(error) {
      console.log('err', error)
    }
  }

  return (
    <Background>
      <View style={styles.container}>
        <Image
          source={illustrationImg}
          style={styles.image}
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se{`\n`}
            e organize suas{`\n`}
            jogatinas
          </Text>

          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games{`\n`}
            favoritos com seus amigos
          </Text>
          {
            isLoading
            ? <ActivityIndicator color={theme.colors.primary} size="large"/>
            : <ButtonIcon 
                title="Entrar com Discord" 
                icon={DiscordImg} 
                onPress={handleSignIn}
              />
          }
        </View>
      </View>
    </Background>
  );
}

