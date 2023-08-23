import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter } from "expo-router";


export default function Register() {
    const router = useRouter();

  return (
    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <Text>Register</Text>
      <Button title='hello' onPress={()=>router.push('(initial)/login')}/>
    </View>
  )
}

const styles = StyleSheet.create({})