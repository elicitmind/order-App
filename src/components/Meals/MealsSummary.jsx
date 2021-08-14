import React from 'react';
import styles from './MealsSummary.module.css';

const MealsSummary = () => {
  return (
    <section className={styles.summary}>
      <h2>Health source, Provided To You</h2>
      <p>
        Choose your Health meal from our organic selection of available meals
        and enjoy the Real Medicine for your body.
      </p>
      <p>
        All our meals are cooked with high-quality ingredients, just-in-time and
        of course by experienced chefs!
      </p>
    </section>
  );
};

export default MealsSummary;
