import { View, Text, TextInput, StyleSheet, Button, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from './UI/CustomButton'
import { openDatabase } from 'react-native-sqlite-storage'

let db = openDatabase({ name: 'userDatabase.db' });

const FormScreen = ({ navigation }) => {

    const [name,setName]=useState();
    const [email,setEmail]=useState();
    const [address,setAddrs]=useState();

    useEffect(() => {
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
                [],
                function (tx, res) {
                    //console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_email VARCHAR(50), user_address VARCHAR(255))',
                            []
                        );
                    }
                }
            );
        });
    }, []);

    // function submitHandler() {
    //     navigation.goBack();
    // }

    const saveData = () => {
        db.transaction(txn => {
            txn.executeSql(
                'INSERT INTO table_user(user_name, user_email, user_address) VALUES(?,?,?)',
                [name, email, address],
                (txn,res)=>{
                    if(res.rowsAffected == 1)
                    {
                        navigation.goBack();
                    }
                    //console.log(res);
                }
            );
        });
        //console.log("Hello")
    }

    const nameHandler=(val)=>{
        setName(val);
    }
    const emailHandler=(mail)=>{
        setEmail(mail);
    }
    const addrsHandler=(addr)=>{
        setAddrs(addr);
    }

    return (
        <View style={styles.rootContainer}>
            <TextInput onChangeText={nameHandler} style={styles.inputContainer} placeholder='Enter Name..' />
            <TextInput onChangeText={emailHandler} style={styles.inputContainer} placeholder='Enter E-mail..' />
            <TextInput onChangeText={addrsHandler} style={styles.inputContainer} placeholder='Enter Address..' />
            <CustomButton onPress={saveData}>Submit</CustomButton>
        </View>
    )
}

export default FormScreen

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