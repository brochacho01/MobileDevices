import React, { useState } from 'react';
import { View, Pressable, TextInput, StyleSheet, Text, Modal } from 'react-native';
import EditSVG from './editSVG';

const EditButton = ({ index, editComment, comment}) => {

    const [modalVisible, setModalVisible] = useState(false);
    const [text, setText] = useState('');

    // Edit button that when pressed will cause a modal to appear that allows a user to edit their comment then
    // asks the user to confirm comment edit
    return (
        <View>
            <Pressable testID={'editButton'} style={styles.button} onPress={() => {setModalVisible(true); setText(comment)}}>
                {({ pressed }) => (
                    <View style={[styles.buttonContainer, pressed && styles.buttonPressed]}>
                        <EditSVG></EditSVG>
                        <Text style={[styles.buttonText, pressed && styles.buttonTextPressed]}> Edit</Text>
                    </View>
                )}
            </Pressable>

            <View>
                
                {/* This is the modal that appears when the edit button is pressed */}
                <Modal
                    testID={'modal'}
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    >
                    <View style={styles.modal}>

                        <View style={styles.modalTextArea}>

                            <Text style={styles.modalTitle}>Edit Comment</Text>

                            <TextInput
                                style={styles.modalTextInput}
                                placeholder={'Edit comment...'}
                                onChangeText={text => setText(text)}
                                value={text}
                                multiline={true}
                            />

                            <View style={styles.modalButtonArea}>
                                
                                <Pressable
                                    onPress={() => { setModalVisible(false) }}>
                                    <View style={styles.modalNo}>
                                        <Text style={styles.modalNoText}>CANCEL</Text>
                                    </View>
                                </Pressable>

                                <Pressable
                                    testID={'modalEditButton'}
                                    onPress={() => { editComment(index, text), setModalVisible(false) }}>
                                    <View style={styles.modalYes}>
                                        <Text style={styles.modalYesText}>SAVE</Text>
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
        color: 'hsl(238, 40%, 52%)',
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
        backgroundColor: 'green',
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
    modalTextInput: {
        height: 100,
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
});

export default EditButton;