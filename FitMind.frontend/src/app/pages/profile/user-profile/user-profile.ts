import { Component, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

type ProfileTab = 'activity' | 'achievements' | 'stats';

interface UserActivity {
  id:   number;
  icon: string;
  text: string;
  time: string;
  tag:  string;
}

interface UserBadge {
  icon:  string;
  title: string;
  rare:  boolean;
}

interface ProfileData {
  id:           number;
  name:         string;
  initials:     string;
  bio:          string;
  followers:    number;
  following:    number;
  workouts:     number;
  streak:       number;
  isFollowing:  boolean;
  isMe:         boolean;
  badges:       UserBadge[];
  activity:     UserActivity[];
}

@Component({
  selector: 'app-user-profile',
  imports: [],
  templateUrl: './user-profile.html',
  styleUrl:    './user-profile.scss',
})
export class UserProfile implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  activeTab = signal<ProfileTab>('activity');
  profile   = signal<ProfileData | null>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')) || 2;
    this.profile.set(this.mockProfile(id));
  }

  private mockProfile(id: number): ProfileData {
    const profiles: Record<number, ProfileData> = {
      2: {
        id: 2, name: 'João Barros', initials: 'JB',
        bio: '🏋️ Apaixonado por musculação e vida saudável. 3 anos treinando.',
        followers: 128, following: 64, workouts: 312, streak: 47,
        isFollowing: false, isMe: false,
        badges: [
          { icon: '🔥', title: 'Sequência 30d', rare: true  },
          { icon: '💪', title: '100 Treinos',   rare: false },
          { icon: '🏆', title: 'Campeão',        rare: true  },
        ],
        activity: [
          { id:1, icon:'🏋️', text: 'Completou treino de Peito — 8 exercícios',                       time:'2h atrás',  tag:'Treino'    },
          { id:2, icon:'🏆', text: 'Ganhou conquista "Sequência de 30 dias"',                         time:'1d atrás',  tag:'Conquista' },
          { id:3, icon:'🥗', text: 'Atingiu meta calórica do dia (2200 kcal)',                         time:'1d atrás',  tag:'Dieta'     },
          { id:4, icon:'⚔️', text: 'Entrou no desafio "30 dias de treino"',                           time:'2d atrás',  tag:'Desafio'   },
          { id:5, icon:'💪', text: 'Completou treino de Costas — novo PR no Remada: 80kg',            time:'3d atrás',  tag:'Treino'    },
        ],
      },
      3: {
        id: 3, name: 'Emily Mekaru', initials: 'EM',
        bio: '🌱 Nutricionista e corredora. Foco em saúde e performance.',
        followers: 245, following: 98, workouts: 180, streak: 22,
        isFollowing: true, isMe: false,
        badges: [
          { icon: '🥗', title: 'Dieta Limpa',  rare: false },
          { icon: '🌅', title: 'Madrugador',   rare: false },
          { icon: '💫', title: '60d Streak',   rare: true  },
        ],
        activity: [
          { id:1, icon:'🏃', text: 'Completou corrida de 8km',                  time:'4h atrás',  tag:'Treino'  },
          { id:2, icon:'🥗', text: 'Registrou todas as refeições do dia',        time:'1d atrás',  tag:'Dieta'   },
          { id:3, icon:'💧', text: 'Atingiu meta de hidratação (8 copos)',        time:'2d atrás',  tag:'Água'    },
        ],
      },
    };
    return profiles[id] ?? profiles[2];
  }

  toggleFollow(): void {
    this.profile.update(p => p ? { ...p, isFollowing: !p.isFollowing, followers: p.followers + (p.isFollowing ? -1 : 1) } : p);
  }

  goBack(): void { this.router.navigate(['/social']); }
}
