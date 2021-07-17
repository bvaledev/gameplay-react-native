import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { View, FlatList } from "react-native";
import { GuildItem, GuildProps } from "../../components/GuildItem";
import { ListDivider } from "../../components/ListDivider";
import { Load } from "../../components/Load";
import { api } from "../../services/api";

import { styles } from "./styles";

type Props = {
  handleGuildSelected: (guildSelected: GuildProps) => void;
};

export function Guilds({ handleGuildSelected }: Props) {
  const [guilds, setGuilds] = useState<GuildProps[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchGuilds(){
    const response = await api.get('/users/@me/guilds');
    setGuilds(response.data)
    setLoading(false)
  }
  
  useEffect(() => {
    fetchGuilds();
  }, [])

  return (
    <View style={styles.container}>
      {loading ? (
        <Load />
      ) : (
        <FlatList
          style={styles.guilds}
          data={guilds}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <ListDivider isCentered />}
          ListHeaderComponent={() => <ListDivider isCentered />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 69, paddingTop: 104 }}
          renderItem={({ item }) => (
            <GuildItem data={item} onPress={() => handleGuildSelected(item)} />
          )}
        />
      )}
    </View>
  );
}
