import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import axios from 'axios';
import { useThemeColors } from '../hooks/useThemeColors';
import { Audio } from 'expo-av';
import PlaySVG from '../components/svgr/PlaySVG';
import SearchSVG from '../components/svgr/SearchSVG';
import { useMyFonts } from '../hooks/useMyFonts';

// TODO he said that during lecture wednesday of last week he talked about how to test if the app rendered successfully
const HomeScreen = () => {
  const { colors } = useThemeColors();
  const { curFont }  = useMyFonts();

  const [word, setWord] = useState('Dictionary');

  const [wordTitle, setWordTitle] = useState('');

  const [speach1, setSpeach1] = useState('');
  const [definition, setDefinition] = useState('');

  const [speach2, setSpeach2] = useState('');
  const [definition2, setDefinition2] = useState('');

  const [speach3, setSpeach3] = useState('');
  const [definition3, setDefinition3] = useState('');

  const [synonyms, setSynonyms] = useState('');

  const [phonetics, setPhonetics] = useState('');
  const [audio, setAudio] = useState('');

  const [source, setSource] = useState('');

  const [sound, setSound] = useState();

  const [wordFound, setWordFound] = useState(true);

  const HandleSearch = async () => {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

      setWordTitle(response.data[0].word);


      // First meaning
      // =============
      try {
        const speach1 = response.data[0].meanings[0].partOfSpeech;
        if (speach1 == 'adjective' ){
          setSpeach1('adj.');}
          else{setSpeach1(speach1);}

        // Loop through all definitions at meanings[0]
        const i = response.data[0].meanings[0].definitions.length;
        var definition = '';
        for(let j = 0; j < i; j++){

          const curDef = response.data[0].meanings[0].definitions[j].definition;
          if(j==i-1){ definition = definition.concat(curDef + '\n'); }
          else{definition =definition.concat(curDef) + '\n\n';}
        }
        setDefinition(definition);
      }
      catch (error) { setSpeach1(''); setDefinition(''); }


      // Synonyms
      // =================
      try {
        const synonyms = response.data[0].meanings[0].synonyms;
        // This makes each line comma and space separated
        const formattedSynonyms = synonyms.join(', ');
        setSynonyms(formattedSynonyms);
      }
      catch (error) { setSynonyms(''); }


      // Second meaning
      // =================
      try {
        const speach2 = response.data[0].meanings[1].partOfSpeech;
        if (speach2 == 'adjective' ){
          setSpeach2('adj.');}
        else{
        setSpeach2(speach2);}

        const i = response.data[0].meanings[1].definitions.length;
        var definition = '';
        for(let j = 0; j < i; j++){

          const curDef = response.data[0].meanings[1].definitions[j].definition;
          if(j==i-1){ definition = definition.concat(curDef + '\n'); }
          else{definition =definition.concat(curDef) + '\n\n';}
        }
        setDefinition2(definition);
      } catch (error) { setSpeach2(''); setDefinition2(''); }


      // Third meaning
      // =================
      try {
        const speach3 = response.data[0].meanings[2].partOfSpeech;
        if (speach3 == 'adjective' ){
          setSpeach3('adj.');}
          else{setSpeach3(speach3);}

          const i = response.data[0].meanings[2].definitions.length;
          var definition = '';
          for(let j = 0; j < i; j++){
  
            const curDef = response.data[0].meanings[2].definitions[j].definition;
            if(j==i-1){ definition = definition.concat(curDef + '\n'); }
            else{ definition =definition.concat(curDef) + '\n\n';}
          }
        setDefinition3(definition);
      } catch (error) { setSpeach3(''); setDefinition3(''); }


      // Phonetics (pronunciation)
      // =========================
      try {
        const phonetics = response.data[0].phonetics[0].text;
        setPhonetics(phonetics);
      }
      catch (error) { }


      // Audio
      // =========================
      try {
        const audio = response.data[0].phonetics[0].audio;

        let foundAudioLink = false;
        for(let i = 0; i < response.data[0].phonetics.length; i++){
          if(response.data[0].phonetics[i].audio.length >= 1){
            setAudio(response.data[0].phonetics[i].audio);
            foundAudioLink = true;
            break;
          }
        }
        if(!foundAudioLink){
          setAudio('');
        }
      }
      catch (error) { }


      // Source
      // =========================
      try {
        const source = response.data[0].sourceUrls[0];
        setSource(source);
      }
      catch (error) { }

      setWordFound(true);

    } catch (error) {

      setWordFound(false);
      console.error(error);
    }

  };

  // function to play audio
  // =========================
  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(
      { uri: audio }
    );
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
      : undefined;
  }, [sound]);


  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      <View style={[styles.searchBar, { backgroundColor: colors.backgroundSecondary } ,wordFound ? styles.borderGray : styles.borderRed ]}>
        <TextInput
          style={[styles.input, { backgroundColor: colors.backgroundColor, color: colors.text, fontFamily: curFont.regular }]}
          placeholderTextColor={colors.textSearchPlaceholder}
          placeholder="Enter a word"
          value={word}
          onChangeText={(text) => setWord(text)}
        >

        </TextInput>

        <TouchableOpacity style={[styles.button]} onPress={HandleSearch} testID='search-button'>
          <SearchSVG />
        </TouchableOpacity>

      </View>


      {/* Make the results of the search scrollable while search is at the top */}
      <ScrollView style={styles.scrollView}>

        <View style={styles.content}>

          <View style={styles.header}>
            <View style={styles.headerLeft}>
              {/* Display WORD from dictionary if any... */}
              {word ? <Text testID='word' style={[styles.wordTitle, { color: colors.text, fontFamily: curFont.bold }]}>{wordTitle}</Text> : null}


              {/* Display PHONETICS if any... */}
              {phonetics ? <Text style={[styles.definition, { color: colors.secondary, fontFamily: curFont.regular }]}>{phonetics}</Text> : null}

            </View>

            <View style={styles.headerRight}>

              
              {audio ?  <Pressable testID={'audio-button'} onPress={playSound}><PlaySVG/></Pressable> : null}
              
            </View>

          </View>

          {/* Display NOUN if any... */}
          {speach1 ? <View style={styles.titleLine}>
            <Text style={[styles.speach, { color: colors.text, fontFamily: curFont.bold }]}>{speach1}</Text>
            <View style={styles.line}></View>
          </View> : null}

          {speach1 ? <Text style={[styles.meaning, {color: colors.textLowContrast, fontFamily: curFont.regular}]}>Meaning</Text> : null}

          {/* Display first DEFINITION if any... */}
          {definition ? <View style={styles.defLine} testID='definition'>
            <Text style={[styles.definition, { color: colors.text, fontFamily: curFont.regular }]}>{definition}</Text>
          </View> : null}

          {/* Display SYNONYMS if any... */}
          {synonyms ? (
            <View style={styles.synRow}>
              <Text style={[styles.synonyms, { color: colors.text, fontFamily: curFont.regular }]}>Synonyms:   </Text>
            <Text style={[styles.definition, { color: colors.secondary, fontFamily: curFont.bold }]}>{synonyms}</Text>
            </View>
          ) : null}

          {/* Display VERB if any... */}
          {speach2 ? <View style={styles.titleLine}>
            <Text style={[styles.speach, { color: colors.text, fontFamily: curFont.bold }]}>{speach2}</Text>
            <View style={styles.line}></View>
          </View> : null}

          {speach2 ? <Text style={[styles.meaning, {color: colors.textLowContrast, fontFamily: curFont.regular}]}>Meaning</Text> : null}

          {/* Display second DEFINITION if any... */}
          {definition2 ?
            <View style={styles.defLine}>
              {/* <View style={styles.dot} /> */}
              <Text style={[styles.definition, { color: colors.text, fontFamily: curFont.regular }]}>{definition2}</Text>
            </View> : null}

          {/* Display ADJECTIVE if any... */}
          {speach3 ? <View style={styles.titleLine}>
            <Text style={[styles.speach, { color: colors.text, fontFamily: curFont.bold }]}>{speach3}</Text>
            <View style={styles.line}></View>
          </View> : null}

          {speach3 ? <Text style={[styles.meaning, {color: colors.textLowContrast, fontFamily: curFont.regular}]}>Meaning</Text> : null}

          {/* Display third DEFINITION if any... */}
          {definition3 ? <View style={styles.defLine}>
            {/* <View style={styles.dot} /> */}
            <Text style={[styles.definition, { color: colors.text, fontFamily: curFont.regular }]}>{definition3}</Text>
          </View> : null}


          {/* Display SOURCE url if any... */}
          {source ?
            <View>
              <View style={styles.titleLine}>
                <Text style={[styles.sourceTitle, { color: colors.text, fontFamily: curFont.bold }]}>Source</Text>
                <View style={styles.sourceLine}></View>
              </View>

              <Text style={[styles.sourceLink, { color: colors.text, fontFamily: curFont.regular }]}>{source}</Text>
            </View>
            : null}

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
  },
  meaning: {
    marginTop: 25,
    marginBottom: 10,
    fontStyle: 'italic',
    fontSize: 15,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

    marginTop: 100,
    height: 45,

    borderRadius: 10,
    borderWidth: 1,
  },
  borderGray: { 
    borderColor: '#000',
  },
  borderRed: {
    borderColor: 'red',
  },
  input: {
    width: '80%',
    height: 40,
    padding: 10,
    marginBottom: 20,
    marginTop: 20,
  },
  button: {
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  definition: {
    fontSize: 20,
    marginTop: 20,
  },
  speach: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
  wordTitle: {
    fontSize: 30,
    marginTop: 20,
    // fontWeight: 'bold',
  },
  content: {
    width: '80%',
    marginTop: 20,
    marginHorizontal: 40,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  titleLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  line: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: '95%',
    marginTop: 25,
    marginLeft: 10,
  },
  defLine: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    backgroundColor: '#0079ff',
    marginRight: 10,
    marginTop: 20,
  },
  sourceTitle: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
  sourceLink: {
    fontSize: 20,
    marginTop: 25,
    marginLeft: 20,
    textDecorationLine: 'underline',
  },
  sourceLine: {
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    width: '90%',
    marginTop: 25,
    marginLeft: 10,
  },
  synonyms: {
    fontSize: 20,
    marginTop: 20,
    fontWeight: 'bold',
  },
  synRow: {
    // flexDirection: 'row',
    alignItems: 'center',
  },
});

export default HomeScreen;
