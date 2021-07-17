import React, { createContext, ReactNode, useContext, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session'
import { api } from '../services/api'
import { COLLECTION_USERS } from '../config/storage';
import { useEffect } from 'react';

const {REDIRECT_URI} = process.env;
const {SCOPE} = process.env;
const {RESPONSE_TYPE} = process.env;
const {CLIENT_ID} = process.env;
const {CDN_IMAGE} = process.env;


export type UserProps = {
  id: string;
  username: string;
  firstName: string;
  avatar: string;
  email: string;
  token: string;
}

export type AuthContextData = {
  user: UserProps;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

type Props = {
  children: ReactNode
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token?: string;
    error?: string;
  }
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({children} : Props){
  const [user, setUser] = useState<UserProps>({} as UserProps)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  async function signIn(){
    try{
      setIsLoading(true)
      const authUrl = `${api.defaults.baseURL}/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;
      const { type, params } =  await AuthSession.startAsync({authUrl}) as AuthorizationResponse
      
      if(type === "success" && !params.error){
        api.defaults.headers['authorization'] = `Bearer ${params.access_token}`;
        const userInfo = await api.get('/users/@me');
        const firstName = userInfo.data.username.split(' ')[0];

        if(userInfo.data.avatar){
          userInfo.data.avatar = `${CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;
        }else{
          userInfo.data.avatar = `https://cdn.mmohuts.com/wp-content/uploads/2016/01/Guest-Writer_avatar_1451940900.jpg`;
        }
        const userData ={
          ...userInfo.data,
          firstName,
          token: params.access_token
        };
        setUser(userData) 
        await AsyncStorage.setItem(COLLECTION_USERS, JSON.stringify(userData))
      }
    }catch(error){
      throw new Error(error)
    }finally{
      setIsLoading(false)
    }
  }

  async function loadUserStorageDate(){
    const storage = await AsyncStorage.getItem(COLLECTION_USERS);
    if(storage){
      const userLogged = JSON.parse(storage) as UserProps;
      api.defaults.headers['authorization'] = `Bearer ${userLogged.token}`;
      setUser(userLogged);
    }
  }

  async function signOut(){
    setUser({} as UserProps);
    await AsyncStorage.removeItem(COLLECTION_USERS);
  }

  useEffect(() => {
    loadUserStorageDate();
  }, []);

  return (
    <AuthContext.Provider value={{user,isLoading, signIn, signOut}}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(){
  const context = useContext(AuthContext)
  return context
}

export {AuthProvider, useAuth}