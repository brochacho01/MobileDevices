import React, { useState } from 'react';
import { View, Pressable, StyleSheet, Text } from 'react-native';

const UpvoteButton = ({score}) => {

    //int for upvote button
    const [trackUpvote, setTrackUpvote] = useState(0);
    const [isInitialized, setIsInitialized] = useState(false);
    //for upvote button
    const [count, setCount] = useState(0);

    if(score !== 0 && !isInitialized){
        setCount(score);
        setIsInitialized(true);
    }
    // Function to increment counter for upvote button
    const toggleIncrement = () => {

        if(trackUpvote < 1){
            setCount(count + 1);
            setTrackUpvote(trackUpvote + 1);
        }

        // setCount(count + 1);
    };

    // Function to decrement counter for downvote button
    const toggleDecrement = () => {

        if(trackUpvote > -1){
        setCount(count - 1);
        setTrackUpvote(trackUpvote - 1);
        }

        // setCount(count - 1);
    };


    return (
        <View>

            <View style={styles.upvoteContainer}>
                <Pressable testID={'upvoteButton'} onPress={toggleIncrement}>
                    <Text style={styles.upvote}>+</Text>
                </Pressable>

                <Text style={styles.vote}>{count}</Text>

                <Pressable testID={'downvoteButton'} onPress={toggleDecrement}>
                    <Text style={styles.downvote}>-</Text>
                </Pressable>
            </View>
            
        </View>
    );
};

const styles = StyleSheet.create({
    upvoteContainer: {
    flexDirection: 'row',
    backgroundColor: 'hsl(223, 19%, 93%)',
    borderRadius: 5,
    width: 65,
    height: 30,
    justifyContent: 'center',
    },
    upvote: {
        fontSize: 20,
        color: 'green',
        paddingLeft: 10,
    },
    downvote: {
        fontSize: 20,
        color: 'red',
        paddingRight: 10,
    },
    vote: {
        fontSize: 16,
        color: 'black',
        marginTop: 4,
        marginLeft: 10,
        marginRight: 10,
        color: 'hsl(211, 10%, 45%)',
    },
});


export default UpvoteButton;