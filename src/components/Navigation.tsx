import Link from "next/link";
import { useRouter } from "next/router";

export default function Navigation() {
  const router = useRouter();

  // 判断当前路径是否匹配
  const isCurrentPath = (path: string) => {
    return router.pathname === path;
  };

  // 导航链接样式
  const getLinkStyle = (path: string) => {
    return `hover:text-gray-200 ${isCurrentPath(path) ? 'text-purple-300' : 'text-white'}`;
  };

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

      {/* 导航区域 */}
      <div className="bg-primary rounded-lg">
        <div className="flex gap-10 items-center h-12 px-4 text-white">
          <Link href="/" className={getLinkStyle('/')}>首页</Link>
          <Link href="/solutions" className={getLinkStyle('/solutions')}>行业方案</Link>
          <Link href="/services" className={getLinkStyle('/services')}>专业服务</Link>
          <Link href="/reports" className={getLinkStyle('/reports')}>市场报告</Link>
          <Link href="/consulting" className={getLinkStyle('/consulting')}>产品咨询(收费)</Link>
        </div>
      </div>
    </div>
  );
} 