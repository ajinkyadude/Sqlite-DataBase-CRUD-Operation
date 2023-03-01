import { View, Text, TextInput, StyleSheet, Button, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from './UI/CustomButton'
import { openDatabase } from 'react-native-sqlite-storage'

let db = openDatabase({ name: 'userDatabase.db' });

const UpdateScreen = ({ navigation, route }) => {

    useEffect(()=>{
        setName(route.params.data.name);
        setEmail(route.params.data.email);
        setAddrs(route.params.data.address);
    },[])

    const updateData=()=>{
        db.transaction(txn => {
            txn.executeSql(
                'UPDATE table_user set user_name=?, user_email=? , user_address=? where user_id='+route.params.data.id,
                [name,email,address],
                (txn,res) => {
                    navigation.goBack();
                }
            )
        })
    }

    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [address,setAddrs]=useState();

    const nameHandler=(nm)=>{
        setName(nm);
    }
    const emailHandler=(em)=>{
        setEmail(em);
    }
    const addrsHandler=(ad)=>{
        setAddrs(ad);
    }

    return (
        <View style={styles.rootContainer}>
            <TextInput onChangeText={nameHandler} style={styles.inputContainer} placeholder='Enter Name..' value={name} />
            <TextInput onChangeText={emailHandler} style={styles.inputContainer} placeholder='Enter E-mail..' value={email} />
            <TextInput onChangeText={addrsHandler} style={styles.inputContainer} placeholder='Enter Address..' value={address} />
            <CustomButton onPress={updateData}>Update Data</CustomButton>
        </View>
    )
}

export default UpdateScreen;

const styles = StyleSheet.create({
    rootContainer: {
        paddingHorizontal: 40,
        height: '50%',
        flexDirection: 'column',
        // justifyContent: 'space-evenly'

    },
    inputContainer: {
        borderWidth: 2,
        width: "100%",
        borderRadius: 10,
        paddingHorizontal: 15,
        marginVertical: 20
    },

})  