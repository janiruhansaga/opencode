// Main Application Logic

const App = {
  currentUser: null,
  
  init: async () => {
    App.initDarkMode();
    await Components.init();
    document.getElementById('header').innerHTML = Components.header();
    document.getElementById('footer').innerHTML = Components.footer();
    
    const session = localStorage.getItem('session');
    if (session) {
      App.currentUser = JSON.parse(session);
      App.updateUserUI();
      App.navigate(App.currentUser.is_admin ? 'admin-dashboard' : 'student-dashboard');
    } else {
      App.showLogin();
    }
  },
  
  initDarkMode: () => {
    const darkMode = localStorage.getItem('darkMode') === 'true';
    if (darkMode) {
      document.documentElement.classList.add('dark');
    }
  },
  
  toggleDarkMode: () => {
    const html = document.documentElement;
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    localStorage.setItem('darkMode', isDark);
  },
  
  updateUserUI: () => {
    const headerEl = document.querySelector('#header header');
    const header = document.querySelector('header');
    const targetHeader = headerEl || header;
    
    if (targetHeader) {
      const userInfo = targetHeader.querySelector('#user-info');
      const userName = targetHeader.querySelector('#user-name');
      if (userInfo && userName && App.currentUser) {
        userInfo.classList.remove('hidden');
        userInfo.classList.add('flex');
        userName.textContent = App.currentUser.full_name;
        userInfo.style.display = 'flex';
      } else if (userInfo) {
        userInfo.classList.add('hidden');
        userInfo.classList.remove('flex');
        userInfo.style.display = 'none';
      }
    }
  },
  
  navigate: (page) => {
    const app = document.getElementById('app');
    const session = localStorage.getItem('session');
    const user = session ? JSON.parse(session) : null;
    
    if (!user && page !== 'login' && page !== 'register') {
      App.showLogin();
      return;
    }
    
    switch(page) {
      case 'login':
        App.showLogin();
        break;
      case 'register':
        App.showRegister();
        break;
      case 'student-dashboard':
        StudentDashboard.render();
        break;
      case 'resources':
        StudentDashboard.resources();
        break;
      case 'payment':
        StudentDashboard.payment();
        break;
      case 'admin-dashboard':
        AdminDashboard.dashboard();
        break;
      case 'admin-students':
        AdminDashboard.students();
        break;
      case 'admin-payments':
        AdminDashboard.payments();
        break;
      case 'admin-schedule':
        AdminDashboard.schedule();
        break;
      case 'admin-resources':
        AdminDashboard.resources();
        break;
      case 'admin-settings':
        AdminDashboard.settings();
        break;
    }
  },
  
  showLogin: () => {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="fixed inset-0 flex items-center justify-center px-4 py-8 z-50 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 dark:from-gray-800 dark:via-purple-900 dark:to-gray-900"></div>
        <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        <div class="relative z-10 w-full max-w-md">
          <div class="text-center mb-6">
            <div class="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl shadow-2xl mb-4 border border-white/30">
              <i class="ph ph-graduation-cap text-5xl text-white"></i>
            </div>
            <h2 class="text-3xl font-bold text-white drop-shadow-md">Tuition Class</h2>
            <p class="text-white/80 mt-1">Login to continue learning</p>
          </div>
          <div class="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700">
            <form onsubmit="App.handleLogin(event)" class="space-y-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Phone Number</label>
                <div class="relative">
                  <i class="ph ph-phone absolute left-4 top-1/2 -translate-y-1/2 text-purple-500 dark:text-purple-400 text-xl"></i>
                  <input type="tel" id="login-phone" class="w-full pl-12 pr-4 py-3.5 border-2 border-purple-100 dark:border-purple-900 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition bg-purple-50 dark:bg-gray-800 dark:text-white" placeholder="0771234567" required>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Password</label>
                <div class="relative">
                  <i class="ph ph-lock-key absolute left-4 top-1/2 -translate-y-1/2 text-pink-500 dark:text-pink-400 text-xl"></i>
                  <input type="password" id="login-pin" minlength="6" class="w-full pl-12 pr-4 py-3.5 border-2 border-pink-100 dark:border-pink-900 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-pink-500 outline-none transition bg-pink-50 dark:bg-gray-800 dark:text-white" placeholder="Enter password" required>
                </div>
              </div>
              <button type="submit" class="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white py-3.5 rounded-xl font-semibold transition shadow-lg shadow-purple-500/40">
                Login
              </button>
            </form>
            <p class="text-center mt-6 text-gray-600 dark:text-gray-400">
              Don't have an account? 
              <a href="#" onclick="App.navigate('register')" class="text-purple-600 dark:text-purple-400 font-bold hover:text-pink-600 dark:hover:text-pink-400 transition">Register</a>
            </p>
          </div>
        </div>
      </div>
      <style>body > *:not(#app):not(script) { display: none !important; }</style>
    `;
  },
  
  showRegister: () => {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="fixed inset-0 flex items-center justify-center px-4 py-8 z-50 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-green-400 via-teal-500 to-blue-500 dark:from-gray-800 dark:via-teal-900 dark:to-gray-900"></div>
        <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%23ffffff\" fill-opacity=\"0.1\"%3E%3Cpath d=\"M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        <div class="relative z-10 w-full max-w-md">
          <div class="text-center mb-6">
            <div class="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl shadow-2xl mb-4 border border-white/30">
              <i class="ph ph-user-plus text-5xl text-white"></i>
            </div>
            <h2 class="text-3xl font-bold text-white drop-shadow-md">Create Account</h2>
            <p class="text-white/80 mt-1">Join us to start learning</p>
          </div>
          <div class="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 dark:border-gray-700">
            <form onsubmit="App.handleRegister(event)" class="space-y-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Full Name</label>
                <div class="relative">
                  <i class="ph ph-user absolute left-4 top-1/2 -translate-y-1/2 text-green-500 dark:text-green-400 text-xl"></i>
                  <input type="text" id="reg-name" class="w-full pl-12 pr-4 py-3.5 border-2 border-green-100 dark:border-green-900 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition bg-green-50 dark:bg-gray-800 dark:text-white" placeholder="Your Name" required>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Phone Number</label>
                <div class="relative">
                  <i class="ph ph-phone absolute left-4 top-1/2 -translate-y-1/2 text-teal-500 dark:text-teal-400 text-xl"></i>
                  <input type="tel" id="reg-phone" class="w-full pl-12 pr-4 py-3.5 border-2 border-teal-100 dark:border-teal-900 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition bg-teal-50 dark:bg-gray-800 dark:text-white" placeholder="0771234567" required>
                </div>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Password</label>
                <div class="relative">
                  <i class="ph ph-lock-key absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 dark:text-blue-400 text-xl"></i>
                  <input type="password" id="reg-pin" minlength="6" class="w-full pl-12 pr-4 py-3.5 border-2 border-blue-100 dark:border-blue-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-blue-50 dark:bg-gray-800 dark:text-white" placeholder="Min 6 characters" required>
                </div>
              </div>
              <button type="submit" class="w-full bg-gradient-to-r from-green-500 via-teal-500 to-blue-500 hover:from-green-600 hover:via-teal-600 hover:to-blue-600 text-white py-3.5 rounded-xl font-semibold transition shadow-lg shadow-green-500/40">
                Register
              </button>
            </form>
            <p class="text-center mt-6 text-gray-600 dark:text-gray-400">
              Already have an account? 
              <a href="#" onclick="App.navigate('login')" class="text-green-600 dark:text-green-400 font-bold hover:text-teal-600 dark:hover:text-teal-400 transition">Login</a>
            </p>
          </div>
        </div>
      </div>
      <style>body > *:not(#app):not(script) { display: none !important; }</style>
    `;
  },
  
  handleLogin: async (e) => {
    e.preventDefault();
    const phone = document.getElementById('login-phone').value.trim();
    const pin = document.getElementById('login-pin').value;
    
    App.showLoading();
    
    try {
      console.log('Login attempt:', phone, pin);
      const { data: userData, error } = await supabaseClient
        .from('users')
        .select('*')
        .eq('phone', phone)
        .eq('pin', pin)
        .single();
      
      console.log('Login response:', userData, error);
      
      if (error) {
        if (error.code === 'PGRST116') {
          throw new Error('Invalid phone number or PIN');
        }
        throw error;
      }
      
      if (!userData) {
        throw new Error('Invalid phone number or PIN');
      }
      
      App.currentUser = userData;
      localStorage.setItem('session', JSON.stringify(userData));
      App.updateUserUI();
      
      Toastify({
        text: "Login Successful!",
        style: { background: "#10b981" }
      }).showToast();
      
      if (userData.is_admin) {
        App.navigate('admin-dashboard');
      } else {
        App.navigate('student-dashboard');
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Invalid phone number or PIN'
      });
    } finally {
      App.hideLoading();
    }
  },
  
  handleRegister: async (e) => {
    e.preventDefault();
    const name = document.getElementById('reg-name').value.trim();
    const phone = document.getElementById('reg-phone').value.trim();
    const pin = document.getElementById('reg-pin').value;
    
    if (pin.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid PIN',
        text: 'PIN must be at least 6 characters'
      });
      return;
    }
    
    App.showLoading();
    
    try {
      const { error: insertError } = await supabaseClient
        .from('users')
        .insert({
          phone: phone,
          pin: pin,
          full_name: name,
          payment_status: 'unpaid'
        });
      
      if (insertError) {
        if (insertError.code === '23505') {
          throw new Error('Phone number already registered');
        }
        throw insertError;
      }
      
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful!',
        text: 'Please login with your credentials'
      });
      
      App.navigate('login');
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Registration Failed',
        text: err.message || 'Phone number may already be registered'
      });
    } finally {
      App.hideLoading();
    }
  },
  
  logout: async () => {
    localStorage.removeItem('session');
    App.currentUser = null;
    App.updateUserUI();
    App.showLogin();
    Toastify({
      text: "Logged out successfully",
      style: { background: "#6b7280" }
    }).showToast();
  },
  
  showLoading: () => {
    document.getElementById('loading').classList.remove('hidden');
  },
  
  hideLoading: () => {
    document.getElementById('loading').classList.add('hidden');
  }
};

