import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Register() {
  const [formData, setFormData] = useState({
    mobile: '',
    account: '',
    email: '',
    password: '',
    nickname: '',
    captcha: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: 处理注册逻辑
    console.log('注册信息:', formData);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#e5e5e5]">
      <div className="flex-1 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md w-[400px]">
          <h1 className="text-2xl text-center mb-8">会员注册</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 手机号输入框 */}
            <div>
              <input
                type="tel"
                placeholder="手机号"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                value={formData.mobile}
                onChange={(e) => setFormData({...formData, mobile: e.target.value})}
              />
            </div>

            {/* 账号输入框 */}
            <div>
              <input
                type="text"
                placeholder="账号"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                value={formData.account}
                onChange={(e) => setFormData({...formData, account: e.target.value})}
              />
            </div>

            {/* 邮箱输入框 */}
            <div>
              <input
                type="email"
                placeholder="邮箱"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>

            {/* 密码输入框 */}
            <div>
              <input
                type="password"
                placeholder="密码"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>

            {/* 昵称输入框 */}
            <div>
              <input
                type="text"
                placeholder="昵称"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                value={formData.nickname}
                onChange={(e) => setFormData({...formData, nickname: e.target.value})}
              />
            </div>

            {/* 验证码 */}
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="验证码"
                className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-primary"
                value={formData.captcha}
                onChange={(e) => setFormData({...formData, captcha: e.target.value})}
              />
              <div className="w-32 h-10 bg-gray-100 rounded">
                <Image
                  src="/captcha.png"
                  alt="验证码"
                  width={128}
                  height={40}
                  className="rounded"
                />
              </div>
            </div>

            {/* 注册按钮 */}
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
            >
              注册
            </button>

            {/* 登录链接 */}
            <div className="text-center">
              <Link href="/login" className="text-sm text-gray-500 hover:text-primary">
                用已有账号登入
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 