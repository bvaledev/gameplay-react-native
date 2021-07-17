import React, {useState, useCallback} from 'react';

import {
  View,
  Text
} from 'react-native';

import { styles } from './styles';
import { Profile } from '../../components/Profile';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListHeader } from '../../components/ListHeader';
import { FlatList } from 'react-native';
import { Appointment, AppointmentProps } from '../../components/Appointment';
import { ListDivider } from '../../components/ListDivider';
import { Background } from '../../components/Background';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLLECTION_APPOINTMENTS } from '../../config/storage';
import { useEffect } from 'react';
import { Load } from '../../components/Load';

 
export function Home(){ 

  const navigation = useNavigation();
  const [category, setCategory] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  // {
  //   id: '7',
  //   guild: {
  //     id: '3',
  //     name: 'Coders',
  //     icon: null,
  //     owner: false,
  //   },
  //   category: '2',
  //   date: '22/06 às 20:40h',
  //   description: 'Essa é uma descrição'
  // }

  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);

  function handleCategorySelect(categoryId: string){
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  function handleApointmentDetails(guildSelected: AppointmentProps) {
    navigation.navigate('ApointmentDetails', { guildSelected });
  }


  function handleApointmentCreate() {
    navigation.navigate('ApointmentCreate');
  }

  async function loadAppointments(){
    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const appointmentStorage: AppointmentProps[] = storage ? JSON.parse(storage) : [];
    if(category){
      setAppointments(appointmentStorage.filter(ap => ap.category === category))
    }else{
      setAppointments(appointmentStorage)
    }
    setLoading(false);
  }

  useFocusEffect(useCallback(() => {
    loadAppointments()
  }, [category]))

  return (
    <Background>
      <View style={styles.header}>
        <Profile/>
        <ButtonAdd onPress={handleApointmentCreate} />
      </View>

        <CategorySelect
          categorySelected={category}
          setCategory={handleCategorySelect}
        />
      {
        loading
        ? <Load/>
        : <> 
            <View style={styles.content}>
              <ListHeader title="Partidas agendadas" subtitle={`Total ${appointments.length}`} />
            </View>
            <FlatList 
              data={appointments}
              keyExtractor={item => item.id}
              showsVerticalScrollIndicator={false}
              style={styles.matches}
              ItemSeparatorComponent={()=><ListDivider/>}
              contentContainerStyle={{paddingBottom: 69}}
              renderItem={({item}) => (
                <Appointment data={item} onPress={() => handleApointmentDetails(item)}/>
              )}
            />
          </>
      }
    </Background>
  );
}