// Student Dashboard Module
const StudentDashboard = {
  render: async () => {
    const app = document.getElementById('app');
    const user = App.currentUser;
    
    App.showLoading();
    
    try {
      const { data: classes } = await supabaseClient
        .from('classes')
        .select('*')
        .eq('is_active', true)
        .gte('scheduled_at', new Date().toISOString())
        .order('scheduled_at')
        .limit(5);
      
      const { data: resources } = await supabaseClient
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      
      const nextClass = classes && classes.length > 0 ? classes[0] : null;
      
      app.innerHTML = `
        <div class="flex">
          ${Components.sidebar(false)}
          <div class="flex-1 p-4 md:p-6 pb-20 md:pb-6">
            <!-- Welcome Section -->
            <div class="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 rounded-2xl p-6 mb-6 text-white shadow-xl">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-blue-200 text-sm mb-1">Welcome back,</p>
                  <h2 class="text-2xl md:text-3xl font-bold mb-2">${user.full_name}!</h2>
                  <p class="text-blue-100 text-sm">${user.payment_status === 'paid' ? 'Your payment is active' : 'Complete payment to access live classes'}</p>
                </div>
                <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <i class="ph ph-student text-3xl"></i>
                </div>
              </div>
            </div>
            
            <!-- Payment Status Alert -->
            ${user.payment_status === 'unpaid' || (user.payment_expiry && new Date(user.payment_expiry) < new Date()) ? `
              <div class="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-4 mb-6">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                      <i class="ph ph-warning text-amber-600 text-xl"></i>
                    </div>
                    <div>
                      <p class="font-semibold text-amber-800">Payment Required</p>
                      <p class="text-sm text-amber-600">Please make your payment to access live classes</p>
                    </div>
                  </div>
                  <a href="#" onclick="App.navigate('payment')" class="bg-amber-500 hover:bg-amber-600 text-white px-5 py-2.5 rounded-lg font-medium transition shadow-lg shadow-amber-500/30">
                    Pay Now
                  </a>
                </div>
              </div>
            ` : ''}
            
            <!-- Quick Stats -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 card-hover">
                <div class="flex items-center justify-between mb-3">
                  <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <i class="ph ph-calendar-check text-blue-600 text-xl"></i>
                  </div>
                </div>
                <p class="text-3xl font-bold text-gray-800">${classes ? classes.length : 0}</p>
                <p class="text-sm text-gray-500">Upcoming Classes</p>
              </div>
              <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 card-hover">
                <div class="flex items-center justify-between mb-3">
                  <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <i class="ph ph-folder text-green-600 text-xl"></i>
                  </div>
                </div>
                <p class="text-3xl font-bold text-gray-800">${resources ? resources.length : 0}</p>
                <p class="text-sm text-gray-500">Resources</p>
              </div>
              <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 card-hover">
                <div class="flex items-center justify-between mb-3">
                  <div class="w-12 h-12 ${user.payment_status === 'paid' ? 'bg-green-100' : 'bg-red-100'} rounded-xl flex items-center justify-center">
                    <i class="ph ph-credit-card text-xl ${user.payment_status === 'paid' ? 'text-green-600' : 'text-red-500'}"></i>
                  </div>
                </div>
                <p class="text-3xl font-bold capitalize ${user.payment_status === 'paid' ? 'text-green-600' : 'text-red-500'}">${user.payment_status}</p>
                <p class="text-sm text-gray-500">Payment Status</p>
              </div>
              <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 card-hover">
                <div class="flex items-center justify-between mb-3">
                  <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <i class="ph ph-clock text-purple-600 text-xl"></i>
                  </div>
                </div>
                <p class="text-3xl font-bold text-gray-800">${user.payment_expiry ? dayjs(user.payment_expiry).format('MMM DD') : 'N/A'}</p>
                <p class="text-sm text-gray-500">Expires</p>
              </div>
            </div>
            
            <!-- Join Live Class CTA -->
            <div class="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 mb-6 text-white shadow-xl">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-xl font-bold mb-2">Join Live Class</h3>
                  <p class="text-blue-100 text-sm mb-4">${nextClass ? `Next: ${dayjs(nextClass.scheduled_at).format('YYYY-MM-DD HH:mm')}` : 'No upcoming classes scheduled'}</p>
                  ${user.payment_status === 'paid' && nextClass ? `
                    <a href="${nextClass.meeting_link}" target="_blank" class="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition shadow-lg">
                      <i class="ph ph-video-camera text-xl"></i> Join Now
                    </a>
                  ` : `
                    <button onclick="App.navigate('payment')" class="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-xl font-bold transition">
                      <i class="ph ph-credit-card text-xl"></i> Pay to Join
                    </button>
                  `}
                </div>
                <div class="w-24 h-24 bg-white/10 rounded-2xl flex items-center justify-center">
                  <i class="ph ph-video-camera text-5xl opacity-50"></i>
                </div>
              </div>
            </div>
            
            <!-- Upcoming Classes -->
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-bold text-lg text-gray-800">Upcoming Classes</h3>
                <span class="bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">${classes ? classes.length : 0} classes</span>
              </div>
              ${classes && classes.length > 0 ? `
                <div class="space-y-3">
                  ${classes.map(c => `
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                          <i class="ph ph-calendar text-white text-xl"></i>
                        </div>
                        <div>
                          <p class="font-semibold text-gray-800">${c.title}</p>
                          <p class="text-sm text-gray-500">${dayjs(c.scheduled_at).format('YYYY-MM-DD HH:mm')}</p>
                        </div>
                      </div>
                      <i class="ph ph-chevron-right text-gray-400 text-xl"></i>
                    </div>
                  `).join('')}
                </div>
              ` : `
                <div class="text-center py-8">
                  <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i class="ph ph-calendar-x text-gray-400 text-2xl"></i>
                  </div>
                  <p class="text-gray-500">No upcoming classes</p>
                </div>
              `}
            </div>
            
            <!-- Recent Resources -->
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-bold text-lg text-gray-800">Recent Resources</h3>
                <a href="#" onclick="App.navigate('resources')" class="text-blue-600 font-medium text-sm hover:underline">View All</a>
              </div>
              ${resources && resources.length > 0 ? `
                <div class="grid md:grid-cols-2 gap-3">
                  ${resources.map(r => `
                    <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                      <div class="w-12 h-12 ${r.type === 'pdf' ? 'bg-red-100' : 'bg-blue-100'} rounded-lg flex items-center justify-center">
                        <i class="ph ph-file-${r.type === 'pdf' ? 'pdf' : 'video'} text-xl ${r.type === 'pdf' ? 'text-red-600' : 'text-blue-600'}"></i>
                      </div>
                      <div class="flex-1">
                        <p class="font-medium text-gray-800">${r.title}</p>
                        <p class="text-xs text-gray-500 capitalize">${r.type}</p>
                      </div>
                      <a href="${r.file_url}" target="_blank" class="w-10 h-10 bg-white border border-gray-200 rounded-lg flex items-center justify-center hover:bg-gray-50 transition">
                        <i class="ph ph-download text-gray-600"></i>
                      </a>
                    </div>
                  `).join('')}
                </div>
              ` : `
                <div class="text-center py-8">
                  <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i class="ph ph-folder-open text-gray-400 text-2xl"></i>
                  </div>
                  <p class="text-gray-500">No resources available</p>
                </div>
              `}
            </div>
          </div>
        </div>
        ${Components.mobileNav(false)}
      `;
    } catch (err) {
      console.error(err);
      app.innerHTML = `<p class="text-center text-red-500 p-6">Error loading dashboard</p>`;
    } finally {
      App.hideLoading();
    }
  },
  
  resources: async () => {
    const app = document.getElementById('app');
    
    App.showLoading();
    
    try {
      const { data: resources } = await supabaseClient
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });
      
      app.innerHTML = `
        <div class="flex">
          ${Components.sidebar(false)}
          <div class="flex-1 p-4 md:p-6 pb-20 md:pb-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Resources</h2>
            
            <div class="grid md:grid-cols-2 gap-4">
              ${resources && resources.length > 0 ? resources.map(r => `
                <div class="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition">
                  <div class="flex items-center gap-4">
                    <div class="w-12 h-12 rounded-lg ${r.type === 'pdf' ? 'bg-red-100' : 'bg-blue-100'} flex items-center justify-center">
                      <i class="ph ph-file-${r.type === 'pdf' ? 'pdf' : 'video'} text-2xl ${r.type === 'pdf' ? 'text-red-600' : 'text-blue-600'}"></i>
                    </div>
                    <div class="flex-1">
                      <h3 class="font-medium">${r.title}</h3>
                      <p class="text-sm text-gray-500 capitalize">${r.type}</p>
                    </div>
                    <a href="${r.file_url}" target="_blank" class="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition">
                      <i class="ph ph-download"></i>
                    </a>
                  </div>
                </div>
              `).join('') : `
                <div class="col-span-2 text-center py-12 text-gray-500">
                  <i class="ph ph-folder-open text-5xl mb-4"></i>
                  <p>No resources available yet</p>
                </div>
              `}
            </div>
          </div>
        </div>
        ${Components.mobileNav(false)}
      `;
    } catch (err) {
      console.error(err);
    } finally {
      App.hideLoading();
    }
  },
  
  payment: async () => {
    const app = document.getElementById('app');
    const user = App.currentUser;
    
    const bankDetails = {
      bank: 'People\'s Bank',
      account: '1234567890',
      branch: 'Colombo'
    };
    
    app.innerHTML = `
      <div class="flex">
        ${Components.sidebar(false)}
        <div class="flex-1 p-4 md:p-6 pb-20 md:pb-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Payment</h2>
          
          ${user.payment_status === 'paid' ? `
            <div class="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
              <i class="ph ph-check-circle text-5xl text-green-600 mb-4"></i>
              <h3 class="text-xl font-bold text-green-800">Payment Active</h3>
              <p class="text-green-600">Your payment is valid until ${dayjs(user.payment_expiry).format('YYYY-MM-DD')}</p>
            </div>
          ` : `
            <div class="bg-white rounded-xl p-6 shadow-sm">
              <h3 class="font-bold text-lg mb-4">Bank Details</h3>
              <div class="bg-gray-50 rounded-lg p-4 mb-6">
                <p class="text-sm text-gray-500">Bank</p>
                <p class="font-medium text-lg">${bankDetails.bank}</p>
                <p class="text-sm text-gray-500 mt-2">Account Number</p>
                <p class="font-medium text-lg">${bankDetails.account}</p>
                <p class="text-sm text-gray-500 mt-2">Branch</p>
                <p class="font-medium text-lg">${bankDetails.branch}</p>
              </div>
              
              <h3 class="font-bold text-lg mb-4">Upload Bank Slip</h3>
              <form onsubmit="StudentDashboard.uploadSlip(event)" class="space-y-4">
                <div class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-500 transition cursor-pointer" onclick="document.getElementById('slip-input').click()">
                  <input type="file" id="slip-input" accept="image/*" class="hidden" onchange="StudentDashboard.previewSlip(this)">
                  <div id="slip-preview">
                    <i class="ph ph-upload text-4xl text-gray-400 mb-2"></i>
                    <p class="text-gray-500">Click to upload bank slip</p>
                  </div>
                </div>
                <input type="hidden" id="slip-url">
                <button type="submit" id="submit-slip" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition disabled:opacity-50" disabled>
                  Submit for Approval
                </button>
              </form>
            </div>
            
            <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg mt-4">
              <p class="text-sm text-yellow-800">
                <i class="ph ph-info mr-2"></i>
                Your payment will be reviewed within 24 hours. You can attend classes once approved.
              </p>
            </div>
          `}
        </div>
      </div>
      ${Components.mobileNav(false)}
    `;
  },
  
  previewSlip: (input) => {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        document.getElementById('slip-preview').innerHTML = `
          <img src="${e.target.result}" class="max-h-48 mx-auto rounded-lg">
        `;
        document.getElementById('submit-slip').disabled = false;
      };
      reader.readAsDataURL(input.files[0]);
    }
  },
  
  uploadSlip: async (e) => {
    e.preventDefault();
    const input = document.getElementById('slip-input');
    const file = input.files[0];
    
    if (!file) return;
    
    App.showLoading();
    
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabaseClient.storage
        .from('payments')
        .upload(fileName, file);
      
      if (error) throw error;
      
      const { data: urlData } = supabaseClient.storage
        .from('payments')
        .getPublicUrl(fileName);
      
      const { error: insertError } = await supabaseClient
        .from('payments')
        .insert({
          user_id: App.currentUser.id,
          amount: 5000,
          slip_url: urlData.publicUrl,
          status: 'pending',
          payment_date: new Date().toISOString()
        });
      
      if (insertError) throw insertError;
      
      Swal.fire({
        icon: 'success',
        title: 'Slip Uploaded!',
        text: 'Your payment is pending approval'
      });
      
      App.navigate('student-dashboard');
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: 'Please try again'
      });
    } finally {
      App.hideLoading();
    }
  }
};

