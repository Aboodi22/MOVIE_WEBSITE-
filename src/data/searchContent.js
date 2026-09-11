const OMDB_KEY = '390c6805';

// 🏆 TOP 150 HIGHEST RATED MOVIES — Highest Rating First
const FEATURED = [
  { id: 'tt0111161', imdb_id: 'tt0111161', title: 'The Shawshank Redemption', year: '1994', rating: 9.3, type: 'movie' },
  { id: 'tt0068646', imdb_id: 'tt0068646', title: 'The Godfather', year: '1972', rating: 9.2, type: 'movie' },
  { id: 'tt0468569', imdb_id: 'tt0468569', title: 'The Dark Knight', year: '2008', rating: 9.0, type: 'movie' },
  { id: 'tt0071562', imdb_id: 'tt0071562', title: 'The Godfather Part II', year: '1974', rating: 9.0, type: 'movie' },
  { id: 'tt0050083', imdb_id: 'tt0050083', title: '12 Angry Men', year: '1957', rating: 9.0, type: 'movie' },
  { id: 'tt0108052', imdb_id: 'tt0108052', title: 'Schindler\'s List', year: '1993', rating: 8.9, type: 'movie' },
  { id: 'tt0167260', imdb_id: 'tt0167260', title: 'The Lord of the Rings: The Return of the King', year: '2003', rating: 8.9, type: 'movie' },
  { id: 'tt0110912', imdb_id: 'tt0110912', title: 'Pulp Fiction', year: '1994', rating: 8.9, type: 'movie' },
  { id: 'tt0063350', imdb_id: 'tt0063350', title: 'The Good, the Bad and the Ugly', year: '1966', rating: 8.8, type: 'movie' },
  { id: 'tt0120737', imdb_id: 'tt0120737', title: 'The Lord of the Rings: The Fellowship of the Ring', year: '2001', rating: 8.8, type: 'movie' },
  { id: 'tt1375666', imdb_id: 'tt1375666', title: 'Inception', year: '2010', rating: 8.8, type: 'movie' },
  { id: 'tt0133093', imdb_id: 'tt0133093', title: 'The Matrix', year: '1999', rating: 8.7, type: 'movie' },
  { id: 'tt0109830', imdb_id: 'tt0109830', title: 'Forrest Gump', year: '1994', rating: 8.7, type: 'movie' },
  { id: 'tt0088763', imdb_id: 'tt0088763', title: 'Back to the Future', year: '1985', rating: 8.7, type: 'movie' },
  { id: 'tt0167261', imdb_id: 'tt0167261', title: 'The Lord of the Rings: The Two Towers', year: '2002', rating: 8.7, type: 'movie' },
  { id: 'tt0078788', imdb_id: 'tt0078788', title: 'Star Wars: Episode IV - A New Hope', year: '1977', rating: 8.6, type: 'movie' },
  { id: 'tt0047478', imdb_id: 'tt0047478', title: 'Seven Samurai', year: '1954', rating: 8.6, type: 'movie' },
  { id: 'tt0317248', imdb_id: 'tt0317248', title: 'City of God', year: '2002', rating: 8.6, type: 'movie' },
  { id: 'tt0241527', imdb_id: 'tt0241527', title: 'Spirited Away', year: '2001', rating: 8.6, type: 'movie' },
  { id: 'tt0086250', imdb_id: 'tt0086250', title: 'Star Wars: Episode V - The Empire Strikes Back', year: '1980', rating: 8.5, type: 'movie' },
  { id: 'tt0054357', imdb_id: 'tt0054357', title: 'Once Upon a Time in the West', year: '1968', rating: 8.5, type: 'movie' },
  { id: 'tt0114369', imdb_id: 'tt0114369', title: 'Star Wars: Episode VI - Return of the Jedi', year: '1983', rating: 8.5, type: 'movie' },
  { id: 'tt0118799', imdb_id: 'tt0118799', title: 'Life Is Beautiful', year: '1997', rating: 8.5, type: 'movie' },
  { id: 'tt0034583', imdb_id: 'tt0034583', title: 'It\'s a Wonderful Life', year: '1946', rating: 8.5, type: 'movie' },
  { id: 'tt0082971', imdb_id: 'tt0082971', title: 'Raiders of the Lost Ark', year: '1981', rating: 8.4, type: 'movie' },
  { id: 'tt0120815', imdb_id: 'tt0120815', title: 'The Usual Suspects', year: '1995', rating: 8.4, type: 'movie' },
  { id: 'tt0081398', imdb_id: 'tt0081398', title: 'The Shining', year: '1980', rating: 8.4, type: 'movie' },
  { id: 'tt0102926', imdb_id: 'tt0102926', title: 'The Silence of the Lambs', year: '1991', rating: 8.4, type: 'movie' },
  { id: 'tt0073486', imdb_id: 'tt0073486', title: 'Apocalypse Now', year: '1979', rating: 8.4, type: 'movie' },
  { id: 'tt0075314', imdb_id: 'tt0075314', title: 'Jaws', year: '1975', rating: 8.3, type: 'movie' },
  { id: 'tt0056014', imdb_id: 'tt0056014', title: 'Psycho', year: '1960', rating: 8.5, type: 'movie' },
  { id: 'tt0117951', imdb_id: 'tt0117951', title: 'Memento', year: '2000', rating: 8.4, type: 'movie' },
  { id: 'tt0245429', imdb_id: 'tt0245429', title: 'Howl\'s Moving Castle', year: '2004', rating: 8.4, type: 'movie' },
  { id: 'tt0120689', imdb_id: 'tt0120689', title: 'Fight Club', year: '1999', rating: 8.4, type: 'movie' },
  { id: 'tt0080684', imdb_id: 'tt0080684', title: 'Star Wars: Episode VI - Return of the Jedi', year: '1983', rating: 8.4, type: 'movie' },
  { id: 'tt0099685', imdb_id: 'tt0099685', title: 'Reservoir Dogs', year: '1992', rating: 8.3, type: 'movie' },
  { id: 'tt0077416', imdb_id: 'tt0077416', title: 'Taxi Driver', year: '1976', rating: 8.3, type: 'movie' },
  { id: 'tt0047396', imdb_id: 'tt0047396', title: 'Rear Window', year: '1954', rating: 8.4, type: 'movie' },
  { id: 'tt0053125', imdb_id: 'tt0053125', title: 'Vertigo', year: '1958', rating: 8.3, type: 'movie' },
  { id: 'tt0060196', imdb_id: 'tt0060196', title: 'The Great Escape', year: '1963', rating: 8.2, type: 'movie' },
  { id: 'tt0057565', imdb_id: 'tt0057565', title: 'Dr. Strangelove', year: '1964', rating: 8.4, type: 'movie' },
  { id: 'tt0095327', imdb_id: 'tt0095327', title: 'Cinema Paradiso', year: '1988', rating: 8.5, type: 'movie' },
  { id: 'tt0253797', imdb_id: 'tt0253797', title: 'The Pianist', year: '2002', rating: 8.5, type: 'movie' },
  { id: 'tt0361748', imdb_id: 'tt0361748', title: 'Gladiator', year: '2000', rating: 8.5, type: 'movie' },
  { id: 'tt0407887', imdb_id: 'tt0407887', title: 'The Departed', year: '2006', rating: 8.5, type: 'movie' },
  { id: 'tt0482571', imdb_id: 'tt0482571', title: 'The Prestige', year: '2006', rating: 8.5, type: 'movie' },
  { id: 'tt0758758', imdb_id: 'tt0758758', title: 'The Lives of Others', year: '2006', rating: 8.5, type: 'movie' },
  { id: 'tt0816692', imdb_id: 'tt0816692', title: 'Interstellar', year: '2014', rating: 8.7, type: 'movie' },
  { id: 'tt0816692', imdb_id: 'tt0816692', title: 'Interstellar', year: '2014', rating: 8.7, type: 'movie' },
  { id: 'tt0910904', imdb_id: 'tt0910904', title: 'Up', year: '2009', rating: 8.3, type: 'movie' },
  { id: 'tt0435761', imdb_id: 'tt0435761', title: 'Toy Story 3', year: '2010', rating: 8.3, type: 'movie' },
  { id: 'tt0086190', imdb_id: 'tt0086190', title: 'Aliens', year: '1986', rating: 8.4, type: 'movie' },
  { id: 'tt0087843', imdb_id: 'tt0087843', title: 'Amadeus', year: '1984', rating: 8.4, type: 'movie' },
  { id: 'tt0093058', imdb_id: 'tt0093058', title: 'Grave of the Fireflies', year: '1988', rating: 8.5, type: 'movie' },
  { id: 'tt0119217', imdb_id: 'tt0119217', title: 'Good Will Hunting', year: '1997', rating: 8.3, type: 'movie' },
  { id: 'tt0120586', imdb_id: 'tt0120586', title: 'L.A. Confidential', year: '1997', rating: 8.3, type: 'movie' },
  { id: 'tt0137523', imdb_id: 'tt0137523', title: 'American Beauty', year: '1999', rating: 8.3, type: 'movie' },
  { id: 'tt0180093', imdb_id: 'tt0180093', title: 'Mulan', year: '1998', rating: 7.6, type: 'movie' },
  { id: 'tt0266543', imdb_id: 'tt0266543', title: 'Finding Nemo', year: '2003', rating: 8.1, type: 'movie' },
  { id: 'tt0332452', imdb_id: 'tt0332452', title: 'Eternal Sunshine of the Spotless Mind', year: '2004', rating: 8.3, type: 'movie' },
  { id: 'tt0353969', imdb_id: 'tt0353969', title: 'Downfall', year: '2004', rating: 8.3, type: 'movie' },
  { id: 'tt0405094', imdb_id: 'tt0405094', title: 'The Dark Knight Rises', year: '2012', rating: 8.4, type: 'movie' },
  { id: 'tt0457730', imdb_id: 'tt0457730', title: 'WALL·E', year: '2008', rating: 8.4, type: 'movie' },
  { id: 'tt0499549', imdb_id: 'tt0499549', title: 'Avatar', year: '2009', rating: 7.9, type: 'movie' },
  { id: 'tt1049413', imdb_id: 'tt1049413', title: 'The King\'s Speech', year: '2010', rating: 8.0, type: 'movie' },
  { id: 'tt1187043', imdb_id: 'tt1187043', title: 'Inglourious Basterds', year: '2009', rating: 8.4, type: 'movie' },
  { id: 'tt1205489', imdb_id: 'tt1205489', title: 'The Social Network', year: '2010', rating: 7.7, type: 'movie' },
  { id: 'tt1305806', imdb_id: 'tt1305806', title: 'Django Unchained', year: '2012', rating: 8.4, type: 'movie' },
  { id: 'tt1663202', imdb_id: 'tt1663202', title: 'The Wolf of Wall Street', year: '2013', rating: 8.2, type: 'movie' },
  { id: 'tt1853728', imdb_id: 'tt1853728', title: 'Interstellar', year: '2014', rating: 8.7, type: 'movie' },
  { id: 'tt2278380', imdb_id: 'tt2278380', title: 'Oppenheimer', year: '2023', rating: 8.4, type: 'movie' },
  { id: 'tt4154796', imdb_id: 'tt4154796', title: 'Avengers: Endgame', year: '2019', rating: 8.4, type: 'movie' },
  { id: 'tt0021749', imdb_id: 'tt0021749', title: 'Modern Times', year: '1936', rating: 8.5, type: 'movie' },
  { id: 'tt0032553', imdb_id: 'tt0032553', title: 'The Great Dictator', year: '1940', rating: 8.4, type: 'movie' },
  { id: 'tt0036775', imdb_id: 'tt0036775', title: 'The Big Sleep', year: '1946', rating: 7.9, type: 'movie' },
  { id: 'tt0042876', imdb_id: 'tt0042876', title: 'The Third Man', year: '1949', rating: 8.1, type: 'movie' },
  { id: 'tt0044079', imdb_id: 'tt0044079', title: 'Rashomon', year: '1950', rating: 8.2, type: 'movie' },
  { id: 'tt0046915', imdb_id: 'tt0046915', title: 'All About Eve', year: '1950', rating: 8.2, type: 'movie' },
  { id: 'tt0050986', imdb_id: 'tt0050986', title: 'Singin\' in the Rain', year: '1952', rating: 8.3, type: 'movie' },
  { id: 'tt0052357', imdb_id: 'tt0052357', title: 'The Wages of Fear', year: '1953', rating: 8.7, type: 'movie' },
  { id: 'tt0055041', imdb_id: 'tt0055041', title: 'Seven Samurai', year: '1954', rating: 8.6, type: 'movie' },
  { id: 'tt0056142', imdb_id: 'tt0056142', title: 'The Bridge on the River Kwai', year: '1957', rating: 8.1, type: 'movie' },
  { id: 'tt0057115', imdb_id: 'tt0057115', title: 'Paths of Glory', year: '1957', rating: 8.4, type: 'movie' },
  { id: 'tt0061184', imdb_id: 'tt0061184', title: 'Lawrence of Arabia', year: '1962', rating: 8.3, type: 'movie' },
  { id: 'tt0062622', imdb_id: 'tt0062622', title: 'Dr. Strangelove', year: '1964', rating: 8.4, type: 'movie' },
  { id: 'tt0064116', imdb_id: 'tt0064116', title: 'The Good, the Bad and the Ugly', year: '1966', rating: 8.8, type: 'movie' },
  { id: 'tt0066473', imdb_id: 'tt0066473', title: 'Once Upon a Time in the West', year: '1968', rating: 8.5, type: 'movie' },
  { id: 'tt0069214', imdb_id: 'tt0069214', title: 'Butch Cassidy and the Sundance Kid', year: '1969', rating: 7.9, type: 'movie' },
  { id: 'tt0070047', imdb_id: 'tt0070047', title: 'The Wild Bunch', year: '1969', rating: 7.9, type: 'movie' },
  { id: 'tt0071853', imdb_id: 'tt0071853', title: 'A Clockwork Orange', year: '1971', rating: 8.3, type: 'movie' },
  { id: 'tt0072684', imdb_id: 'tt0072684', title: 'The Godfather', year: '1972', rating: 9.2, type: 'movie' },
  { id: 'tt0073195', imdb_id: 'tt0073195', title: 'Solaris', year: '1972', rating: 8.1, type: 'movie' },
  { id: 'tt0074958', imdb_id: 'tt0074958', title: 'The Exorcist', year: '1973', rating: 8.1, type: 'movie' },
  { id: 'tt0075148', imdb_id: 'tt0075148', title: 'Amarcord', year: '1973', rating: 7.9, type: 'movie' },
  { id: 'tt0075807', imdb_id: 'tt0075807', title: 'Chinatown', year: '1974', rating: 8.1, type: 'movie' },
  { id: 'tt0076759', imdb_id: 'tt0076759', title: 'Monty Python and the Holy Grail', year: '1975', rating: 8.2, type: 'movie' },
  { id: 'tt0078748', imdb_id: 'tt0078748', title: 'Taxi Driver', year: '1976', rating: 8.3, type: 'movie' },
  { id: 'tt0079470', imdb_id: 'tt0079470', title: 'Network', year: '1976', rating: 8.1, type: 'movie' },
  { id: 'tt0080678', imdb_id: 'tt0080678', title: 'Alien', year: '1979', rating: 8.4, type: 'movie' },
  { id: 'tt0081505', imdb_id: 'tt0081505', title: 'Apocalypse Now', year: '1979', rating: 8.4, type: 'movie' },
  { id: 'tt0082096', imdb_id: 'tt0082096', title: 'The Elephant Man', year: '1980', rating: 8.2, type: 'movie' },
  { id: 'tt0083987', imdb_id: 'tt0083987', title: 'Raiders of the Lost Ark', year: '1981', rating: 8.4, type: 'movie' },
  { id: 'tt0084707', imdb_id: 'tt0084707', title: 'E.T. the Extra-Terrestrial', year: '1982', rating: 7.9, type: 'movie' },
  { id: 'tt0086250', imdb_id: 'tt0086250', title: 'Star Wars: Episode V', year: '1980', rating: 8.5, type: 'movie' },
  { id: 'tt0087544', imdb_id: 'tt0087544', title: 'The Thing', year: '1982', rating: 8.1, type: 'movie' },
  { id: 'tt0088247', imdb_id: 'tt0088247', title: 'Once Upon a Time in America', year: '1984', rating: 8.3, type: 'movie' },
  { id: 'tt0090605', imdb_id: 'tt0090605', title: 'Back to the Future', year: '1985', rating: 8.7, type: 'movie' },
  { id: 'tt0091763', imdb_id: 'tt0091763', title: 'Full Metal Jacket', year: '1987', rating: 8.3, type: 'movie' },
  { id: 'tt0093603', imdb_id: 'tt0093603', title: 'The Princess Bride', year: '1987', rating: 8.1, type: 'movie' },
  { id: 'tt0094625', imdb_id: 'tt0094625', title: 'Cinema Paradiso', year: '1988', rating: 8.5, type: 'movie' },
  { id: 'tt0095016', imdb_id: 'tt0095016', title: 'Die Hard', year: '1988', rating: 8.2, type: 'movie' },
  { id: 'tt0095765', imdb_id: 'tt0095765', title: 'My Neighbor Totoro', year: '1988', rating: 8.1, type: 'movie' },
  { id: 'tt0096283', imdb_id: 'tt0096283', title: 'Born on the Fourth of July', year: '1989', rating: 7.2, type: 'movie' },
  { id: 'tt0097576', imdb_id: 'tt0097576', title: 'Indiana Jones and the Last Crusade', year: '1989', rating: 8.2, type: 'movie' },
  { id: 'tt0099348', imdb_id: 'tt0099348', title: 'Goodfellas', year: '1990', rating: 8.7, type: 'movie' },
  { id: 'tt0100164', imdb_id: 'tt0100164', title: 'The Silence of the Lambs', year: '1991', rating: 8.4, type: 'movie' },
  { id: 'tt0102685', imdb_id: 'tt0102685', title: 'Terminator 2', year: '1991', rating: 8.6, type: 'movie' },
  { id: 'tt0103064', imdb_id: 'tt0103064', title: 'JFK', year: '1991', rating: 8.0, type: 'movie' },
  { id: 'tt0105236', imdb_id: 'tt0105236', title: 'Reservoir Dogs', year: '1992', rating: 8.3, type: 'movie' },
  { id: 'tt0107290', imdb_id: 'tt0107290', title: 'Unforgiven', year: '1992', rating: 8.2, type: 'movie' },
  { id: 'tt0110357', imdb_id: 'tt0110357', title: 'The Lion King', year: '1994', rating: 8.5, type: 'movie' },
  { id: 'tt0112573', imdb_id: 'tt0112573', title: 'Pulp Fiction', year: '1994', rating: 8.9, type: 'movie' },
  { id: 'tt0114814', imdb_id: 'tt0114814', title: 'The Usual Suspects', year: '1995', rating: 8.4, type: 'movie' },
  { id: 'tt0119177', imdb_id: 'tt0119177', title: 'Seven', year: '1995', rating: 8.6, type: 'movie' },
  { id: 'tt0114388', imdb_id: 'tt0114388', title: 'Se7en', year: '1995', rating: 8.6, type: 'movie' },
  { id: 'tt0118799', imdb_id: 'tt0118799', title: 'Life Is Beautiful', year: '1997', rating: 8.5, type: 'movie' },
  { id: 'tt0119217', imdb_id: 'tt0119217', title: 'Good Will Hunting', year: '1997', rating: 8.3, type: 'movie' },
  { id: 'tt0120737', imdb_id: 'tt0120737', title: 'The Lord of the Rings: The Fellowship of the Ring', year: '2001', rating: 8.8, type: 'movie' },
  { id: 'tt0120815', imdb_id: 'tt0120815', title: 'The Usual Suspects', year: '1995', rating: 8.4, type: 'movie' },
  { id: 'tt0121765', imdb_id: 'tt0121765', title: 'Star Wars: Episode I', year: '1999', rating: 6.5, type: 'movie' },
  { id: 'tt0129167', imdb_id: 'tt0129167', title: 'The Sixth Sense', year: '1999', rating: 8.1, type: 'movie' },
  { id: 'tt0133093', imdb_id: 'tt0133093', title: 'The Matrix', year: '1999', rating: 8.7, type: 'movie' },
  { id: 'tt0134906', imdb_id: 'tt0134906', title: 'Toy Story 2', year: '1999', rating: 8.2, type: 'movie' },
  { id: 'tt0167434', imdb_id: 'tt0167434', title: 'Memento', year: '2000', rating: 8.4, type: 'movie' },
  { id: 'tt0172495', imdb_id: 'tt0172495', title: 'Gladiator', year: '2000', rating: 8.5, type: 'movie' },
  { id: 'tt0241527', imdb_id: 'tt0241527', title: 'Spirited Away', year: '2001', rating: 8.6, type: 'movie' },
  { id: 'tt0266543', imdb_id: 'tt0266543', title: 'Finding Nemo', year: '2003', rating: 8.1, type: 'movie' },
  { id: 'tt0317248', imdb_id: 'tt0317248', title: 'City of God', year: '2002', rating: 8.6, type: 'movie' },
  { id: 'tt0325980', imdb_id: 'tt0325980', title: 'Pirates of the Caribbean', year: '2003', rating: 8.1, type: 'movie' },
  { id: 'tt0363689', imdb_id: 'tt0363689', title: 'The Pianist', year: '2002', rating: 8.5, type: 'movie' },
  { id: 'tt0405508', imdb_id: 'tt0405508', title: 'Batman Begins', year: '2005', rating: 8.2, type: 'movie' },
  { id: 'tt0468569', imdb_id: 'tt0468569', title: 'The Dark Knight', year: '2008', rating: 9.0, type: 'movie' },
  { id: 'tt0816692', imdb_id: 'tt0816692', title: 'Interstellar', year: '2014', rating: 8.7, type: 'movie' },
  { id: 'tt0993846', imdb_id: 'tt0993846', title: 'The Wolf of Wall Street', year: '2013', rating: 8.2, type: 'movie' },
  { id: 'tt1375666', imdb_id: 'tt1375666', title: 'Inception', year: '2010', rating: 8.8, type: 'movie' },
  { id: 'tt1392214', imdb_id: 'tt1392214', title: 'The Intouchables', year: '2011', rating: 8.5, type: 'movie' },
  { id: 'tt1853728', imdb_id: 'tt1853728', title: 'Django Unchained', year: '2012', rating: 8.4, type: 'movie' },
  { id: 'tt2582802', imdb_id: 'tt2582802', title: 'Whiplash', year: '2014', rating: 8.5, type: 'movie' },
  { id: 'tt3659388', imdb_id: 'tt3659388', title: 'The Martian', year: '2015', rating: 8.0, type: 'movie' },
  { id: 'tt4154756', imdb_id: 'tt4154756', title: 'Avengers: Infinity War', year: '2018', rating: 8.4, type: 'movie' },
  { id: 'tt4574334', imdb_id: 'tt4574334', title: 'Stranger Things', year: '2016', rating: 8.7, type: 'movie' },
  { id: 'tt7286456', imdb_id: 'tt7286456', title: 'Joker', year: '2019', rating: 8.4, type: 'movie' },
  { id: 'tt7784604', imdb_id: 'tt7784604', title: 'Hamilton', year: '2020', rating: 8.4, type: 'movie' },
  { id: 'tt8948778', imdb_id: 'tt8948778', title: 'Knives Out', year: '2019', rating: 7.9, type: 'movie' },
  { id: 'tt9362722', imdb_id: 'tt9362722', title: 'Spider-Man: Across the Spider-Verse', year: '2023', rating: 8.7, type: 'movie' },
];

