'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  dueDate?: string;
  priority: 'low' | 'medium' | 'high';
  category: string;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [category, setCategory] = useState('General');
  const [dueDate, setDueDate] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [stats, setStats] = useState({ total: 0, completed: 0, active: 0 });

  const STORAGE_KEY = 'stier-todos';
  const CATEGORIES = ['General', 'Work', 'Personal', 'Shopping', 'Health', 'Learning'];

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setTodos(parsed);
      } catch (error) {
        console.error('Failed to load todos:', error);
      }
    }
  }, []);

  // Save to localStorage whenever todos change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    updateStats();
  }, [todos]);

  const updateStats = () => {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const active = total - completed;
    setStats({ total, completed, active });
  };

  const addTodo = () => {
    if (input.trim()) {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: input,
        completed: false,
        createdAt: Date.now(),
        dueDate,
        priority,
        category,
      };
      setTodos([newTodo, ...todos]);
      setInput('');
      setDueDate('');
      setPriority('medium');
      setCategory('General');
      setShowForm(false);
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(t => !t.completed));
  };

  const filteredTodos = todos.filter(t => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const getPriorityColor = (p: string) => {
    switch (p) {
      case 'high':
        return 'bg-red-500/20 border-red-500/50 text-red-400';
      case 'medium':
        return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400';
      case 'low':
        return 'bg-green-500/20 border-green-500/50 text-green-400';
      default:
        return '';
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <main className="overflow-hidden">
      <Navigation />

      <section className="min-h-screen pt-32 px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-6xl md:text-7xl font-black mb-4">
              Task <span className="gradient-text">Manager</span>
            </h1>
            <p className="text-lg text-luxury-beige max-w-2xl">
              Organize your work with style. All tasks are saved locally in your browser.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-3 gap-4 mb-8"
          >
            <div className="glass p-6 rounded-xl text-center">
              <div className="text-3xl font-black text-neon-cyan mb-2">{stats.total}</div>
              <p className="text-sm text-luxury-beige">Total Tasks</p>
            </div>
            <div className="glass p-6 rounded-xl text-center">
              <div className="text-3xl font-black text-neon-purple mb-2">{stats.active}</div>
              <p className="text-sm text-luxury-beige">Active</p>
            </div>
            <div className="glass p-6 rounded-xl text-center">
              <div className="text-3xl font-black text-green-400 mb-2">{stats.completed}</div>
              <p className="text-sm text-luxury-beige">Completed</p>
            </div>
          </motion.div>

          {/* Add Todo Form */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            {!showForm ? (
              <button
                onClick={() => setShowForm(true)}
                className="w-full px-8 py-4 bg-neon-cyan text-luxury-black font-bold rounded-lg hover:bg-neon-purple transition-all duration-300 transform hover:scale-105"
              >
                ✨ Add New Task
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-8 rounded-2xl space-y-4"
              >
                {/* Task Input */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Task Description</label>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                    placeholder="What needs to be done?"
                    className="w-full px-4 py-3 bg-luxury-charcoal border border-luxury-grey rounded-lg text-luxury-white placeholder-luxury-grey focus:outline-none focus:border-neon-cyan transition-colors"
                    autoFocus
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold mb-2">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-3 bg-luxury-charcoal border border-luxury-grey rounded-lg text-luxury-white focus:outline-none focus:border-neon-cyan transition-colors"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                {/* Priority & Due Date */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Priority</label>
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value as any)}
                      className="w-full px-4 py-3 bg-luxury-charcoal border border-luxury-grey rounded-lg text-luxury-white focus:outline-none focus:border-neon-cyan transition-colors"
                    >
                      <option value="low">🟢 Low</option>
                      <option value="medium">🟡 Medium</option>
                      <option value="high">🔴 High</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Due Date</label>
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full px-4 py-3 bg-luxury-charcoal border border-luxury-grey rounded-lg text-luxury-white focus:outline-none focus:border-neon-cyan transition-colors"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                  <button
                    onClick={addTodo}
                    disabled={!input.trim()}
                    className="flex-1 px-6 py-3 bg-neon-cyan text-luxury-black font-bold rounded-lg hover:bg-neon-purple transition-all duration-300 disabled:opacity-50"
                  >
                    Add Task
                  </button>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setInput('');
                    }}
                    className="flex-1 px-6 py-3 glass font-bold rounded-lg hover:bg-neon-cyan/10 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-8"
          >
            {(['all', 'active', 'completed'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
                  filter === f
                    ? 'bg-neon-cyan text-luxury-black'
                    : 'glass hover:bg-neon-cyan/10'
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </motion.div>

          {/* Todo List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-3 mb-8"
          >
            {filteredTodos.length > 0 ? (
              filteredTodos.map(todo => (
                <motion.div
                  key={todo.id}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  className={`glass p-5 rounded-xl flex items-center gap-4 group ${
                    todo.completed ? 'opacity-60' : ''
                  }`}
                >
                  {/* Checkbox */}
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleTodo(todo.id)}
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      todo.completed
                        ? 'bg-green-500 border-green-500'
                        : 'border-neon-cyan hover:bg-neon-cyan/10'
                    }`}
                  >
                    {todo.completed && <span className="text-white text-sm">✓</span>}
                  </motion.button>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <p
                      className={`break-words ${
                        todo.completed ? 'line-through text-luxury-grey' : 'text-luxury-white'
                      }`}
                    >
                      {todo.text}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs px-2 py-1 glass rounded">{todo.category}</span>
                      {todo.dueDate && (
                        <span className="text-xs px-2 py-1 glass rounded">📅 {todo.dueDate}</span>
                      )}
                      <span className={`text-xs px-2 py-1 rounded border ${
                        getPriorityColor(todo.priority)
                      }`}>
                        {todo.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => deleteTodo(todo.id)}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-red-400 hover:bg-red-500/20 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    ✕
                  </motion.button>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass p-12 rounded-2xl text-center"
              >
                <p className="text-2xl mb-2">✨</p>
                <p className="text-luxury-beige">
                  {filter === 'completed'
                    ? 'No completed tasks yet'
                    : filter === 'active'
                    ? 'No active tasks. Great job!'
                    : 'No tasks yet. Create one to get started!'}
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Clear Completed Button */}
          {todos.some(t => t.completed) && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={clearCompleted}
              className="w-full px-6 py-3 glass font-semibold rounded-lg hover:bg-red-500/10 hover:text-red-400 transition-all duration-300"
            >
              Clear Completed Tasks
            </motion.button>
          )}

          {/* Info Section */}
          {todos.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mt-12 grid md:grid-cols-3 gap-6"
            >
              <div className="glass p-6 rounded-xl">
                <div className="text-3xl mb-3">💾</div>
                <h3 className="font-bold mb-2">Auto-Saved</h3>
                <p className="text-sm text-luxury-beige">All tasks are automatically saved to your browser's local storage</p>
              </div>
              <div className="glass p-6 rounded-xl">
                <div className="text-3xl mb-3">📂</div>
                <h3 className="font-bold mb-2">Organized</h3>
                <p className="text-sm text-luxury-beige">Categorize and prioritize your tasks for better management</p>
              </div>
              <div className="glass p-6 rounded-xl">
                <div className="text-3xl mb-3">⚡</div>
                <h3 className="font-bold mb-2">Instant</h3>
                <p className="text-sm text-luxury-beige">No cloud sync delays - everything happens instantly</p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}