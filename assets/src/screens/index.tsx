import { Alert, FlatList, Text, View, type TextInput } from "react-native";
import { styles } from "./styles";
import { Header } from "../components/header";
import { Task } from "../components/task";
import { useId, useRef, useState } from "react";
import type { TaskDTO } from "../dtos/TaskDTO";
import { Empty } from "../components/empty";
import { uuid } from "../../../utils/uuid";


export function HomeScreen(){
    const[tasks, setTasks] = useState<TaskDTO[]>([])
    const[newTask, setNewTask] = useState('')
    const newTaskInputRef = useRef<TextInput>(null)

    function handleTaskAdd(){
        if(newTask !== '')
        setTasks((tasks) => [
            ...tasks,
            {id: uuid(), isCompleted: false, title: newTask.trim()},
        ])
        //console.log(tasks)
        setNewTask('')
    }

    function hendleTaskDone(id : string){
        setTasks((tasks) =>
            tasks.map((tasks)=> {
                tasks.id === id ? (tasks.isCompleted = !tasks.isCompleted) : null
                return tasks
            }),
        )
    }

    function hendleTaskDeleted(id : string){
        Alert.alert('Excluir tarefa', 'Deseja excluir tarefa?', [
            {
                text: 'Sim',
                style: 'default',
                onPress: () => setTasks((tasks) =>
                    tasks.filter((tasks)=>tasks.id !== id)
                )
            },{
                text: 'Não',
                style: 'cancel'
            }
        ])
    }

    const totalTaskCreated = tasks.length
    const totalTaskDone = tasks.filter(({isCompleted}) => isCompleted).length

    return (
    <View style={styles.container}>
        <Header 
            inputRef={newTaskInputRef}
            task = {newTask}
            onChangeText = {setNewTask}
            onPress={handleTaskAdd}
        />
        <View style={styles.tasksContainer}>
            <View style={styles.infos}>
                <View style={styles.row}>
                    <Text style={styles.tasksCreated}>Criadas</Text>
                    <View style={styles.counterContainer}>
                        <Text style={styles.counterText}>{totalTaskCreated}</Text>
                    </View>
                </View>
                <View style={styles.row}>
                    <Text style={styles.tasksDone}>Concluidas</Text>
                    <View style={styles.counterContainer}>
                        <Text style={styles.counterText}>{totalTaskDone}</Text>
                    </View>
                </View>
            </View>

            <FlatList
                data={tasks}
                keyExtractor={(tasks) => tasks.id}
                renderItem={({item}) => <Task 
                    key={item.id} 
                    onTaskDone = {() => hendleTaskDone(item.id)}
                    onTaskDeleted = {() => hendleTaskDeleted(item.id)}
                    {...item}
                />}
                ListEmptyComponent={<Empty/>}
            />
        </View>
    </View>
    )
}