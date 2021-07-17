import React from 'react';
import * as Linking from 'expo-linking';

import {
  View,
  ImageBackground,
  Text,
  FlatList,
  Alert,
  Share,
  Platform
} from 'react-native';
import { Background } from '../../components/Background';
import { Header } from '../../components/Header';
import { BorderlessButton } from 'react-native-gesture-handler'
import { Fontisto } from '@expo/vector-icons'
import { styles } from './styles';
import { theme } from '../../global/styles/theme';

import bannerImage from '../../assets/banner.png'
import { ListHeader } from '../../components/ListHeader';
import { Member, MemberProps } from '../../components/Member';
import { ListDivider } from '../../components/ListDivider';
import { ButtonIcon } from '../../components/ButtonIcon';
import DiscordImg from '../../assets/discord.png';
import { useRoute } from '@react-navigation/native';
import { AppointmentProps } from '../../components/Appointment';
import { useState } from 'react';
import { Load } from '../../components/Load';
import { api } from '../../services/api';
import { useEffect } from 'react';

type Params = {
  guildSelected: AppointmentProps
}

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
}

export function ApointmentDetails(){
  const route = useRoute();
  const { guildSelected } = route.params as Params;

  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);

  const members = [
    {
      id: '1',
      username: 'Brendo',
      avatar_url: 'http://github.com/bvaledev.png',
      status: 'online'
    },
    {
      id: '2',
      username: 'Rodrigo',
      avatar_url: 'http://github.com/bvaledev.png',
      status: 'offline'
    }

  ];

  async function fetchGuildWidget(){
    try{
      const response = await api.get(`/guilds/${guildSelected.guild.id}/widget.json`);
      setWidget(response.data);
    }catch(error){
      Alert.alert('Verifique as configurações do servidor.');
    }finally{
      setLoading(false)
    }
  }

  function handleShareInvitation(){
    const message = Platform.OS === 'ios' ? `Junte-se a ${guildSelected.guild.name}` : widget.instant_invite;
    if(widget.instant_invite){
      Share.share({
        message,
        url: widget.instant_invite
      })
    }else{
      Alert.alert('Verifique as configurações do servidor.');
    }
  }

  function handleOpenGuild(){
    if(widget.instant_invite){
        Linking.openURL(widget.instant_invite)
    }else{
      Alert.alert('Verifique as configurações do servidor.');
    }
  }

  useEffect(() => {
    fetchGuildWidget()
  }, []);

  return (
    <Background>
      <Header title="Details" action={
        <BorderlessButton onPress={handleShareInvitation}>
          <Fontisto 
            name="share"
            size={24}
            color={theme.colors.primary}
          />
        </BorderlessButton>
      }/>


      <ImageBackground
        source={bannerImage}
        style={styles.banner}
      >
        <View style={styles.bannerContent}>
          <Text style={styles.title}>
            {guildSelected.guild.name}
          </Text>

          <Text style={styles.subtitle}>
            {guildSelected.description}
          </Text>
        </View>
      </ImageBackground>

      {
        loading
        ? <Load/>
        : (
          <>
            <ListHeader title="Jogadores" subtitle={`Total ${widget.members.length}`}/>
            <FlatList
              data={widget.members}
              keyExtractor={item => item.id}
              style={styles.member}
              ItemSeparatorComponent={() => <ListDivider/>}
              renderItem={({item}) => (
                <Member data={item}/>
              )}
            />
          </>
        )
      }

      <View style={styles.footer}>
        <ButtonIcon title="Entrar na partida" icon={DiscordImg} onPress={handleOpenGuild} />
      </View>

    </Background>
  );
}