// Admin Dashboard Module
const AdminDashboard = {
  checkAdmin: () => {
    if (!App.currentUser || !App.currentUser.is_admin) {
      App.navigate('student-dashboard');
      return false;
    }
    return true;
  },
  
  dashboard: async () => {
    if (!AdminDashboard.checkAdmin()) return;
    
    const app = document.getElementById('app');
    
    App.showLoading();
    
    try {
      const { data: students } = await supabaseClient
        .from('users')
        .select('*')
        .eq('is_admin', false);
      
      const { data: pendingPayments } = await supabaseClient
        .from('payments')
        .select('*, users(full_name, phone)')
        .eq('status', 'pending');
      
      const { data: upcomingClasses } = await supabaseClient
        .from('classes')
        .select('*')
        .eq('is_active', true)
        .gte('scheduled_at', new Date().toISOString())
        .order('scheduled_at')
        .limit(5);
      
      const paidCount = students ? students.filter(s => s.payment_status === 'paid').length : 0;
      const unpaidCount = students ? students.length - paidCount : 0;
      
      app.innerHTML = `
        <div class="flex">
          ${Components.sidebar(true)}
          <div class="flex-1 p-4 md:p-6 pb-20 md:pb-6">
            <!-- Admin Header -->
            <div class="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-6 mb-6 text-white shadow-xl">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-slate-300 text-sm mb-1">Admin Dashboard</p>
                  <h2 class="text-2xl md:text-3xl font-bold">Welcome, ${App.currentUser.full_name}!</h2>
                </div>
                <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <i class="ph ph-shield-check text-3xl"></i>
                </div>
              </div>
            </div>
            
            <!-- Quick Stats -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 card-hover">
                <div class="flex items-center justify-between mb-3">
                  <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <i class="ph ph-users text-blue-600 text-xl"></i>
                  </div>
                  <span class="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full">Total</span>
                </div>
                <p class="text-3xl font-bold text-gray-800">${students ? students.length : 0}</p>
                <p class="text-sm text-gray-500">Total Students</p>
              </div>
              <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 card-hover">
                <div class="flex items-center justify-between mb-3">
                  <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <i class="ph ph-check-circle text-green-600 text-xl"></i>
                  </div>
                  <span class="bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded-full">Active</span>
                </div>
                <p class="text-3xl font-bold text-gray-800">${paidCount}</p>
                <p class="text-sm text-gray-500">Paid Students</p>
              </div>
              <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 card-hover">
                <div class="flex items-center justify-between mb-3">
                  <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                    <i class="ph ph-x-circle text-red-500 text-xl"></i>
                  </div>
                  <span class="bg-red-100 text-red-500 text-xs font-medium px-2 py-1 rounded-full">Inactive</span>
                </div>
                <p class="text-3xl font-bold text-gray-800">${unpaidCount}</p>
                <p class="text-sm text-gray-500">Unpaid Students</p>
              </div>
              <div class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 card-hover">
                <div class="flex items-center justify-between mb-3">
                  <div class="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <i class="ph ph-clock text-amber-600 text-xl"></i>
                  </div>
                  <span class="bg-amber-100 text-amber-600 text-xs font-medium px-2 py-1 rounded-full">Action</span>
                </div>
                <p class="text-3xl font-bold text-gray-800">${pendingPayments ? pendingPayments.length : 0}</p>
                <p class="text-sm text-gray-500">Pending Payments</p>
              </div>
            </div>
            
            <!-- Pending Payments -->
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-bold text-lg text-gray-800 flex items-center gap-2">
                  <i class="ph ph-receipt text-amber-500"></i>
                  Pending Payments
                </h3>
                <span class="bg-amber-100 text-amber-600 text-xs font-medium px-3 py-1 rounded-full">${pendingPayments ? pendingPayments.length : 0} pending</span>
              </div>
              ${pendingPayments && pendingPayments.length > 0 ? `
                <div class="space-y-3">
                  ${pendingPayments.map(p => `
                    <div class="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                          <i class="ph ph-user text-amber-600 text-xl"></i>
                        </div>
                        <div>
                          <p class="font-semibold text-gray-800">${p.users?.full_name || 'Unknown'}</p>
                          <p class="text-sm text-gray-500">${p.users?.phone}</p>
                        </div>
                      </div>
                      <div class="flex items-center gap-3">
                        <a href="${p.slip_url}" target="_blank" class="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-200 transition">
                          <i class="ph ph-image mr-1"></i> View Slip
                        </a>
                        <button onclick="AdminDashboard.approvePayment('${p.id}')" class="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition shadow-lg shadow-green-600/30">
                          <i class="ph ph-check mr-1"></i> Approve
                        </button>
                      </div>
                    </div>
                  `).join('')}
                </div>
              ` : `
                <div class="text-center py-8">
                  <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i class="ph ph-check-circle text-gray-400 text-2xl"></i>
                  </div>
                  <p class="text-gray-500">No pending payments</p>
                </div>
              `}
            </div>
            
            <!-- Upcoming Classes -->
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div class="flex items-center justify-between mb-4">
                <h3 class="font-bold text-lg text-gray-800 flex items-center gap-2">
                  <i class="ph ph-calendar-plus text-blue-500"></i>
                  Upcoming Classes
                </h3>
                <a href="#" onclick="App.navigate('admin-schedule')" class="text-blue-600 font-medium text-sm hover:underline">+ Add Class</a>
              </div>
              ${upcomingClasses && upcomingClasses.length > 0 ? `
                <div class="space-y-3">
                  ${upcomingClasses.map(c => `
                    <div class="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                      <div class="flex items-center gap-4">
                        <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                          <i class="ph ph-video-camera text-white text-xl"></i>
                        </div>
                        <div>
                          <p class="font-semibold text-gray-800">${c.title}</p>
                          <p class="text-sm text-gray-500">${dayjs(c.scheduled_at).format('YYYY-MM-DD HH:mm')}</p>
                        </div>
                      </div>
                      <a href="${c.meeting_link}" target="_blank" class="text-blue-600 hover:underline text-sm flex items-center gap-1">
                        <i class="ph ph-link"></i> Join
                      </a>
                    </div>
                  `).join('')}
                </div>
              ` : `
                <div class="text-center py-8">
                  <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i class="ph ph-calendar-x text-gray-400 text-2xl"></i>
                  </div>
                  <p class="text-gray-500 mb-3">No upcoming classes</p>
                  <button onclick="App.navigate('admin-schedule')" class="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">
                    Schedule Class
                  </button>
                </div>
              `}
            </div>
          </div>
        </div>
        ${Components.mobileNav(true)}
      `;
    } catch (err) {
      console.error(err);
    } finally {
      App.hideLoading();
    }
  },
  
  students: async () => {
    if (!AdminDashboard.checkAdmin()) return;
    
    const app = document.getElementById('app');
    
    App.showLoading();
    
    try {
      const { data: students } = await supabaseClient
        .from('users')
        .select('*')
        .eq('is_admin', false)
        .order('created_at', { ascending: false });
      
      app.innerHTML = `
        <div class="flex">
          ${Components.sidebar(true)}
          <div class="flex-1 p-4 md:p-6 pb-20 md:pb-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-2xl font-bold text-gray-800">Students</h2>
              <div class="flex gap-2">
                <input type="text" id="search-student" placeholder="Search by name or phone" class="px-4 py-2 border rounded-lg" onkeyup="AdminDashboard.filterStudents()">
                <select id="filter-status" class="px-4 py-2 border rounded-lg" onchange="AdminDashboard.filterStudents()">
                  <option value="all">All</option>
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                </select>
              </div>
            </div>
            
            <div class="bg-white rounded-xl shadow-sm overflow-hidden">
              <table class="w-full">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">Name</th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">Phone</th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">Expires</th>
                    <th class="px-4 py-3 text-left text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody id="students-list">
                  ${students && students.length > 0 ? students.map(s => `
                    <tr class="border-t hover:bg-gray-50">
                      <td class="px-4 py-3">${s.full_name}</td>
                      <td class="px-4 py-3">${s.phone}</td>
                      <td class="px-4 py-3">
                        <span class="px-2 py-1 rounded-full text-xs font-medium ${s.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                          ${s.payment_status}
                        </span>
                      </td>
                      <td class="px-4 py-3">${s.payment_expiry ? dayjs(s.payment_expiry).format('YYYY-MM-DD') : '-'}</td>
                      <td class="px-4 py-3">
                        <button onclick="AdminDashboard.resetPin('${s.id}')" class="text-blue-600 hover:underline text-sm">Reset PIN</button>
                        ${s.payment_status === 'unpaid' ? `
                          <button onclick="AdminDashboard.markPaid('${s.id}')" class="ml-2 text-green-600 hover:underline text-sm">Mark Paid</button>
                        ` : ''}
                      </td>
                    </tr>
                  `).join('') : `
                    <tr>
                      <td colspan="5" class="px-4 py-8 text-center text-gray-500">No students found</td>
                    </tr>
                  `}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        ${Components.mobileNav(true)}
      `;
      
      window.allStudents = students || [];
    } catch (err) {
      console.error(err);
    } finally {
      App.hideLoading();
    }
  },
  
  filterStudents: () => {
    const search = document.getElementById('search-student').value.toLowerCase();
    const status = document.getElementById('filter-status').value;
    const tbody = document.getElementById('students-list');
    
    const filtered = window.allStudents.filter(s => {
      const matchSearch = s.full_name.toLowerCase().includes(search) || s.phone.includes(search);
      const matchStatus = status === 'all' || s.payment_status === status;
      return matchSearch && matchStatus;
    });
    
    tbody.innerHTML = filtered.map(s => `
      <tr class="border-t hover:bg-gray-50">
        <td class="px-4 py-3">${s.full_name}</td>
        <td class="px-4 py-3">${s.phone}</td>
        <td class="px-4 py-3">
          <span class="px-2 py-1 rounded-full text-xs font-medium ${s.payment_status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
            ${s.payment_status}
          </span>
        </td>
        <td class="px-4 py-3">${s.payment_expiry ? dayjs(s.payment_expiry).format('YYYY-MM-DD') : '-'}</td>
        <td class="px-4 py-3">
          <button onclick="AdminDashboard.resetPin('${s.id}')" class="text-blue-600 hover:underline text-sm">Reset PIN</button>
          ${s.payment_status === 'unpaid' ? `
            <button onclick="AdminDashboard.markPaid('${s.id}')" class="ml-2 text-green-600 hover:underline text-sm">Mark Paid</button>
          ` : ''}
        </td>
      </tr>
    `).join('');
  },
  
  payments: async () => {
    if (!AdminDashboard.checkAdmin()) return;
    
    const app = document.getElementById('app');
    
    App.showLoading();
    
    try {
      const { data: payments } = await supabaseClient
        .from('payments')
        .select('*, users(full_name, phone)')
        .order('created_at', { ascending: false });
      
      app.innerHTML = `
        <div class="flex">
          ${Components.sidebar(true)}
          <div class="flex-1 p-4 md:p-6 pb-20 md:pb-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">Pending Payments</h2>
            
            <div class="space-y-4">
              ${payments && payments.length > 0 ? payments.map(p => `
                <div class="bg-white rounded-xl p-4 shadow-sm">
                  <div class="flex items-start justify-between">
                    <div>
                      <p class="font-medium text-lg">${p.users?.full_name || 'Unknown'}</p>
                      <p class="text-sm text-gray-500">${p.users?.phone}</p>
                      <p class="text-sm mt-2">Amount: Rs. ${p.amount}</p>
                      <p class="text-sm text-gray-500">Date: ${dayjs(p.payment_date).format('YYYY-MM-DD')}</p>
                    </div>
                    <span class="px-2 py-1 rounded-full text-xs font-medium ${p.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : p.status === 'approved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                      ${p.status}
                    </span>
                  </div>
                  ${p.slip_url ? `
                    <div class="mt-4">
                      <a href="${p.slip_url}" target="_blank" class="inline-flex items-center gap-2 text-blue-600 hover:underline">
                        <i class="ph ph-image"></i> View Slip
                      </a>
                    </div>
                  ` : ''}
                  ${p.status === 'pending' ? `
                    <div class="mt-4 flex gap-2">
                      <button onclick="AdminDashboard.approvePayment('${p.id}')" class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                        Approve
                      </button>
                      <button onclick="AdminDashboard.rejectPayment('${p.id}')" class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                        Reject
                      </button>
                    </div>
                  ` : ''}
                </div>
              `).join('') : `
                <div class="text-center py-12 text-gray-500">
                  <i class="ph ph-receipt text-5xl mb-4"></i>
                  <p>No payments found</p>
                </div>
              `}
            </div>
          </div>
        </div>
        ${Components.mobileNav(true)}
      `;
    } catch (err) {
      console.error(err);
    } finally {
      App.hideLoading();
    }
  },
  
  approvePayment: async (paymentId) => {
    App.showLoading();
    
    try {
      const { data: payment } = await supabaseClient
        .from('payments')
        .select('user_id')
        .eq('id', paymentId)
        .single();
      
      const expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + 1);
      
      await supabaseClient
        .from('payments')
        .update({ status: 'approved', approved_by: App.currentUser.id })
        .eq('id', paymentId);
      
      await supabaseClient
        .from('users')
        .update({ 
          payment_status: 'paid',
          payment_expiry: expiryDate.toISOString()
        })
        .eq('id', payment.user_id);
      
      Swal.fire({
        icon: 'success',
        title: 'Payment Approved!',
        text: 'Student can now access classes'
      });
      
      AdminDashboard.dashboard();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to approve payment'
      });
    } finally {
      App.hideLoading();
    }
  },
  
  rejectPayment: async (paymentId) => {
    const { value: reason } = await Swal.fire({
      title: 'Reject Payment',
      input: 'textarea',
      inputLabel: 'Reason for rejection',
      inputPlaceholder: 'Enter reason...',
      showCancelButton: true
    });
    
    if (reason === undefined) return;
    
    App.showLoading();
    
    try {
      await supabaseClient
        .from('payments')
        .update({ status: 'rejected' })
        .eq('id', paymentId);
      
      Swal.fire({
        icon: 'info',
        title: 'Payment Rejected'
      });
      
      AdminDashboard.payments();
    } catch (err) {
      console.error(err);
    } finally {
      App.hideLoading();
    }
  },
  
  markPaid: async (userId) => {
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);
    
    App.showLoading();
    
    try {
      await supabaseClient
        .from('users')
        .update({ 
          payment_status: 'paid',
          payment_expiry: expiryDate.toISOString()
        })
        .eq('id', userId);
      
      Toastify({
        text: "Student marked as paid!",
        style: { background: "#10b981" }
      }).showToast();
      
      AdminDashboard.students();
    } catch (err) {
      console.error(err);
    } finally {
      App.hideLoading();
    }
  },
  
  resetPin: async (userId) => {
    const { value: newPin } = await Swal.fire({
      title: 'Reset PIN',
      input: 'password',
      inputLabel: 'New 4-Digit PIN',
      inputPlaceholder: '1234',
      inputAttributes: {
        maxlength: 4,
        pattern: '[0-9]*'
      },
      showCancelButton: true
    });
    
    if (!newPin || newPin.length !== 4) return;
    
    App.showLoading();
    
    try {
      await supabaseClient
        .from('users')
        .update({ pin: newPin })
        .eq('id', userId);
      
      Swal.fire({
        icon: 'success',
        title: 'PIN Reset!',
        text: `New PIN: ${newPin}`
      });
    } catch (err) {
      console.error(err);
    } finally {
      App.hideLoading();
    }
  },
  
  schedule: async () => {
    if (!AdminDashboard.checkAdmin()) return;
    
    const app = document.getElementById('app');
    
    app.innerHTML = `
      <div class="flex">
        ${Components.sidebar(true)}
        <div class="flex-1 p-4 md:p-6 pb-20 md:pb-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Schedule Class</h2>
          
          <div class="bg-white rounded-xl p-6 shadow-sm max-w-lg mb-8">
            <form onsubmit="AdminDashboard.createClass(event)" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Class Title</label>
                <input type="text" id="class-title" class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Mathematics - Grade 10" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea id="class-desc" class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" rows="3" placeholder="Optional description"></textarea>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                <input type="datetime-local" id="class-datetime" class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Meeting Link</label>
                <input type="url" id="class-link" class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="https://zoom.us/..." required>
              </div>
              <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition">
                Schedule Class
              </button>
            </form>
          </div>
          
          <h3 class="font-bold text-lg mb-4">Existing Classes</h3>
          <div id="classes-list" class="space-y-3">
            <p class="text-gray-500">Loading...</p>
          </div>
        </div>
      </div>
      ${Components.mobileNav(true)}
    `;
    
    AdminDashboard.loadClasses();
  },
  
  loadClasses: async () => {
    try {
      const { data: classes } = await supabaseClient
        .from('classes')
        .select('*')
        .order('scheduled_at', { ascending: false });
      
      const container = document.getElementById('classes-list');
      
      if (classes && classes.length > 0) {
        container.innerHTML = classes.map(c => `
          <div class="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <i class="ph ph-video-camera text-xl text-blue-600"></i>
              </div>
              <div>
                <p class="font-medium">${c.title}</p>
                <p class="text-xs text-gray-500">${dayjs(c.scheduled_at).format('YYYY-MM-DD HH:mm')}</p>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <button onclick="AdminDashboard.deleteClass('${c.id}')" class="text-red-500 hover:text-red-700 p-2">
                <i class="ph ph-trash text-xl"></i>
              </button>
            </div>
          </div>
        `).join('');
      } else {
        container.innerHTML = '<p class="text-gray-500">No classes scheduled</p>';
      }
    } catch (err) {
      console.error(err);
    }
  },
  
  deleteClass: async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Delete Class?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    });
    
    if (!isConfirmed) return;
    
    App.showLoading();
    
    try {
      await supabaseClient
        .from('classes')
        .delete()
        .eq('id', id);
      
      Toastify({
        text: "Class deleted",
        style: { background: "#ef4444" }
      }).showToast();
      
      AdminDashboard.loadClasses();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to delete class'
      });
    } finally {
      App.hideLoading();
    }
  },
  
  createClass: async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('class-title').value;
    const description = document.getElementById('class-desc').value;
    const scheduledAt = document.getElementById('class-datetime').value;
    const meetingLink = document.getElementById('class-link').value;
    
    App.showLoading();
    
    try {
      await supabaseClient
        .from('classes')
        .insert({
          title,
          description,
          scheduled_at: new Date(scheduledAt).toISOString(),
          meeting_link: meetingLink,
          is_active: true
        });
      
      Swal.fire({
        icon: 'success',
        title: 'Class Scheduled!',
        text: 'Students can now see the upcoming class'
      });
      
      e.target.reset();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to schedule class'
      });
    } finally {
      App.hideLoading();
    }
  },
  
  resources: async () => {
    if (!AdminDashboard.checkAdmin()) return;
    
    const app = document.getElementById('app');
    
    app.innerHTML = `
      <div class="flex">
        ${Components.sidebar(true)}
        <div class="flex-1 p-4 md:p-6 pb-20 md:pb-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Upload Resources</h2>
          
          <div class="bg-white rounded-xl p-6 shadow-sm max-w-lg">
            <form onsubmit="AdminDashboard.uploadResource(event)" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input type="text" id="resource-title" class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Past Papers 2023" required>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select id="resource-type" class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                  <option value="pdf">PDF (Tutes)</option>
                  <option value="video">Video (Recording)</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">File</label>
                <input type="file" id="resource-file" class="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required>
              </div>
              <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition">
                Upload Resource
              </button>
            </form>
          </div>
          
          <h3 class="font-bold text-lg mt-8 mb-4">Existing Resources</h3>
          <div id="resources-list" class="grid md:grid-cols-2 gap-4">
            <p class="text-gray-500">Loading...</p>
          </div>
        </div>
      </div>
      ${Components.mobileNav(true)}
    `;
    
    AdminDashboard.loadResources();
  },
  
  loadResources: async () => {
    try {
      const { data: resources } = await supabaseClient
        .from('resources')
        .select('*')
        .order('created_at', { ascending: false });
      
      const container = document.getElementById('resources-list');
      
      if (resources && resources.length > 0) {
        container.innerHTML = resources.map(r => `
          <div class="bg-white rounded-xl p-4 shadow-sm">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg ${r.type === 'pdf' ? 'bg-red-100' : 'bg-blue-100'} flex items-center justify-center">
                  <i class="ph ph-file-${r.type === 'pdf' ? 'pdf' : 'video'} text-xl ${r.type === 'pdf' ? 'text-red-600' : 'text-blue-600'}"></i>
                </div>
                <div>
                  <p class="font-medium">${r.title}</p>
                  <p class="text-xs text-gray-500">${dayjs(r.created_at).format('YYYY-MM-DD')}</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="AdminDashboard.deleteResource('${r.id}')" class="text-red-500 hover:text-red-700 p-2">
                  <i class="ph ph-trash text-xl"></i>
                </button>
              </div>
            </div>
          </div>
        `).join('');
      } else {
        container.innerHTML = '<p class="text-gray-500">No resources yet</p>';
      }
    } catch (err) {
      console.error(err);
    }
  },
  
  uploadResource: async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('resource-title').value;
    const type = document.getElementById('resource-type').value;
    const file = document.getElementById('resource-file').files[0];
    
    if (!file) return;
    
    App.showLoading();
    
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const { data, error } = await supabaseClient.storage
        .from('resources')
        .upload(fileName, file);
      
      if (error) throw error;
      
      const { data: urlData } = supabaseClient.storage
        .from('resources')
        .getPublicUrl(fileName);
      
      await supabaseClient
        .from('resources')
        .insert({
          title,
          type,
          file_url: urlData.publicUrl,
          file_name: file.name,
          uploaded_by: App.currentUser.id
        });
      
      Swal.fire({
        icon: 'success',
        title: 'Resource Uploaded!',
        text: 'Students can now access it'
      });
      
      e.target.reset();
      AdminDashboard.loadResources();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: 'Please try again'
      });
    } finally {
      App.hideLoading();
    }
  },
  
  deleteResource: async (id) => {
    const { isConfirmed } = await Swal.fire({
      title: 'Delete Resource?',
      text: 'This action cannot be undone',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    });
    
    if (!isConfirmed) return;
    
    App.showLoading();
    
    try {
      await supabaseClient
        .from('resources')
        .delete()
        .eq('id', id);
      
      Toastify({
        text: "Resource deleted",
        style: { background: "#6b7280" }
      }).showToast();
      
      AdminDashboard.loadResources();
    } catch (err) {
      console.error(err);
    } finally {
      App.hideLoading();
    }
  },
  
  settings: async () => {
    if (!AdminDashboard.checkAdmin()) return;
    
    const app = document.getElementById('app');
    
    App.showLoading();
    
    try {
      const { data: logoSetting } = await supabaseClient
        .from('site_settings')
        .select('value')
        .eq('key', 'logo_url')
        .single();
      
      app.innerHTML = `
        <div class="flex">
          ${Components.sidebar(true)}
          <div class="flex-1 p-4 md:p-6 pb-20 md:pb-6">
            <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">Settings</h2>
            
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 max-w-lg">
              <h3 class="font-bold text-lg mb-4">Site Logo</h3>
              
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Logo URL</label>
                <input type="url" id="logo-url" class="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none" placeholder="https://example.com/logo.png" value="${logoSetting?.value || ''}">
              </div>
              
              <div class="mb-4">
                <label class="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">Or Upload Logo</label>
                <div class="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-4 text-center cursor-pointer hover:border-blue-500 transition" onclick="document.getElementById('logo-file').click()">
                  <input type="file" id="logo-file" accept="image/*" class="hidden" onchange="AdminDashboard.uploadLogo(this)">
                  <i class="ph ph-upload text-3xl text-gray-400 mb-2"></i>
                  <p class="text-sm text-gray-500">Click to upload logo</p>
                </div>
              </div>
              
              <button onclick="AdminDashboard.saveLogo()" class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition">
                Save Logo
              </button>
            </div>
          </div>
        </div>
        ${Components.mobileNav(true)}
      `;
    } catch (err) {
      console.error(err);
    } finally {
      App.hideLoading();
    }
  },
  
  uploadLogo: async (input) => {
    const file = input.files[0];
    if (!file) return;
    
    App.showLoading();
    
    try {
      const fileName = `logo_${Date.now()}_${file.name}`;
      const { data, error } = await supabaseClient.storage
        .from('site_images')
        .upload(fileName, file);
      
      if (error) throw error;
      
      const { data: urlData } = supabaseClient.storage
        .from('site_images')
        .getPublicUrl(fileName);
      
      document.getElementById('logo-url').value = urlData.publicUrl;
      
      Toastify({
        text: "Logo uploaded!",
        style: { background: "#10b981" }
      }).showToast();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Upload Failed',
        text: 'Please try again'
      });
    } finally {
      App.hideLoading();
    }
  },
  
  saveLogo: async () => {
    const logoUrl = document.getElementById('logo-url').value.trim();
    
    if (!logoUrl) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please enter a logo URL or upload a logo'
      });
      return;
    }
    
    App.showLoading();
    
    try {
      await supabaseClient
        .from('site_settings')
        .upsert({ key: 'logo_url', value: logoUrl }, { onConflict: 'key' });
      
      Toastify({
        text: "Logo saved!",
        style: { background: "#10b981" }
      }).showToast();
      
      window.location.reload();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to save logo'
      });
    } finally {
      App.hideLoading();
    }
  }
};

// Initialize App
document.addEventListener('DOMContentLoaded', App.init);
