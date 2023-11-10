import React,{useState} from "react";
import {StatusBar} from 'expo-status-bar';
import {KeyboardAvoidingView, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Task from './components/Task';

export default function App() {

    // useState ile formdaki gelen veriyi alıyoruz
    const [task,setTask] = useState();
    // Burada formdan gelen verileri alıp, göndermek için state yaptık
    //buradaki nüans state'in bir array olacağıdır
    // her ekleme yaptığında verileri diziye ekliyoruz
    const [taskItems, setTaskItems] = useState([]);

    // Butona tıkladığında formdaki veriyi setState ile yakalıyoruz
    const handleAddTask = () => {
        // Gönderdedikten sonra klavyeyi kapatıyoruz
        Keyboard.dismiss();
        //Burada tıkladığında formdaki verileri, taskItems e  ayarlıyoruz
        setTaskItems([...taskItems, task])
        setTask(null);

    }

    // Item tıkladığında siliyoruz
    const completeTask = (index) => {
        let itemsCopy = [...taskItems]; // Mevcut itemlerin kopyasını aldık
        itemsCopy.splice(index,1); // splice ile o anki indexi arraydan çıkardık
        setTaskItems(itemsCopy); // listeyi güncelledik
    }

    return (
        <View style={styles.container}>

            <View style={styles.tasksWrapper}>
                {/*Today's Tasks */}
                <Text style={styles.sectionTitle}>Today's Tasks</Text>

                <View style={styles.items}>
                    {/*This is where the tasks will go*/}
                    {
                        taskItems.map((item,index) => {
                            return <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                                        <Task key={index} text={item} />
                                </TouchableOpacity>
                        })
                    }
                </View>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.writeTaskWrapper}
            >
                <TextInput style={styles.input} placeholder={'Write a task'} value={task} onChangeText={text => setTask(text)} />
                <TouchableOpacity onPress={ () => handleAddTask()}>
                    <View style={styles.addWrapper}>
                          <Text style={styles.addText}>+</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    tasksWrapper:{
        paddingTop:80,
        paddingHorizontal:20,
    },
    sectionTitle:{
        fontSize:24,
        fontWeight:"bold"
    },
    items:{
        marginTop:30
    },
    writeTaskWrapper:{
        position:'absolute',
        bottom:60,
        width:'100%',
        flexDirection:'row',
        justifyContent: "space-around",
        alignItems:"center",

    },
    input:{
        paddingVertical:15,
        paddingHorizontal:15,
        backgroundColor:'#fff',
        borderRadius:60,
        borderColor:'#C0C0C0',
        borderWidth:1,
        width: 250,
    },
    addWrapper:{
        height:60,
        width:60,
        backgroundColor:'#fff',
        borderRadius:60,
        justifyContent: "center",
        alignItems: "center",
          borderColor:'#C0C0C0',
        borderWidth:1,

    },
    addText:{

    },
});
