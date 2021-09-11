import React, { useEffect, useState } from 'react';
import styles from './AvailableMeals.module.css';
import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      const response = await fetch(
        'https://let-s-backend-default-rtdb.europe-west1.firebasedatabase.app/MEALS.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const responseData = await response.json();
      console.log(responseData);

      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    //PROMISE ONLY way of handling an error inside of a promise!!
    fetchMeals()
      .then()
      .catch((error) => {
        setIsLoading(false);
        setHttpError(error);
      });
  }, []);

  if (isLoading) {
    return (
      <section className={styles.mealsLoading}>
        <p>LOADING..!</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={styles.mealsError}>
        <p>{httpError.message}</p>
      </section>
    );
  }

  const mealsList = meals.map((e) => (
    <MealItem
      id={e.id}
      key={e.id}
      name={e.name}
      description={e.description}
      price={e.price}
    />
  ));

  return (
    <section className={styles.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
