import React, { memo, useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import styles from '../styles';

const ImagesApi = 'https://image.tmdb.org/t/p/w1280';

const MovieCard = ({ movieItem }: { movieItem: any }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <View style={styles.card} key={movieItem.id}>
      <Pressable
        onPressIn={() => setShowDetails(true)}
        onPressOut={() => setTimeout(() => setShowDetails(false), 1500)}
        style={styles.pressable}>
        {showDetails ? (
          <View style={styles.desc}>
            <Text style={styles.title}>{movieItem.original_title}</Text>
            <Text style={styles.descr}>
              Overview:{' '}
              {movieItem.overview.length > 250
                ? movieItem.overview.slice(0, 250) + '...'
                : movieItem.overview}
            </Text>
          </View>
        ) : (
          <Image
            style={styles.movieImage}
            source={{ uri: ImagesApi + movieItem.poster_path }}
          />
        )}
      </Pressable>
    </View>
  );
};

export default memo(MovieCard);
