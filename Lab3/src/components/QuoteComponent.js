import React, { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useMyBackgrounds } from '../hooks/useMyBackgrounds';
import RefreshIcon from './RefreshIcon';


// TODO Get quote in line with refresh button
const QuoteComponent = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const { curBackground } = useMyBackgrounds();
  const fetchQuote = useCallback(async () => {
    try {
      let response = await axios.get('https://api.quotable.io/random');
      while(true) {
        if(response.data.content.length > 150 ) {
          response = await axios.get('https://api.quotable.io/random');
        } else {
          break;
        }
        
      }
      const data = response.data;
      const author = '- ' + data.author;

      setQuote(data.content);
      setAuthor(author)
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote('Not all those who wander are lost.')
      setAuthor('- J.R.R. Tolkien')
    }
  }, [setQuote]);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  const handlePress = () => {
    fetchQuote();
  };

  return (
    <View style={styles.componentContainer}>
        <View style={styles.quoteContainer}>
            <Text style={[styles.quoteText, {color: curBackground.quoteColor}]}>{quote}</Text>
            <Text style={[styles.quoteText, {color: curBackground.quoteColor}]}>{author}</Text>
        </View> 
        <View style={styles.buttonContainer}>
            <Pressable onPress={handlePress} style={styles.button} testID='refresh-button'>
                <View>
                    <RefreshIcon curBackground={curBackground}/>
                </View>
            </Pressable>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    componentContainer: {
        flexDirection: 'row',
        // alignItems: 'center',
        marginHorizontal: 15,
        marginTop: 10,
    },
    quoteContainer: {
        justifyContent: 'flex-start',
        // alignItems: 'center',
        marginTop: 10,
        width: '80%',
        // marginHorizontal: 15,
    },
    buttonContainer: {
        // justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginTop: 20,
        marginHorizontal: 15,
    },
    quoteText: {
        // color: 'black',
        fontSize: 20,
        textAlign: 'left',
    },
    button: {
        marginLeft: 10,
    },
});

export default QuoteComponent;

