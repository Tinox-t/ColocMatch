import { useState } from 'react';
import { Euro, Calendar, CheckCircle2, Plus, MessageSquare, Clock, Users, TrendingUp, Bell } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { mockExpenses, mockTasks } from '../data/mockData';
import type { Expense, Task } from '../types';

export function DashboardScreen() {
  const [expenses, setExpenses] = useState<Expense[]>(mockExpenses);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [newExpense, setNewExpense] = useState({ title: '', amount: '', category: 'other' as const });
  const [newTask, setNewTask] = useState({ title: '', assignedTo: '', dueDate: '', category: 'cleaning' as const });

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const completedTasks = tasks.filter(task => task.completed).length;
  const taskCompletionRate = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;
  const myBalance = 145; // Mock balance calculation

  const colocmates = [
    { name: 'Emma', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face', lastSeen: 'En ligne' },
    { name: 'Lucas', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', lastSeen: 'Il y a 2h' }
  ];

  const addExpense = () => {
    if (newExpense.title && newExpense.amount) {
      const expense: Expense = {
        id: Date.now().toString(),
        title: newExpense.title,
        amount: parseFloat(newExpense.amount),
        paidBy: 'Moi',
        participants: ['Moi', 'Emma', 'Lucas'],
        date: new Date().toISOString().split('T')[0],
        category: newExpense.category
      };
      setExpenses([...expenses, expense]);
      setNewExpense({ title: '', amount: '', category: 'other' });
    }
  };

  const addTask = () => {
    if (newTask.title && newTask.assignedTo && newTask.dueDate) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.title,
        assignedTo: newTask.assignedTo,
        completed: false,
        dueDate: newTask.dueDate,
        category: newTask.category
      };
      setTasks([...tasks, task]);
      setNewTask({ title: '', assignedTo: '', dueDate: '', category: 'cleaning' });
    }
  };

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div className="min-h-full bg-gradient-to-br from-teal-50 via-white to-cyan-50">
      <div className="p-4 space-y-6 pb-6">
        {/* Header with colocmates */}
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
              <p className="text-gray-600">Colocation Rue des Lilas</p>
            </div>
            <Bell className="w-6 h-6 text-gray-400" />
          </div>
          
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Colocataires :</span>
            {colocmates.map((coloc, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="relative">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={coloc.avatar} />
                    <AvatarFallback>{coloc.name[0]}</AvatarFallback>
                  </Avatar>
                  {coloc.lastSeen === 'En ligne' && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full" />
                  )}
                </div>
                <div className="text-sm">
                  <div className="font-medium text-gray-900">{coloc.name}</div>
                  <div className="text-xs text-gray-500">{coloc.lastSeen}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key metrics */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl brand-gradient-3 flex items-center justify-center">
                <Euro className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{totalExpenses}€</div>
              <p className="text-sm text-gray-600">Dépenses du mois</p>
              <div className="mt-2 flex items-center justify-center gap-1 text-xs">
                <TrendingUp className="w-3 h-3 text-green-500" />
                <span className="text-green-600">-12% vs dernier mois</span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl brand-gradient-1 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{completedTasks}/{tasks.length}</div>
              <p className="text-sm text-gray-600">Tâches terminées</p>
              <Progress value={taskCompletionRate} className="mt-2 h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Balance alert */}
        {myBalance !== 0 && (
          <Card className={`${myBalance > 0 ? 'bg-green-50 border-green-200' : 'bg-orange-50 border-orange-200'}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  myBalance > 0 ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'
                }`}>
                  <Euro className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {myBalance > 0 ? 'On vous doit de l\'argent' : 'Vous devez de l\'argent'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Solde actuel : {myBalance > 0 ? '+' : ''}{myBalance}€
                  </p>
                </div>
                <Button size="sm" className="brand-gradient-1 text-white">
                  Équilibrer
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Tabs defaultValue="expenses" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm">
            <TabsTrigger value="expenses" className="data-[state=active]:brand-gradient-3 data-[state=active]:text-white">
              Dépenses
            </TabsTrigger>
            <TabsTrigger value="tasks" className="data-[state=active]:brand-gradient-1 data-[state=active]:text-white">
              Tâches
            </TabsTrigger>
            <TabsTrigger value="messages" className="data-[state=active]:brand-gradient-2 data-[state=active]:text-white">
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="expenses" className="space-y-4">
            {/* Quick add expense */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Ajouter une dépense
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input 
                  placeholder="Ex: Courses Carrefour"
                  value={newExpense.title}
                  onChange={(e) => setNewExpense({...newExpense, title: e.target.value})}
                  className="bg-gray-50"
                />
                <div className="flex gap-3">
                  <Input 
                    type="number"
                    placeholder="Montant"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                    className="flex-1 bg-gray-50"
                  />
                  <Select value={newExpense.category} onValueChange={(value: any) => setNewExpense({...newExpense, category: value})}>
                    <SelectTrigger className="w-40 bg-gray-50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rent">🏠 Loyer</SelectItem>
                      <SelectItem value="utilities">⚡ Charges</SelectItem>
                      <SelectItem value="groceries">🛒 Courses</SelectItem>
                      <SelectItem value="other">📝 Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={addExpense} className="w-full brand-gradient-3 text-white shadow-lg">
                  Ajouter la dépense
                </Button>
              </CardContent>
            </Card>

            {/* Expenses list */}
            <div className="space-y-3">
              {expenses.map((expense) => (
                <Card key={expense.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                          <span className="text-lg">
                            {expense.category === 'rent' && '🏠'}
                            {expense.category === 'utilities' && '⚡'}
                            {expense.category === 'groceries' && '🛒'}
                            {expense.category === 'other' && '📝'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{expense.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>Payé par {expense.paidBy}</span>
                            <span>•</span>
                            <span>{new Date(expense.date).toLocaleDateString('fr-FR')}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">{expense.amount}€</div>
                        <div className="text-sm text-gray-500">
                          {Math.round(expense.amount / expense.participants.length)}€ chacun
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tasks" className="space-y-4">
            {/* Task progress */}
            <Card className="bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-gray-900">Progression des tâches</h3>
                  <span className="text-sm font-medium text-gray-600">{Math.round(taskCompletionRate)}%</span>
                </div>
                <Progress value={taskCompletionRate} className="h-3 mb-2" />
                <p className="text-sm text-gray-600">
                  {completedTasks} sur {tasks.length} tâches terminées cette semaine
                </p>
              </CardContent>
            </Card>

            {/* Add task */}
            <Card className="bg-white shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Nouvelle tâche
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input 
                  placeholder="Ex: Nettoyer la cuisine"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  className="bg-gray-50"
                />
                <div className="flex gap-3">
                  <Select value={newTask.assignedTo} onValueChange={(value) => setNewTask({...newTask, assignedTo: value})}>
                    <SelectTrigger className="flex-1 bg-gray-50">
                      <SelectValue placeholder="Assigné à" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Moi">👤 Moi</SelectItem>
                      <SelectItem value="Emma">👩 Emma</SelectItem>
                      <SelectItem value="Lucas">👨 Lucas</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input 
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    className="flex-1 bg-gray-50"
                  />
                </div>
                <Button onClick={addTask} className="w-full brand-gradient-1 text-white shadow-lg">
                  Créer la tâche
                </Button>
              </CardContent>
            </Card>

            {/* Tasks list */}
            <div className="space-y-3">
              {tasks.map((task) => (
                <Card key={task.id} className="bg-white shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleTask(task.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          task.completed 
                            ? 'bg-green-500 border-green-500 text-white' 
                            : 'border-gray-300 hover:border-green-500'
                        }`}
                      >
                        {task.completed && <CheckCircle2 className="w-4 h-4" />}
                      </button>
                      
                      <div className="flex-1">
                        <h4 className={`font-medium ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                          {task.title}
                        </h4>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <span>👤 {task.assignedTo}</span>
                          <span>•</span>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                          </div>
                        </div>
                      </div>
                      
                      <Badge 
                        variant={task.completed ? 'default' : 'secondary'} 
                        className={`text-xs ${
                          task.completed ? 'bg-green-100 text-green-700' : ''
                        }`}
                      >
                        {task.category === 'cleaning' && '🧹 Ménage'}
                        {task.category === 'trash' && '🗑️ Poubelles'}
                        {task.category === 'maintenance' && '🔧 Maintenance'}
                        {task.category === 'shopping' && '🛒 Courses'}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl brand-gradient-2 flex items-center justify-center">
                  <MessageSquare className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Messagerie colocation</h3>
                <p className="text-gray-600 mb-6 max-w-sm mx-auto">
                  Communiquez facilement avec vos colocataires et partagez des informations importantes
                </p>
                <div className="space-y-3">
                  <Button className="w-full brand-gradient-2 text-white shadow-lg">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Ouvrir les messages
                  </Button>
                  <div className="text-sm text-gray-500">
                    2 nouveaux messages non lus
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Quick actions */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">📢</div>
                  <h4 className="font-medium text-blue-900 mb-1">Annonce</h4>
                  <p className="text-xs text-blue-700">Partager une info</p>
                </CardContent>
              </Card>
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-2">🗳️</div>
                  <h4 className="font-medium text-purple-900 mb-1">Sondage</h4>
                  <p className="text-xs text-purple-700">Prendre une décision</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}