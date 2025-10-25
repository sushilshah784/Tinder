import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';
import UserCard from '../components/atoms/UserCard';
import { useRecoilState } from 'recoil';
import { likedUsersState } from '../state/likedUsersState';
import SwipeDeck from '../components/molecules/SwipeDeck'; // dummy data

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function HomeScreen() {
  const [likedUsers, setLikedUsers] = useRecoilState(likedUsersState);
  const [currentIndex, setCurrentIndex] = useState(0);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);

  const users = SwipeDeck; // dummy data

  const handleSwipe = (direction) => {
    const user = users[currentIndex];
    if (direction === 'right') setLikedUsers([...likedUsers, user]);
    setCurrentIndex(currentIndex + 1);
    translateX.value = 0;
    translateY.value = 0;
    rotate.value = 0;
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotate: `${rotate.value}deg` },
    ],
  }));

  const likeOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [0, 120], [0, 1]),
  }));

  const nopeOpacity = useAnimatedStyle(() => ({
    opacity: interpolate(translateX.value, [-120, 0], [1, 0]),
  }));

  if (currentIndex >= users.length) return <Text>No more users!</Text>;

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.cardsContainer}>
        {users.slice(currentIndex, currentIndex + 3).map((user, index) => {
          const isTopCard = index === 0;
          const scale = 1 - index * 0.05;
          const translateYVal = index * 10;

          const style = isTopCard
            ? animatedStyle
            : { transform: [{ scale }, { translateY: translateYVal }] };

          return (
            <Animated.View key={user.id} style={[styles.cardWrapper, style]}>
              {isTopCard ? (
                <PanGestureHandler
                  onGestureEvent={(event) => {
                    translateX.value = event.nativeEvent.translationX;
                    translateY.value = event.nativeEvent.translationY;
                    rotate.value = event.nativeEvent.translationX / 20;
                  }}
                  onEnded={(event) => {
                    if (event.nativeEvent.translationX > 120) runOnJS(handleSwipe)('right');
                    else if (event.nativeEvent.translationX < -120) runOnJS(handleSwipe)('left');
                    else {
                      translateX.value = withSpring(0);
                      translateY.value = withSpring(0);
                      rotate.value = withSpring(0);
                    }
                  }}
                >
                  <UserCard user={user} />
                  <Animated.View style={[styles.likeLabel, likeOpacity]}>
                    <Text style={styles.likeText}>LIKE</Text>
                  </Animated.View>
                  <Animated.View style={[styles.nopeLabel, nopeOpacity]}>
                    <Text style={styles.nopeText}>NOPE</Text>
                  </Animated.View>
                </PanGestureHandler>
              ) : (
                <UserCard user={user} />
              )}
            </Animated.View>
          );
        })}
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'red' }]}
          onPress={() => handleSwipe('left')}
        >
          <Text style={styles.buttonText}>Dislike</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'green' }]}
          onPress={() => handleSwipe('right')}
        >
          <Text style={styles.buttonText}>Like</Text>
        </TouchableOpacity>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  cardsContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  cardWrapper: {
    position: 'absolute',
    width: '90%',
    height: 400,
  },
  likeLabel: {
    position: 'absolute',
    top: 40,
    left: 40,
    padding: 10,
    borderWidth: 2,
    borderColor: 'green',
    borderRadius: 5,
    transform: [{ rotate: '-20deg' }],
  },
  likeText: { color: 'green', fontSize: 32, fontWeight: '800' },
  nopeLabel: {
    position: 'absolute',
    top: 40,
    right: 40,
    padding: 10,
    borderWidth: 2,
    borderColor: 'red',
    borderRadius: 5,
    transform: [{ rotate: '20deg' }],
  },
  nopeText: { color: 'red', fontSize: 32, fontWeight: '800' },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 40,
  },
  button: { padding: 20, borderRadius: 50 },
  buttonText: { color: '#fff', fontWeight: '700' },
});
