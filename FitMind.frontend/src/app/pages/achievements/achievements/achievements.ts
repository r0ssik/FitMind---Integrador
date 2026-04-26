import { Component, signal, computed } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router } from '@angular/router';

type AchievCategory = 'all' | 'workout' | 'diet' | 'streak' | 'challenge';

interface Achievement {
  id:          number;
  icon:        string;
  title:       string;
  description: string;
  category:    AchievCategory;
  unlocked:    boolean;
  unlockedAt?: string;
  progress?:   number;   // 0–100 when still locked
  rare:        boolean;
}

@Component({
  selector: 'app-achievements',
  imports: [DecimalPipe],
  templateUrl: './achievements.html',
  styleUrl:    './achievements.scss',
})
export class Achievements {
  constructor(private router: Router) {}

  filter = signal<AchievCategory>('all');

  shareTarget = signal<Achievement | null>(null);
  shareCopied = signal(false);

  readonly categories: { key: AchievCategory; label: string; icon: string }[] = [
    { key: 'all',       label: 'Todas',    icon: '🏅' },
    { key: 'workout',   label: 'Treino',   icon: '🏋️' },
    { key: 'diet',      label: 'Dieta',    icon: '🥗' },
    { key: 'streak',    label: 'Sequência',icon: '🔥' },
    { key: 'challenge', label: 'Desafio',  icon: '🏆' },
  ];

  readonly allAchievements: Achievement[] = [
    // Workout
    { id:1,  icon:'🏋️', title:'Primeiro Treino',       description:'Completou seu primeiro treino',          category:'workout',   unlocked:true,  unlockedAt:'01/02/2025', rare:false },
    { id:2,  icon:'💪', title:'10 Treinos',             description:'Completou 10 treinos no total',          category:'workout',   unlocked:true,  unlockedAt:'15/02/2025', rare:false },
    { id:3,  icon:'🔩', title:'50 Treinos',             description:'Completou 50 treinos no total',          category:'workout',   unlocked:false, progress:48,             rare:false },
    { id:4,  icon:'🦾', title:'100 Treinos',            description:'Completou 100 treinos — lendário!',      category:'workout',   unlocked:false, progress:24,             rare:true  },
    { id:5,  icon:'⏱️', title:'Maratonista',            description:'Treino com mais de 90 min',              category:'workout',   unlocked:true,  unlockedAt:'22/03/2025', rare:false },
    { id:6,  icon:'🌅', title:'Madrugador',             description:'Treinou antes das 7h da manhã',          category:'workout',   unlocked:true,  unlockedAt:'10/03/2025', rare:false },
    // Diet
    { id:7,  icon:'🥗', title:'Dieta Limpa',            description:'Atingiu a meta calórica por 7 dias',     category:'diet',      unlocked:true,  unlockedAt:'20/02/2025', rare:false },
    { id:8,  icon:'💧', title:'Hidratado',              description:'Bebeu 2L de água por 30 dias seguidos',  category:'diet',      unlocked:false, progress:60,             rare:false },
    { id:9,  icon:'🥦', title:'Verde Todo Dia',         description:'Registrou vegetais por 14 dias',         category:'diet',      unlocked:true,  unlockedAt:'05/04/2025', rare:false },
    { id:10, icon:'🍽️', title:'Chef FitMind',           description:'Registrou 200 refeições',                category:'diet',      unlocked:false, progress:35,             rare:true  },
    // Streak
    { id:11, icon:'🔥', title:'Sequência de 7 dias',    description:'Treinou 7 dias consecutivos',            category:'streak',    unlocked:true,  unlockedAt:'12/02/2025', rare:false },
    { id:12, icon:'🌋', title:'Sequência de 30 dias',   description:'Treinou 30 dias consecutivos',           category:'streak',    unlocked:true,  unlockedAt:'04/04/2025', rare:true  },
    { id:13, icon:'💫', title:'Sequência de 60 dias',   description:'Treinou 60 dias consecutivos',           category:'streak',    unlocked:false, progress:47,             rare:true  },
    // Challenge
    { id:14, icon:'🏆', title:'Desafiador',             description:'Participou do primeiro desafio',         category:'challenge', unlocked:true,  unlockedAt:'01/03/2025', rare:false },
    { id:15, icon:'🥇', title:'Campeão',                description:'Venceu um desafio em grupo',             category:'challenge', unlocked:true,  unlockedAt:'28/03/2025', rare:true  },
    { id:16, icon:'⚔️', title:'Veterano',               description:'Completou 5 desafios',                   category:'challenge', unlocked:false, progress:60,             rare:false },
  ];

  filtered = computed(() => {
    const f = this.filter();
    return f === 'all' ? this.allAchievements : this.allAchievements.filter(a => a.category === f);
  });

  unlocked = computed(() => this.allAchievements.filter(a => a.unlocked));
  locked   = computed(() => this.allAchievements.filter(a => !a.unlocked));

  filteredUnlocked = computed(() => this.filtered().filter(a =>  a.unlocked));
  filteredLocked   = computed(() => this.filtered().filter(a => !a.unlocked));

  // ── Share ─────────────────────────────────────────────────────────────────────

  openShare(a: Achievement): void {
    if (!a.unlocked) return;
    this.shareTarget.set(a);
    this.shareCopied.set(false);
  }

  closeShare(): void { this.shareTarget.set(null); }

  copyShare(): void {
    const a = this.shareTarget();
    if (!a) return;
    const text = `Acabei de ganhar a conquista "${a.title}" no FitMind! ${a.icon} #FitMind #Fitness`;
    navigator.clipboard?.writeText(text).catch(() => {});
    this.shareCopied.set(true);
    setTimeout(() => this.shareCopied.set(false), 2000);
  }

  goBack(): void { this.router.navigate(['/home']); }
}
