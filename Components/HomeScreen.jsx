import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from './UI/CustomButton'
import { openDatabase } from 'react-native-sqlite-storage'
import { useIsFocused } from '@react-navigation/native'

let db=openDatabase({ name: 'userDatabase.db' })

const HomeScreen = ({navigation}) => {
    const [userList,setUserList]=useState();
    const isFocused=useIsFocused();

    useEffect(()=>{getData()},[isFocused])

    const getData=()=>{
        db.transaction(txn => {
            txn.executeSql('SELECT * FROM table_user',[],(tx,res)=>{
                //console.log(res.rows.item)

                var temp = [];
                for(let i=0;i<=res.rows.length; i++)
                {
                    //console.log(res.rows.item(i));
                    {res.rows.item(i) && temp.push(res.rows.item(i));}
                }
                setUserList(temp)

            })
        })
    }

    const Delete=(id)=>{
        db.transaction(txn => {
            txn.executeSql('DELETE FROM table_user where user_id= ?',[id],(tx,res)=>{
                getData();
            })
        })
    }

    function clickHandle()
    {
        navigation.navigate('FormScreen');
    }

  return (
    <View>
      <View >
        <CustomButton onPress={clickHandle}>Add User</CustomButton>
      </View>
      <View>
        <FlatList 
        data={userList} 
        renderItem={({item,index})=>{
            return(
                (item && 
                <TouchableOpacity>
                    <Text>{'Name: '+item.user_name}</Text>
                    <Text>{'Email: '+item.user_email}</Text>
                    <Text>{'Address: '+item.user_address}</Text>
                    <View style={styles.downView}>
                        <TouchableOpacity onPress={()=>{
                            navigation.navigate('UpdateScreen',
                            {
                                data: {
                                    name: item.user_name,
                                    email: item.user_email,
                                    address: item.user_address,
                                    id: item.user_id
                                }
                            })
                        }}>
                            <Image style={styles.icons} source={require('../Images/update.png')}/>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>{Delete(item.user_id)}}>
                            <Image style={styles.icons} source={require('../Images/delete.png')}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{borderWidth: 1}}></View>
                </TouchableOpacity>
                
                )
                
                // console.log(item)
            )
        }}
        />
      </View>
    </View>
  )
}

export default HomeScreen

const styles=StyleSheet.create({
    userItem:{
        width: "100%",
        backgroundColor: "#fff",
        padding: 10
    },
    downView:{
        width: "100%",
        height: 50,
        backgroundColor: '#f2f2f2',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 10
    },
    icons:{
        width: 24,
        height: 24
    }
})

