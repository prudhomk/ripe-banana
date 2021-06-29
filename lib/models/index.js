import Film from './Film';
import Review from './Review';

// Film.hasOne(Review, {
//   foreignKey: 'film'
// });

Film.hasMany(Review, { 
  foreignKey: 'film',
  allowNull: false
});
