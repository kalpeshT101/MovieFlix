import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList as RNFlatlist,
  StyleSheet,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import styles from './styles';
import axios from 'axios';
import { FlatList } from 'react-native-bidirectional-infinite-scroll';
import MovieCard from './components/MovieCard';

const moviesApi =
  'https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=2023&page=1&vote_count.gte=100';
const genreListApi =
  'https://api.themoviedb.org/3/genre/movie/list?api_key=2dca580c2a14b55200e784d157207b4d&language=en';
const Home: React.FC = () => {
  const [year, setYear] = useState(2012);
  const [movies, setMovies] = useState([]);
  const [genreBasedMovies, setGenreBasedMovies] = useState([]);
  const [genre, setGenre] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState<number[]>([]);

  useEffect(() => {
    const getMovies = async () => {
      await axios.get(moviesApi).then(res => setMovies(res.data.results));
    };
    const getGenres = async () => {
      await axios.get(genreListApi).then(res => setGenre(res.data.genres));
    };
    getMovies();
    getGenres();
  }, []);

  const onEnd = async () => {
    if (selectedGenre.length > 0) return;
    setYear(year + 1);
    const yearApi = `https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100`;
    const yearData = await axios.get(yearApi).then(res => res.data.results);
    setMovies(m => m.concat(yearData));
  };

  const onStart = async () => {
    if (selectedGenre.length > 0) return;
    setYear(year - 1);
    const yearApi = `https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=${year}&page=1&vote_count.gte=100`;
    const yearData = await axios.get(yearApi).then(res => res.data.results);

    setMovies(m => {
      return yearData.concat(m);
    });
  };

  const filterMovies = useCallback(() => {
    const filteredMovies = movies.filter((movie: any) => {
      const deepFilter = movie.genre_ids.filter((id: number) =>
        selectedGenre.includes(id),
      );
      return deepFilter.length > 0;
    });
    setGenreBasedMovies(filteredMovies);
  }, [selectedGenre, movies]);

  useEffect(() => {
    if (selectedGenre.length > 0) {
      filterMovies();
    }
  }, [selectedGenre.length, filterMovies]);

  const selectGenre = (movieGenre: number) => {
    setSelectedGenre(prevGenre => {
      if (!prevGenre.includes(movieGenre)) {
        return [...prevGenre, movieGenre];
      }
      return [...prevGenre.filter(item => item !== movieGenre)];
    });
  };

  const renderGenre = ({ item }: { item: any }) => {
    const genreStyles = () => {
      return StyleSheet.create({
        genre: {
          padding: 5,
          marginHorizontal: 5,
          marginVertical: 8,
          backgroundColor: selectedGenre.includes(item.id) ? 'white' : 'gray',
          borderRadius: 10,
        },
        genreText: {
          color: selectedGenre.includes(item.id) ? 'black' : 'white',
        },
      });
    };

    return (
      <Pressable
        style={{ ...genreStyles().genre }}
        onPress={() => selectGenre(item.id)}>
        <Text style={{ ...genreStyles().genreText }}>{item.name}</Text>
      </Pressable>
    );
  };

  const renderItem = ({ item }: { item: any }) => {
    return <MovieCard movieItem={item} />;
  };

  const memoizedValue = useMemo(() => renderItem, []);
  return (
    <View style={styles.main}>
      <Appbar.Header>
        <Appbar.Content title="MovieFlix" />
      </Appbar.Header>
      <View style={styles.container}>
        <RNFlatlist
          horizontal={true}
          data={genre}
          keyExtractor={item => item.name}
          renderItem={renderGenre}
          showsHorizontalScrollIndicator={false}
        />
        <FlatList
          scrollsToTop={false}
          initialNumToRender={20}
          maxToRenderPerBatch={40}
          showsVerticalScrollIndicator={false}
          onEndReached={onEnd}
          onStartReached={onStart}
          data={selectedGenre.length > 0 ? genreBasedMovies : movies}
          renderItem={memoizedValue}
          keyExtractor={item => item.id}
          numColumns={2}
        />
      </View>
    </View>
  );
};

export default Home;
