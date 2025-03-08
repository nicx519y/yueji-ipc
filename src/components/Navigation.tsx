import Link from "next/link";

export default function Navigation() {
  return (
    <div className="mx-auto">
      {/* 顶部区域 - 公司名称和登录注册 */}
      <div className="flex justify-between items-center h-12 px-4">
        <div className="text-primary font-bold text-2xl">
        北京随心悦文化科技有限公司
        </div>
        <div className="space-x-2 text-blue-600 text-sm">
          <Link href="/login" className="hover:underline">[登录]</Link>
          <Link href="/register" className="hover:underline">[注册]</Link>
        </div>
      </div>

      {/* 导航菜单区域 */}
      <div className="bg-primary text-white rounded-lg">
        <div className="flex space-x-8 h-12 items-center px-8">
          <Link href="/" className="hover:text-gray-200">首页</Link>
          <Link href="/services" className="hover:text-gray-200">专业服务</Link>
          <Link href="/reports" className="hover:text-gray-200">市场报告</Link>
          <Link href="/solutions" className="hover:text-gray-200">行业方案</Link>
          <Link href="/consulting" className="hover:text-gray-200">产品咨询(收费)</Link>
        </div>
      </div>
    </div>
  );
} 