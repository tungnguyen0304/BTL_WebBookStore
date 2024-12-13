// File index.js này đóng vai trò khởi tạo và thiết lập cấu hình cho ứng dụng React của bạn.
// Nó là điểm bắt đầu mà từ đó ứng dụng được render và kết nối với các phần của hệ thống quản lý trạng thái (Redux).
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import App from './App'
import axios from 'axios'
import store from './store/store'

// allow cookie to be written in CORS policy
axios.defaults.withCredentials = true

// Giúp ứng dụng khôi phục trạng thái từ lần chạy trước đó
const persistor = persistStore(store)

// Là phần tử mà toàn bộ ứng dụng React sẽ được gắn vào
const container = document.getElementById('root')
// Tạo một gốc React tại phần tử DOM được chỉ định
const root = createRoot(container)

root.render(
  // Provider cung cấp Redux store cho toàn bộ ứng dụng con bên trong.
  // Điều này có nghĩa là bất kỳ thành phần nào bên trong <Provider> đều có thể truy cập vào Redux store.
  <Provider store={store}>
    {/* PersistGate được sử dụng để trì hoãn render ứng dụng cho đến khi persistor hoàn thành việc khôi phục trạng thái từ bộ nhớ. */}
    {/* Điều này giúp đảm bảo rằng khi ứng dụng render, các thành phần đều đã có dữ liệu đúng từ Redux store 
    (ví dụ: những thông tin như trạng thái đăng nhập của người dùng).*/}
    <PersistGate persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
)
