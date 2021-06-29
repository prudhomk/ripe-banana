import Film from './Film.js';
import Review from './Review.js';

// Film.hasOne(Review, {
//   foreignKey: 'film'
// });

Review.belongsTo(Film, {
  as: 'film'
});
