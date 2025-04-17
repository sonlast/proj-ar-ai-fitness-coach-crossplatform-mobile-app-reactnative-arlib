import { WorkoutData, WorkoutTitle } from "@/types/workout";
// EXPORT WORKOUTS FROM HERE

export const workoutImages = {
  'Push Ups': require('../assets/images/workouts/push_ups/push_ups.jpg'),
  'Sit Ups': require('../assets/images/workouts/push_ups/push_ups.jpg'),
  'Planks': require('../assets/images/workouts/push_ups/push_ups.jpg'),
  'Squats': require('../assets/images/workouts/push_ups/push_ups.jpg'),
  'Pull Ups': require('../assets/images/workouts/push_ups/push_ups.jpg'),
  'Lunges': require('../assets/images/workouts/push_ups/push_ups.jpg'),
  'Burpees': require('../assets/images/workouts/push_ups/push_ups.jpg'),
  'Jumping Jacks': require('../assets/images/workouts/push_ups/push_ups.jpg'),
  'Mountain Climbers': require('../assets/images/workouts/push_ups/push_ups.jpg'),
  'High Knees': require('../assets/images/workouts/push_ups/push_ups.jpg'),
}

export const workouts: WorkoutData[] = [
  {
    id: '1',
    title: 'Push Ups',
    workoutDesc: 'Push ups are a great way to work out your chest, shoulders, and triceps.',
  },
  {
    id: '2',
    title: 'Sit Ups',
    workoutDesc: 'Sit ups are a great way to work out your core.',
  },
  {
    id: '3',
    title: 'Planks',
    workoutDesc: 'Planks are a great way to work out your core.',
  },
  {
    id: '4',
    title: 'Squats',
    workoutDesc: 'Squats are a great way to work out your legs.',
  },
  {
    id: '5',
    title: 'Pull Ups',
    workoutDesc: 'Pull ups are a great way to work out your back and biceps.',
  },
  {
    id: '6',
    title: 'Lunges',
    workoutDesc: 'Lunges are a great way to work out your legs.',
  },
  {
    id: '7',
    title: 'Burpees',
    workoutDesc: 'Burpees are a great way to work out your whole body.',
  },
  {
    id: '8',
    title: 'Jumping Jacks',
    workoutDesc: 'Jumping jacks are a great way to work out your whole body.',
  },
  {
    id: '9',
    title: 'Mountain Climbers',
    workoutDesc: 'Mountain climbers are a great way to work out your whole body.',
  },
  {
    id: '10',
    title: 'High Knees',
    workoutDesc: 'High knees are a great way to work out your whole body.',
  },
]
