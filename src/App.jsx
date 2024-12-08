import  { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem("habits");
    return savedHabits ? JSON.parse(savedHabits) : [];
  });
  const [newHabit, setNewHabit] = useState("");

  // Save habits to LocalStorage
  useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habits));
  }, [habits]);

  // Add a new habit
  const addHabit = () => {
    if (newHabit.trim() === "") return;
    const habit = {
      id: Date.now(),
      name: newHabit,
      streak: 0,
      progress: 0, // progress in percentage
    };
    setHabits([...habits, habit]);
    setNewHabit("");
  };

  // Mark habit as completed
  const completeHabit = (id) => {
    setHabits(
      habits.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              streak: habit.streak + 1,
              progress: ((habit.streak + 1) / 7) * 100,
            }
          : habit
      )
    );
  };

  // Remove a habit
  const removeHabit = (id) => {
    setHabits(habits.filter((habit) => habit.id !== id));
  };

  return (
    <div className="app">
      <h1>Habit Tracker</h1>
      <div className="add-habit">
        <input
          type="text"
          placeholder="New habit (e.g., Exercise)"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />
        <button onClick={addHabit}>Add</button>
      </div>

      <div className="habit-list">
        {habits.length > 0 ? (
          habits.map((habit) => (
            <div key={habit.id} className="habit-card">
              <h3>{habit.name}</h3>
              <div className="progress-bar">
                <div
                  className="progress"
                  style={{ width: `${habit.progress}%` }}
                ></div>
              </div>
              <p>Streak: {habit.streak} days</p>
              <button onClick={() => completeHabit(habit.id)}>Mark Done</button>
              <button className="remove" onClick={() => removeHabit(habit.id)}>
                Remove
              </button>
            </div>
          ))
        ) : (
          <p>No habits added yet!</p>
        )}
      </div>
    </div>
  );
};

export default App;
