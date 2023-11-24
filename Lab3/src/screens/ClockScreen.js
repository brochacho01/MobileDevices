import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import axios from 'axios';
import moment from 'moment';
import 'moment-timezone';
import { useMyBackgrounds } from '../hooks/useMyBackgrounds';
import { useCustomBackground } from '../hooks/useCustomBackground';
import getLocationAbbreviations from '../context/StateAbbreviatons.js';
import QuoteComponent from '../components/QuoteComponent';
import DropdownComponent from '../components/Dropdown';
import MoonIcon from '../components/MoonIcon';
import SunIcon from '../components/SunIcon';

const ClockScreen = () => {
  const [location, setLocation] = useState(null);
  const [displayTime, setDisplayTime] = useState(null);
  const [ampm, setAmpm] = useState(null);
  const [timezone, setTimezone] = useState(null);
  const [dropTimeZone, setDropTimezone] = useState(null);
  const [dayOfYear, setDayOfYear] = useState(null);
  const [dayOfWeek, setDayofWeek] = useState(null);
  const [weekOfYear, setWeekOfYear] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const { curBackground } = useMyBackgrounds();
  const [greetingMessage, setGreetingMessage] = useState(null); // ['morning', 'afternoon', 'evening']
  const { background, setBackground } = useCustomBackground();

  useEffect(() => {
    const fetchCurrentTimeAndLocation = async () => {
      try {
        // Get and parse current time
        const response = await axios.get('http://worldtimeapi.org/api/ip');
        const data = response.data;
        const currentTime = moment(data.datetime).format('YYYY-MM-DD HH:mm:ss');
        const currentHour = moment(currentTime).format('HH');
        const adjustedHour = currentHour - 12+12;
        const dispTime = moment(currentTime).format('h:mm');
        const ampm = moment(currentTime).format('A');
        const timezone = moment.tz(moment.tz.guess()).zoneAbbr();

        // Set values for dropdown
        setDropTimezone(data.timezone);
        setDayOfYear(data.day_of_year);
        setDayofWeek(data.day_of_week);
        setWeekOfYear(data.week_number);

        // Get and parse location
        const locationResponse = await axios.get(`http://ip-api.com/json/${data.client_ip}`);
        const locationData = locationResponse.data;

        const locationAbbreviation = getLocationAbbreviations(locationData.regionName);

        const location = `${locationData.city}, ${locationAbbreviation}`;

        if (adjustedHour >= 0 && adjustedHour < 6) {
          setGreetingMessage('GOOD AFTERNOON');
        } else if (adjustedHour >= 6 && adjustedHour < 17) {
          setGreetingMessage('GOOD EVENING');
        } else {
          setGreetingMessage('GOOD MORNING');
        }

        if (adjustedHour >= 6 && adjustedHour < 18) {
          setBackground('night');
        } else {
          setBackground('day');
        }
        setAmpm(ampm);
        setTimezone(timezone);
        setDisplayTime(dispTime);
        setLocation(location);
      } catch (error) {
        console.log('Error fetching current time and location:', error);
        setDisplayTime(null);
      }
    };

    // Fetch initial time and location
    fetchCurrentTimeAndLocation();

    // Fetch time and location every minute
    const interval = setInterval(fetchCurrentTimeAndLocation, 60000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  // If we cannot get the time then display an error message
  return (
    <View style={styles.container} testID='clock-screen'>
      <ImageBackground source={curBackground.image} style={styles.image}>
        {displayTime === null ? (
          <View style={styles.contentContainer}>
            <Text style={[styles.error, { color: curBackground.textColor, fontSize: 20 }]}>
              Error fetching current time and location, please check your internet connection and try again.
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.quoteContainer}>
              <QuoteComponent />
            </View>
            <View style={[styles.contentContainer, { flex: isOpen ? 1 : 4 }]}>
              <View style={styles.greetingContainer}>
                {background !== 'night' ? <SunIcon /> : <MoonIcon />}
                <Text style={styles.greetingMessage}>{greetingMessage}, IT'S CURRENTLY</Text>
              </View>
              <View style={styles.timeContainer}>
                <View style={styles.dispTimeContainer}>
                  <Text style={styles.time}>{displayTime}</Text>
                </View>

                {ampm === null || timezone === null ? null : (
                  <View style={styles.timePerihperal}>
                    <Text style={styles.ampm}>{ampm}</Text>
                    <Text style={styles.timezone}>{timezone}</Text>
                  </View>
                )}
              </View>

              {location === null ? null : <Text style={styles.location}>In {location}</Text>}
            </View>
            <DropdownComponent
              Timezone={dropTimeZone}
              DayOfYear={dayOfYear}
              DayOfWeek={dayOfWeek}
              WeekNum={weekOfYear}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
            />
          </>
        )}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  quoteContainer: {
    justifyContent: 'flex-start',
  },
  contentContainer: {
    justifyContent: 'flex-end',
  },
  greetingContainer: {
    flexDirection: 'row',
    marginLeft: 15,
  },
  greetingMessage: {
    fontSize: 20,
    color: 'white',
    textAlign: 'left',
    marginLeft: 15,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: 15,
    marginTop: 10,
  },
  dispTimeContainer: {
    marginRight: 5,
  },
  timePerihperal: {
    alignItems: 'center',
  },
  ampm: {
    fontSize: 16,
    color: 'white',
    marginRight: 5,
  },
  timezone: {
    fontSize: 16,
    color: 'white',
  },
  time: {
    fontSize: 64,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  location: {
    fontSize: 24,
    color: 'white',
    textAlign: 'left',
    marginLeft: 15,
  },
});

export default ClockScreen;
