// Components - Header, Footer, Sidebar injection

const Components = {
  header: () => `
    <header class="bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
      <div class="container mx-auto px-4 py-3">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
              <i class="ph ph-graduation-cap text-white text-2xl"></i>
            </div>
            <div>
              <h1 class="text-xl font-bold text-gray-800">Tuition Class</h1>
              <p class="text-xs text-gray-500">Sri Lanka</p>
            </div>
          </div>
          <nav class="flex items-center gap-3">
            <div id="user-info" class="hidden items-center gap-3">
              <div class="hidden sm:flex flex-col items-end">
                <span id="user-name" class="text-sm font-semibold text-gray-800"></span>
                <span class="text-xs text-gray-500">Student</span>
              </div>
              <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-md">
                <i class="ph ph-user text-white text-lg"></i>
              </div>
              <button onclick="App.logout()" class="bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2 border border-gray-200">
                <i class="ph ph-sign-out"></i>
                <span class="hidden sm:inline">Logout</span>
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  `,
  
  footer: () => `
    <footer class="bg-gray-900 text-gray-400 py-8 mt-auto">
      <div class="container mx-auto px-4">
        <div class="flex flex-col md:flex-row justify-between items-center gap-6">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
              <i class="ph ph-graduation-cap text-white text-xl"></i>
            </div>
            <div>
              <span class="font-bold text-white text-lg">Tuition Class</span>
              <p class="text-xs text-gray-500">Sri Lanka</p>
            </div>
          </div>
          <div class="text-sm text-center">
            <p>&copy; ${new Date().getFullYear()} Tuition Class Sri Lanka. All rights reserved.</p>
          </div>
          <div class="flex items-center gap-4">
            <a href="#" class="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition">
              <i class="ph ph-facebook-logo text-lg"></i>
            </a>
            <a href="#" class="w-10 h-10 bg-gray-800 hover:bg-green-500 rounded-full flex items-center justify-center transition">
              <i class="ph ph-whatsapp-logo text-lg"></i>
            </a>
            <a href="#" class="w-10 h-10 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition">
              <i class="ph ph-youtube-logo text-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  `,
  
  sidebar: (isAdmin = false) => `
    <aside class="w-64 bg-white shadow-xl min-h-screen hidden md:block border-r border-gray-100">
      <div class="p-4">
        <div class="flex items-center gap-3 mb-8 px-3 py-4 bg-gradient-to-r from-blue-50 to-white rounded-xl border border-blue-100">
          <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
            <i class="ph ph-graduation-cap text-white text-xl"></i>
          </div>
          <div>
            <h3 class="font-bold text-gray-800">Tuition Class</h3>
            <p class="text-xs text-blue-600 font-medium">${isAdmin ? 'Admin Panel' : 'Student Portal'}</p>
          </div>
        </div>
        <nav class="space-y-2">
          ${isAdmin ? `
            <a href="#" onclick="App.navigate('admin-dashboard')" class="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-blue-50 text-gray-700 transition group">
              <div class="w-10 h-10 bg-gray-100 group-hover:bg-blue-500 rounded-lg flex items-center justify-center transition">
                <i class="ph ph-house text-xl text-gray-600 group-hover:text-white transition"></i>
              </div>
              <span class="font-medium group-hover:text-blue-600 transition">Dashboard</span>
            </a>
            <a href="#" onclick="App.navigate('admin-students')" class="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-blue-50 text-gray-700 transition group">
              <div class="w-10 h-10 bg-gray-100 group-hover:bg-blue-500 rounded-lg flex items-center justify-center transition">
                <i class="ph ph-users text-xl text-gray-600 group-hover:text-white transition"></i>
              </div>
              <span class="font-medium group-hover:text-blue-600 transition">Students</span>
            </a>
            <a href="#" onclick="App.navigate('admin-payments')" class="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-blue-50 text-gray-700 transition group">
              <div class="w-10 h-10 bg-gray-100 group-hover:bg-blue-500 rounded-lg flex items-center justify-center transition">
                <i class="ph ph-receipt text-xl text-gray-600 group-hover:text-white transition"></i>
              </div>
              <span class="font-medium group-hover:text-blue-600 transition">Payments</span>
            </a>
            <a href="#" onclick="App.navigate('admin-schedule')" class="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-blue-50 text-gray-700 transition group">
              <div class="w-10 h-10 bg-gray-100 group-hover:bg-blue-500 rounded-lg flex items-center justify-center transition">
                <i class="ph ph-calendar-plus text-xl text-gray-600 group-hover:text-white transition"></i>
              </div>
              <span class="font-medium group-hover:text-blue-600 transition">Schedule</span>
            </a>
            <a href="#" onclick="App.navigate('admin-resources')" class="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-blue-50 text-gray-700 transition group">
              <div class="w-10 h-10 bg-gray-100 group-hover:bg-blue-500 rounded-lg flex items-center justify-center transition">
                <i class="ph ph-folder-open text-xl text-gray-600 group-hover:text-white transition"></i>
              </div>
              <span class="font-medium group-hover:text-blue-600 transition">Resources</span>
            </a>
          ` : `
            <a href="#" onclick="App.navigate('student-dashboard')" class="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-blue-50 text-gray-700 transition group">
              <div class="w-10 h-10 bg-gray-100 group-hover:bg-blue-500 rounded-lg flex items-center justify-center transition">
                <i class="ph ph-house text-xl text-gray-600 group-hover:text-white transition"></i>
              </div>
              <span class="font-medium group-hover:text-blue-600 transition">Dashboard</span>
            </a>
            <a href="#" onclick="App.navigate('resources')" class="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-blue-50 text-gray-700 transition group">
              <div class="w-10 h-10 bg-gray-100 group-hover:bg-blue-500 rounded-lg flex items-center justify-center transition">
                <i class="ph ph-folder-open text-xl text-gray-600 group-hover:text-white transition"></i>
              </div>
              <span class="font-medium group-hover:text-blue-600 transition">Resources</span>
            </a>
            <a href="#" onclick="App.navigate('payment')" class="flex items-center gap-3 px-4 py-3.5 rounded-xl hover:bg-blue-50 text-gray-700 transition group">
              <div class="w-10 h-10 bg-gray-100 group-hover:bg-blue-500 rounded-lg flex items-center justify-center transition">
                <i class="ph ph-credit-card text-xl text-gray-600 group-hover:text-white transition"></i>
              </div>
              <span class="font-medium group-hover:text-blue-600 transition">Payment</span>
            </a>
          `}
        </nav>
      </div>
    </aside>
  `,
  
  mobileNav: (isAdmin = false) => `
    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-xl z-40 md:hidden">
      <div class="flex justify-around py-2">
        ${isAdmin ? `
          <a href="#" onclick="App.navigate('admin-dashboard')" class="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 transition">
            <div class="w-12 h-12 bg-gray-100 hover:bg-blue-100 rounded-xl flex items-center justify-center mb-1 transition">
              <i class="ph ph-house text-xl"></i>
            </div>
            <span class="text-xs font-medium">Home</span>
          </a>
          <a href="#" onclick="App.navigate('admin-students')" class="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 transition">
            <div class="w-12 h-12 bg-gray-100 hover:bg-blue-100 rounded-xl flex items-center justify-center mb-1 transition">
              <i class="ph ph-users text-xl"></i>
            </div>
            <span class="text-xs font-medium">Students</span>
          </a>
          <a href="#" onclick="App.navigate('admin-payments')" class="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 transition">
            <div class="w-12 h-12 bg-gray-100 hover:bg-blue-100 rounded-xl flex items-center justify-center mb-1 transition">
              <i class="ph ph-receipt text-xl"></i>
            </div>
            <span class="text-xs font-medium">Payments</span>
          </a>
          <a href="#" onclick="App.logout()" class="flex flex-col items-center p-2 text-red-500 hover:text-red-600 transition">
            <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-1 transition">
              <i class="ph ph-sign-out text-xl"></i>
            </div>
            <span class="text-xs font-medium">Logout</span>
          </a>
        ` : `
          <a href="#" onclick="App.navigate('student-dashboard')" class="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 transition">
            <div class="w-12 h-12 bg-gray-100 hover:bg-blue-100 rounded-xl flex items-center justify-center mb-1 transition">
              <i class="ph ph-house text-xl"></i>
            </div>
            <span class="text-xs font-medium">Home</span>
          </a>
          <a href="#" onclick="App.navigate('resources')" class="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 transition">
            <div class="w-12 h-12 bg-gray-100 hover:bg-blue-100 rounded-xl flex items-center justify-center mb-1 transition">
              <i class="ph ph-folder-open text-xl"></i>
            </div>
            <span class="text-xs font-medium">Tutes</span>
          </a>
          <a href="#" onclick="App.navigate('payment')" class="flex flex-col items-center p-2 text-gray-600 hover:text-blue-600 transition">
            <div class="w-12 h-12 bg-gray-100 hover:bg-blue-100 rounded-xl flex items-center justify-center mb-1 transition">
              <i class="ph ph-credit-card text-xl"></i>
            </div>
            <span class="text-xs font-medium">Payment</span>
          </a>
          <a href="#" onclick="App.logout()" class="flex flex-col items-center p-2 text-red-500 hover:text-red-600 transition">
            <div class="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-1 transition">
              <i class="ph ph-sign-out text-xl"></i>
            </div>
            <span class="text-xs font-medium">Logout</span>
          </a>
        `}
      </div>
    </nav>
  `
};

window.Components = Components;
