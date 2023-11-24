// removeReply(item, index)
import React, { useState } from 'react';
import { View, Pressable, StyleSheet, Text, Modal, SafeAreaView } from 'react-native';
import DeleteIcon from './deleteIcon';

const DeleteButton = ({ index, removeReply, item }) => {

    const [modalVisible, setModalVisible] = useState(false);

    // deleteReply is a separate component from deleteComment due to our state management requiring acces to replies to be different
    // from access to comments. All visible behavior between the two components is the same, they just work differently under the hood.
    return (
        <View>
            <Pressable testID={'deleteButton'} style={styles.button} onPress={() => setModalVisible(true)}>
                {({ pressed }) => (
                    <View style={[styles.buttonContainer, pressed && styles.buttonPressed]}>
                        <DeleteIcon></DeleteIcon>
                        <Text style={[styles.buttonText, pressed && styles.buttonTextPressed]}>  Delete</Text>
                    </View>
                )}
            </Pressable>

            <View>

                <Modal
                    testID={'modal'}
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.modal}>
                        <View style={styles.modalTextArea}>

                            <Text style={styles.modalTitle}>Delete Comment</Text>

                            <Text style={styles.modalSubText}>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</Text>
                            <View style={styles.modalButtonArea}>
                                
                                <Pressable
                                    onPress={() => { setModalVisible(false) }}>
                                    <View style={styles.modalNo}>
                                        <Text style={styles.modalNoText}>NO, CANCEL.</Text>
                                    </View>
                                </Pressable>

                                <Pressable
                                    testID={'modalDeleteButton'}
                                    onPress={() => { removeReply(item, index), setModalVisible(false) }}>
                                    <View style={styles.modalYes}>
                                        <Text style={styles.modalYesText}>YES, DELETE.</Text>
                                    </View>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>

            </View>


        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        width: 66,
    },
    buttonContainer: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 5,
        flexDirection: 'row',
    },
    buttonText: {
        color: 'red',
        fontSize: 16,
    },
    buttonTextPressed: {
        opacity: 0.5,
    },
    buttonPressed: {
        backgroundColor: opacity = 0.5,
    },
    modal: {
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: '100%',
    },
    modalTextArea: {
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        marginTop: 285,
        marginLeft: 50,
        marginRight: 50,
        borderRadius: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalYes: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 10,
        margin: 10,
    },
    modalYesText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalNo: {
        backgroundColor: 'grey',
        padding: 10,
        borderRadius: 10,
        margin: 10,
    },
    modalNoText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalButtonArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        alignSelf: 'flex-start',
    },
    modalSubText: {
        fontSize: 16,
        alignSelf: 'flex-start',
    },
});


export default DeleteButton;
