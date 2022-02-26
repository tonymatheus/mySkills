import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  FlatList,
} from 'react-native';
import {Button} from '../components/Button';
import {SkillCard} from '../components/SkillCard';

interface SkillData {
  id: string;
  name: string;
}

export function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [greeting, setGreeting] = useState('');

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill,
    };
    setMySkills(oldSkill => [...oldSkill, data]);

    setNewSkill('');
    console.log('New Skill', data);
  }

  function handleRemoveSkill(id: string) {
    setMySkills(oldState =>
      oldState.filter(skill => {
        skill.id !== id;
      }),
    );
  }

  useEffect(() => {
    const currantHour = new Date().getHours();
    if (currantHour < 12) {
      setGreeting('Good Morning');
    } else if (currantHour >= 12 && currantHour < 18) {
      setGreeting('Good Afternoon');
    } else {
      setGreeting('Good Night');
    }
  }, [mySkills]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome Tony</Text>

      <Text style={styles.greetings}>{greeting}</Text>
      <TextInput
        placeholder="new skill"
        placeholderTextColor="#555"
        style={styles.input}
        value={newSkill}
        onChangeText={setNewSkill}></TextInput>

      <Button onPress={handleAddNewSkill} title={'Add'} />

      <Text style={[styles.title, {marginVertical: 50}]}>My Skills</Text>

      <FlatList
        data={mySkills}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        value={mySkills}
        renderItem={({item}) => (
          <SkillCard
            skill={item.name}
            onPress={() => handleRemoveSkill(item.id)}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#121015',
    paddingVertical: 20,
    paddingHorizontal: 70,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1f1e25',
    color: '#fff',
    marginTop: 30,
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 10,

    borderRadius: 7,
  },
  greetings: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 5,
    fontSize: 18,
  },
});
