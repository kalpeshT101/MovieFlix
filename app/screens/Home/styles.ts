import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start', // if you want to fill rows left to right
  },
  card: {
    width: '50%',
    borderRadius: 10,
  },
  genre: {
    padding: 5,
    marginHorizontal: 5,
    marginVertical: 8,
    backgroundColor: 'gray',
    borderRadius: 10,
  },
  genreText: {
    color: 'white',
  },
  movieImage: {
    aspectRatio: 0.7,
    resizeMode: 'contain',
    borderRadius: 10,
    marginVertical: 5,
  },
  content: { flexDirection: 'row', justifyContent: 'space-between' },
  title: {
    paddingTop: 5,
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
  pressable: {
    flex: 1,
  },
  desc: {
    height: '100%',
    alignItems: 'center',
    padding: 5,
    borderRadius: 10,
    backgroundColor: 'gray',
  },
  descr: {
    color: 'white',
    textAlign: 'center',
    paddingVertical: 10,
  },
});

export default styles;