// ✅ Sort by Highest Rating
function byRatingDescending(a, b) {
  return b.rating - a.rating;
}

// 🎯 Try OMDb Poster FIRST → Fallback to Picsum
function getPoster(movie) {
  const imdbId = movie.imdb_id || movie.imdbID;

  // ✅ FIRST: Try OMDb image API
  if (imdbId) {
    return `https://img.omdbapi.com/?apikey=${OMDB_KEY}&i=${imdbId}`;
  }

  // 🎲 FALLBACK: Beautiful random photography
  const seed = encodeURIComponent(imdbId || movie.title || 'movie');
  return `https://picsum.photos/seed/${seed}/300/450`;
}

export async function searchContent(query) {
  // ✅ HOMEPAGE — TOP 150 MOVIES!
  if (!query.trim()) {
    return FEATURED.map((movie) => ({
      ...movie,
      poster: getPoster(movie)
    })).sort(byRatingDescending);
  }

  // ✅ SEARCH — clean spaces still work
  const cleanQuery = query.trim().replace(/\s+/g, ' ');
  const encodedQuery = encodeURIComponent(cleanQuery);

  let res;
  try {
    res = await fetch(
      `https://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${encodedQuery}&type=movie`
    );
  } catch (networkError) {
    throw new Error('network');
  }

  if (!res.ok) throw new Error('network');

  const json = await res.json();
  if (json.Response === 'False') return [];

  // ✅ SEARCH RESULTS — Poster OR Beautiful Fallback
  return json.Search.map((movie) => ({
    id: movie.imdbID,
    imdb_id: movie.imdbID,
    title: movie.Title,
    year: movie.Year.slice(0, 4),
    type: 'movie',
    poster: movie.Poster && movie.Poster !== 'N/A'
      ? movie.Poster
      : `https://picsum.photos/seed/${movie.imdbID}/300/450`,
  }));
}