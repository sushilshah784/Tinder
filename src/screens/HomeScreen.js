import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import UserCard from '../components/atoms/UserCard';
import { useRecoilState } from 'recoil';
import { likedUsersState } from '../state/likedUsersState';

const SCREEN_WIDTH = Dimensions.get('window').width;

const dummyUsers = [
  { id: '1', name: 'Alice', age: 25, image: 'https://i.pravatar.cc/300?img=1' },
  { id: '2', name: 'Bob', age: 28, image: 'https://i.pravatar.cc/300?img=2' },
  { id: '3', name: 'Charlie', age: 23, image: 'https://i.pravatar.cc/300?img=3' },
  { id: '4', name: 'Diana', age: 27, image: 'https://i.pravatar.cc/300?img=4' },
  { id: '5', name: 'Ethan', age: 30, image: 'https://i.pravatar.cc/300?img=5' },
];

export default function HomeScreen() {
  const [likedUsers, setLikedUsers] = useRecoilState(likedUsersState);
  const [currentIndex, setCurrentIndex] = useState(0);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);

  const handleSwipe = (direction) => {
    const user = dummyUsers[currentIndex];
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

  if (currentIndex >= dummyUsers.length) return <Text>No more users!</Text>;

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.cardsContainer}>
        {dummyUsers
          .slice(currentIndex, currentIndex + 3) // show top 3 cards
          .map((user, index) => {
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
                      if (event.nativeEvent.translationX > 100) runOnJS(handleSwipe)('right');
                      else if (event.nativeEvent.translationX < -100) runOnJS(handleSwipe)('left');
                      else {
                        translateX.value = withSpring(0);
                        translateY.value = withSpring(0);
                        rotate.value = withSpring(0);
                      }
                    }}
                  >
                    <UserCard user={user} />
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
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    marginBottom: 40,
  },
  button: { padding: 20, borderRadius: 50 },
  buttonText: { color: '#fff', fontWeight: '700' },
});
