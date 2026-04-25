import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () => import('./pages/auth/login/login').then(m => m.Login),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/auth/register/register').then(m => m.Register),
  },
  {
    path: 'forgot-password',
    loadComponent: () => import('./pages/auth/forgot-password/forgot-password').then(m => m.ForgotPassword),
  },
  {
    path: 'reset-password',
    loadComponent: () => import('./pages/auth/reset-password/reset-password').then(m => m.ResetPassword),
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home/home').then(m => m.Home),
  },
  {
    path: 'notifications',
    loadComponent: () => import('./pages/notifications/notifications/notifications').then(m => m.Notifications),
  },
  {
    path: 'workout-plans',
    loadComponent: () => import('./pages/workout/workout-plans/workout-plans').then(m => m.WorkoutPlans),
  },
  {
    path: 'workout-plans/generate',
    loadComponent: () => import('./pages/workout/workout-generator/workout-generator').then(m => m.WorkoutGenerator),
  },
  {
    path: 'workout-plans/detail',
    loadComponent: () => import('./pages/workout/workout-detail/workout-detail').then(m => m.WorkoutDetail),
  },
  {
    path: 'workout-history',
    loadComponent: () => import('./pages/workout/workout-history/workout-history').then(m => m.WorkoutHistory),
  },
  {
    path: 'diet-plan',
    loadComponent: () => import('./pages/diet/diet-plan-generator/diet-plan-generator').then(m => m.DietPlanGenerator),
  },
  {
    path: 'food-diary',
    loadComponent: () => import('./pages/diet/food-diary/food-diary').then(m => m.FoodDiary),
  },
  {
    path: 'manual-meal',
    loadComponent: () => import('./pages/diet/manual-meal/manual-meal').then(m => m.ManualMeal),
  },
  {
    path: 'image-analysis',
    loadComponent: () => import('./pages/diet/image-analysis/image-analysis').then(m => m.ImageAnalysis),
  },
  { path: '**', redirectTo: 'login' },
];
