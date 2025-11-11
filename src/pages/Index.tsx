import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { cn } from '@/lib/utils';

type DayType = 'work' | 'weekend' | 'vacation' | 'today' | null;

interface CalendarDay {
  date: number;
  type: DayType;
  isToday: boolean;
}

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

const Index = () => {
  const [activeTab, setActiveTab] = useState<'calendar' | 'tasks'>('calendar');
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Проверить материалы на объекте', completed: false },
    { id: 2, title: 'Согласовать график смен', completed: true },
    { id: 3, title: 'Заказать инструменты', completed: false },
    { id: 4, title: 'Провести инструктаж бригады', completed: false },
    { id: 5, title: 'Отчёт по выполненным работам', completed: true },
  ]);

  const currentMonth = 'Ноябрь';
  const currentYear = 2025;
  const daysUntilVacation = 12;
  const totalDaysUntilVacation = 30;
  const vacationProgress = ((totalDaysUntilVacation - daysUntilVacation) / totalDaysUntilVacation) * 100;

  const calendarDays: CalendarDay[] = [
    { date: 1, type: 'work', isToday: false },
    { date: 2, type: 'work', isToday: false },
    { date: 3, type: 'weekend', isToday: false },
    { date: 4, type: 'work', isToday: false },
    { date: 5, type: 'work', isToday: false },
    { date: 6, type: 'work', isToday: false },
    { date: 7, type: 'work', isToday: false },
    { date: 8, type: 'work', isToday: false },
    { date: 9, type: 'weekend', isToday: false },
    { date: 10, type: 'weekend', isToday: false },
    { date: 11, type: 'work', isToday: true },
    { date: 12, type: 'work', isToday: false },
    { date: 13, type: 'work', isToday: false },
    { date: 14, type: 'work', isToday: false },
    { date: 15, type: 'work', isToday: false },
    { date: 16, type: 'weekend', isToday: false },
    { date: 17, type: 'weekend', isToday: false },
    { date: 18, type: 'work', isToday: false },
    { date: 19, type: 'work', isToday: false },
    { date: 20, type: 'work', isToday: false },
    { date: 21, type: 'work', isToday: false },
    { date: 22, type: 'work', isToday: false },
    { date: 23, type: 'vacation', isToday: false },
    { date: 24, type: 'vacation', isToday: false },
    { date: 25, type: 'vacation', isToday: false },
    { date: 26, type: 'vacation', isToday: false },
    { date: 27, type: 'vacation', isToday: false },
    { date: 28, type: 'vacation', isToday: false },
    { date: 29, type: 'vacation', isToday: false },
    { date: 30, type: 'vacation', isToday: false },
  ];

  const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const getDayStyle = (day: CalendarDay) => {
    if (day.isToday) {
      return 'bg-primary text-white ring-4 ring-primary/20';
    }
    switch (day.type) {
      case 'work':
        return 'text-work-day font-medium';
      case 'weekend':
        return 'text-weekend font-medium';
      case 'vacation':
        return 'bg-vacation/10 text-vacation font-semibold';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background font-sf pb-20">
      <div className="max-w-md mx-auto animate-fade-in">
        <header className="sticky top-0 z-10 bg-card/80 backdrop-blur-xl border-b border-border/50 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">
                {activeTab === 'calendar' ? 'График работы' : 'Задачи'}
              </h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Иванов Иван Иванович
              </p>
            </div>
            <button className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors">
              <Icon name="Bell" size={20} className="text-foreground" />
            </button>
          </div>
        </header>

        {activeTab === 'calendar' ? (
          <div className="px-6 pt-6 space-y-6 animate-scale-in">
            <Card className="p-5 bg-gradient-to-br from-vacation/5 to-vacation/10 border-vacation/20 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-vacation/20 flex items-center justify-center">
                    <Icon name="Palmtree" size={20} className="text-vacation" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">До отпуска</p>
                    <p className="text-2xl font-semibold text-foreground">{daysUntilVacation} дней</p>
                  </div>
                </div>
              </div>
              <Progress value={vacationProgress} className="h-2" />
            </Card>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">
                  {currentMonth} {currentYear}
                </h2>
                <div className="flex gap-1">
                  <button className="w-8 h-8 rounded-full hover:bg-muted transition-colors flex items-center justify-center">
                    <Icon name="ChevronLeft" size={18} className="text-foreground" />
                  </button>
                  <button className="w-8 h-8 rounded-full hover:bg-muted transition-colors flex items-center justify-center">
                    <Icon name="ChevronRight" size={18} className="text-foreground" />
                  </button>
                </div>
              </div>

              <Card className="p-4 shadow-sm">
                <div className="grid grid-cols-7 gap-2 mb-3">
                  {weekDays.map((day) => (
                    <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((day) => (
                    <div
                      key={day.date}
                      className={cn(
                        'aspect-square flex items-center justify-center rounded-xl text-sm transition-all cursor-pointer hover:scale-105',
                        getDayStyle(day)
                      )}
                    >
                      {day.date}
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-border/50 flex items-center justify-around">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-work-day"></div>
                    <span className="text-xs text-muted-foreground">Рабочий</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-weekend"></div>
                    <span className="text-xs text-muted-foreground">Выходной</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-vacation"></div>
                    <span className="text-xs text-muted-foreground">Отпуск</span>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-muted/30 border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-weekend/20 flex items-center justify-center flex-shrink-0">
                    <Icon name="Calendar" size={20} className="text-weekend" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Следующий выходной</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Суббота, 16 ноября</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          <div className="px-6 pt-6 space-y-4 animate-scale-in">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-muted-foreground">
                {tasks.filter(t => t.completed).length} из {tasks.length} выполнено
              </p>
            </div>

            <div className="space-y-2">
              {tasks.map((task) => (
                <Card
                  key={task.id}
                  className={cn(
                    'p-4 cursor-pointer transition-all hover:shadow-md',
                    task.completed && 'bg-muted/50'
                  )}
                  onClick={() => toggleTask(task.id)}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all flex-shrink-0',
                        task.completed
                          ? 'bg-primary border-primary'
                          : 'border-border'
                      )}
                    >
                      {task.completed && (
                        <Icon name="Check" size={14} className="text-white" />
                      )}
                    </div>
                    <span
                      className={cn(
                        'text-sm font-medium',
                        task.completed
                          ? 'text-muted-foreground line-through'
                          : 'text-foreground'
                      )}
                    >
                      {task.title}
                    </span>
                  </div>
                </Card>
              ))}
            </div>

            <button className="w-full py-3 rounded-2xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
              <Icon name="Plus" size={20} />
              Добавить задачу
            </button>
          </div>
        )}
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border/50 safe-area-inset-bottom">
        <div className="max-w-md mx-auto px-6 py-3 flex items-center justify-around">
          <button
            onClick={() => setActiveTab('calendar')}
            className={cn(
              'flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all',
              activeTab === 'calendar' ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            <Icon name="Calendar" size={24} />
            <span className="text-xs font-medium">График</span>
          </button>

          <button
            onClick={() => setActiveTab('tasks')}
            className={cn(
              'flex flex-col items-center gap-1 py-2 px-4 rounded-xl transition-all',
              activeTab === 'tasks' ? 'text-primary' : 'text-muted-foreground'
            )}
          >
            <Icon name="CheckSquare" size={24} />
            <span className="text-xs font-medium">Задачи</span>
          </button>

          <button className="flex flex-col items-center gap-1 py-2 px-4 rounded-xl text-muted-foreground transition-all">
            <Icon name="User" size={24} />
            <span className="text-xs font-medium">Профиль</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Index;
